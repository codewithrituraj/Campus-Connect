import os
from flask import Flask, jsonify, request
from supabase import create_client, Client
from postgrest.exceptions import APIError
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY") or os.environ.get("SUPABASE_PUBLISHABLE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Id, X-User-Email")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    return response


def get_current_user():
    """Extract authenticated user from Authorization header, X-User-Id, query params, or body."""
    auth_header = request.headers.get("Authorization", "")
    token = None
    if auth_header.startswith("Bearer "):
        token = auth_header[7:].strip()
    elif auth_header:
        token = auth_header.strip()

    # 1. Check Bearer token (Supabase Auth token, user ID UUID, or email)
    if token:
        try:
            auth_resp = supabase.auth.get_user(token)
            if auth_resp and auth_resp.user:
                user_res = supabase.table("users").select("*").eq("id", auth_resp.user.id).execute()
                if user_res.data:
                    return user_res.data[0]
                user_res = supabase.table("users").select("*").eq("email", auth_resp.user.email).execute()
                if user_res.data:
                    return user_res.data[0]
                return {"id": auth_resp.user.id, "email": auth_resp.user.email, "role": "student"}
        except Exception:
            pass

        try:
            user_res = supabase.table("users").select("*").eq("id", token).execute()
            if user_res.data:
                return user_res.data[0]
            user_res = supabase.table("users").select("*").eq("email", token).execute()
            if user_res.data:
                return user_res.data[0]
        except Exception:
            pass

    # 2. Check X-User-Id / X-User-Email headers
    user_id_header = request.headers.get("X-User-Id")
    if user_id_header:
        user_res = supabase.table("users").select("*").eq("id", user_id_header).execute()
        if user_res.data:
            return user_res.data[0]

    user_email_header = request.headers.get("X-User-Email")
    if user_email_header:
        user_res = supabase.table("users").select("*").eq("email", user_email_header).execute()
        if user_res.data:
            return user_res.data[0]

    # 3. Check query parameters (user_id / email)
    param_user_id = request.args.get("user_id")
    if param_user_id:
        user_res = supabase.table("users").select("*").eq("id", param_user_id).execute()
        if user_res.data:
            return user_res.data[0]

    param_email = request.args.get("email")
    if param_email:
        user_res = supabase.table("users").select("*").eq("email", param_email).execute()
        if user_res.data:
            return user_res.data[0]

    # 4. Check JSON body user_id for POST requests
    if request.is_json:
        body = request.get_json(silent=True) or {}
        body_user_id = body.get("user_id")
        if body_user_id:
            user_res = supabase.table("users").select("*").eq("id", body_user_id).execute()
            if user_res.data:
                return user_res.data[0]

    return None


@app.route("/api/users", methods=["GET"])
def get_users():
    """Browse users."""
    try:
        response = supabase.table("users").select("*").execute()
        return jsonify(response.data), 200
    except APIError as e:
        return jsonify({"error": e.message}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/users/<user_id>", methods=["GET"])
def get_user_details(user_id):
    """User details."""
    try:
        response = supabase.table("users").select("*").eq("id", user_id).execute()
        if not response.data:
            return jsonify({"error": "User not found"}), 404
        return jsonify(response.data[0]), 200
    except APIError as e:
        return jsonify({"error": e.message}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/events", methods=["GET"])
def get_events():
    """Browse events."""
    try:
        response = supabase.table("events").select("*").execute()
        return jsonify(response.data), 200
    except APIError as e:
        return jsonify({"error": e.message}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/events/<event_id>", methods=["GET"])
def get_event_details(event_id):
    """Event details."""
    try:
        response = supabase.table("events").select("*").eq("id", event_id).execute()
        if not response.data:
            return jsonify({"error": "Event not found"}), 404
        return jsonify(response.data[0]), 200
    except APIError as e:
        return jsonify({"error": e.message}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/registrations", methods=["POST"])
def create_registration():
    """Create registration, 201 or 409."""
    user = get_current_user()
    if not user:
        return jsonify({"error": "Authentication required"}), 401

    data = request.get_json(silent=True) or {}
    event_id = data.get("event_id")
    if not event_id:
        return jsonify({"error": "event_id is required"}), 400

    try:
        # Verify event exists
        event_res = supabase.table("events").select("*").eq("id", event_id).execute()
        if not event_res.data:
            return jsonify({"error": "Event not found"}), 404
        event = event_res.data[0]

        # Check existing registration for this user and event
        existing_res = (
            supabase.table("registrations")
            .select("id")
            .eq("user_id", user["id"])
            .eq("event_id", event_id)
            .execute()
        )
        if existing_res.data:
            return jsonify({"error": "User already registered for this event"}), 409

        # Check event capacity
        if event.get("capacity") is not None:
            count_res = (
                supabase.table("registrations")
                .select("id", count="exact")
                .eq("event_id", event_id)
                .execute()
            )
            current_count = count_res.count if count_res.count is not None else len(count_res.data)
            if current_count >= event["capacity"]:
                return jsonify({"error": "Event is at full capacity"}), 409

        # Create registration
        insert_res = (
            supabase.table("registrations")
            .insert({"user_id": user["id"], "event_id": event_id})
            .execute()
        )
        return jsonify(insert_res.data[0]), 201

    except APIError as e:
        if "unique" in e.message.lower() or e.code == "23505":
            return jsonify({"error": "User already registered for this event"}), 409
        return jsonify({"error": e.message}), 500
    except Exception as e:
        if "unique" in str(e).lower() or "23505" in str(e):
            return jsonify({"error": "User already registered for this event"}), 409
        return jsonify({"error": str(e)}), 500


@app.route("/api/me/registrations", methods=["GET"])
def get_my_registrations():
    """Current user's registrations."""
    user = get_current_user()
    if not user:
        return jsonify({"error": "Authentication required"}), 401

    try:
        response = (
            supabase.table("registrations")
            .select("*, events(*)")
            .eq("user_id", user["id"])
            .execute()
        )
        return jsonify(response.data), 200
    except APIError as e:
        return jsonify({"error": e.message}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/events/<event_id>/registrations", methods=["GET"])
def get_event_registrations(event_id):
    """Attendee list, owning organizer only."""
    user = get_current_user()
    if not user:
        return jsonify({"error": "Authentication required"}), 401

    try:
        event_res = supabase.table("events").select("*").eq("id", event_id).execute()
        if not event_res.data:
            return jsonify({"error": "Event not found"}), 404
        event = event_res.data[0]

        # Owning organizer check
        if event.get("organiser_id") != user["id"]:
            return jsonify({"error": "Forbidden: Owning organizer only"}), 403

        # Attendee list with user details
        attendees_res = (
            supabase.table("registrations")
            .select("*, users(id, email, role)")
            .eq("event_id", event_id)
            .execute()
        )
        return jsonify(attendees_res.data), 200

    except APIError as e:
        return jsonify({"error": e.message}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5002)
