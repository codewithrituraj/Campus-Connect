const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Persist demo user in localStorage
export function getSavedUserId() {
  try {
    return localStorage.getItem('evently_demo_user_id') || '0d14cdaa-bdff-5670-8c81-f5dee3342e8c'; // default to Ava
  } catch {
    return '0d14cdaa-bdff-5670-8c81-f5dee3342e8c';
  }
}

export function saveUserId(id) {
  try {
    if (id) {
      localStorage.setItem('evently_demo_user_id', id);
    } else {
      localStorage.removeItem('evently_demo_user_id');
    }
  } catch {
    // Ignore storage errors
  }
}

async function request(path, { method = 'GET', body, userId } = {}) {
  const headers = {
    Accept: 'application/json',
  };

  const activeUser = userId !== undefined ? userId : getSavedUserId();
  if (activeUser) {
    headers['X-User-Id'] = activeUser;
  }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new ApiError('Invalid response from server.', response.status);
  }

  if (!response.ok) {
    throw new ApiError(data.error || `Request failed with status ${response.status}`, response.status);
  }

  return data;
}

// 1. GET /api/events - Browse events
export async function getEvents() {
  return request('/events');
}

// 2. GET /api/events/{id} - Event details
export async function getEvent(id) {
  return request(`/events/${encodeURIComponent(id)}`);
}

// 3. POST /api/registrations - Create registration (201 or 409)
export async function createRegistration(eventId) {
  return request('/registrations', {
    method: 'POST',
    body: { event_id: eventId },
  });
}

// 4. GET /api/me/registrations - Current user's registrations
export async function getMyRegistrations(userId) {
  return request('/me/registrations', { userId });
}

// 5. GET /api/events/{id}/registrations - Attendee list (owning organizer only)
export async function getEventRegistrations(eventId, userId) {
  return request(`/events/${encodeURIComponent(eventId)}/registrations`, { userId });
}

// GET /api/users - Helper to load classroom / workshop users
export async function getUsers() {
  return request('/users');
}

// Smart image & theme mapper for workshop events
export function enrichEventData(event, organizersMap = {}) {
  const title = event.title || 'Tech Community Event';
  const titleLower = title.toLowerCase();

  let category = 'Tech';
  let categoryId = 'tech';
  let image = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';

  if (titleLower.includes('electronic') || titleLower.includes('frequencies') || titleLower.includes('resonance')) {
    category = 'Music';
    categoryId = 'music';
    image = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80';
  } else if (titleLower.includes('makers') || titleLower.includes('collective') || titleLower.includes('noir') || titleLower.includes('design')) {
    category = 'Arts & Design';
    categoryId = 'arts';
    image = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80';
  } else if (titleLower.includes('workshop') || titleLower.includes('studio') || titleLower.includes('principles') || titleLower.includes('coding')) {
    category = 'Workshops';
    categoryId = 'workshops';
    image = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80';
  } else if (titleLower.includes('food') || titleLower.includes('after hours')) {
    category = 'Social';
    categoryId = 'food';
    image = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
  }

  // Parse timestamp
  let dateFormatted = 'TBD';
  let day = '15';
  let month = 'NOV';
  let isPast = false;

  if (event.timestamp) {
    const d = new Date(event.timestamp);
    if (!isNaN(d.getTime())) {
      isPast = d < new Date();
      day = d.getDate().toString().padStart(2, '0');
      month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      dateFormatted = d.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    }
  }

  const organizerEmail = organizersMap[event.organiser_id] || 'Verified Community Organizer';

  return {
    ...event,
    category,
    categoryId,
    image,
    day,
    month,
    date: `${day} ${month}`,
    fullDate: dateFormatted,
    isPast,
    location: 'Bangalore Innovation Hub',
    venue: 'Kanteerava Arena / KTPO Center',
    price: 0,
    priceLabel: 'Free Entry',
    organizerEmail,
  };
}
