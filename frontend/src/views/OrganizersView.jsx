import React, { useState, useEffect } from 'react';
import { getEventRegistrations } from '../services/api';

export default function OrganizersView({
  events = [],
  currentUser = null,
  users = [],
  onSwitchUser = () => {},
  onOpenCreateEvent = () => {},
}) {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [isLoadingAttendees, setIsLoadingAttendees] = useState(false);
  const [attendeeError, setAttendeeError] = useState(null);

  const isOrganizer = currentUser?.role === 'organiser' || currentUser?.role === 'organizer';

  // Events owned by current organizer
  const ownedEvents = events.filter((e) => e.organiser_id === currentUser?.id);

  // Auto select first owned event if available
  useEffect(() => {
    if (ownedEvents.length > 0 && !selectedEventId) {
      handleLoadAttendees(ownedEvents[0].id);
    }
  }, [ownedEvents, selectedEventId]);

  const handleLoadAttendees = async (eventId) => {
    setSelectedEventId(eventId);
    setIsLoadingAttendees(true);
    setAttendeeError(null);
    try {
      const data = await getEventRegistrations(eventId, currentUser?.id);
      setAttendees(data);
    } catch (err) {
      setAttendeeError(err.message || 'Unable to load attendees. Only the owning organizer has access.');
      setAttendees([]);
    } finally {
      setIsLoadingAttendees(false);
    }
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Helper to find user email
  const getUserEmail = (userId) => {
    const found = users.find((u) => u.id === userId);
    return found ? found.email : userId;
  };

  return (
    <div className="max-w-[1240px] w-full mx-auto px-margin py-space-xl space-y-space-xl pb-16">
      {/* Hero Section */}
      <div className="relative pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase font-bold">
                FOR ORGANIZERS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.15] mt-2 font-display-hero">
                Bring Your <br />
                <span className="text-primary">Ideas to Life</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-on-surface-variant font-body-lg leading-relaxed max-w-lg">
                Create, manage and sell tickets for your events. Reach thousands of people and build your community with CampusConnect.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={onOpenCreateEvent}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-primary hover:bg-primary-container active:scale-95 text-on-primary font-label-md text-label-md rounded-full shadow-lg shadow-primary/20 transition-all group cursor-pointer"
              >
                <span>Get Started as Organizer</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <a
                href="#organizer-roster"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">group</span>
                <span>Attendee Rosters (API)</span>
              </a>
            </div>

            {/* 3 Pillar Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-outline-variant/30">
              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Create Events
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Set up your event in minutes
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Sell Tickets
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Secure and easy ticketing system
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Grow Audience
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Reach more people across India
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Organic Shaped Photo with doodles */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-4">
            <div className="absolute top-2 right-4 sm:right-10 text-primary select-none pointer-events-none">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5V12" stroke="#E50914" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M29 9L24 14" stroke="#E50914" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M35 20H28" stroke="#E50914" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M11 9L16 14" stroke="#E50914" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <div className="absolute -inset-2.5 rounded-[40px] border-2 border-primary/20 -rotate-2" />

              <div className="relative w-full h-full rounded-[36px] overflow-hidden shadow-2xl bg-surface-container">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                  alt="Organizer working on laptop"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-amber-100/95 backdrop-blur-sm border border-amber-200 shadow-md rounded-xl p-3 max-w-[120px] text-center rotate-3">
                  <div className="text-[11px] font-bold text-amber-900 leading-tight">
                    Ideas <br />
                    Events <br />
                    People
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-outline-variant/30 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-surface-container text-primary flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-on-surface leading-tight">API Roster Integration</p>
                    <p className="text-[10px] text-on-surface-variant">GET /api/events/&#123;id&#125;/registrations</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 text-primary select-none pointer-events-none">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                  <path
                    d="M5 25C15 10 25 35 35 20C45 5 55 30 65 15C70 10 75 25 78 20"
                    stroke="#E50914"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organizer Console / Attendee Roster Section */}
      <div id="organizer-roster" className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold uppercase">
                API Endpoint: GET /api/events/&#123;id&#125;/registrations
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
              Organizer Attendee Roster
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Active User: <span className="font-bold text-on-surface">{currentUser?.email || 'Guest'}</span> ({currentUser?.role || 'Guest'})
            </p>
          </div>

          {!isOrganizer && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-600">lock</span>
              <div className="text-xs">
                <p className="font-bold text-amber-900">Organizer access required</p>
                <p className="text-amber-700">Switch to an organizer to inspect roster:</p>
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const leah = users.find((u) => u.email.startsWith('leah'));
                      if (leah) onSwitchUser(leah);
                    }}
                    className="px-2 py-1 bg-amber-600 text-white rounded-md font-bold text-[10px]"
                  >
                    Switch to Leah (organiser)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const arjun = users.find((u) => u.email.startsWith('arjun'));
                      if (arjun) onSwitchUser(arjun);
                    }}
                    className="px-2 py-1 bg-amber-600 text-white rounded-md font-bold text-[10px]"
                  >
                    Switch to Arjun (organiser)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Organizer Event Picker */}
        {isOrganizer && (
          <div className="space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Your Hosted Events</h3>
            {ownedEvents.length === 0 ? (
              <p className="text-sm text-on-surface-variant">No events assigned to this organizer ID yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ownedEvents.map((ev) => {
                  const isSelected = ev.id === selectedEventId;
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => handleLoadAttendees(ev.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-surface-container border-primary shadow-sm'
                          : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant'
                      }`}
                    >
                      <h4 className="font-headline-sm text-sm font-bold text-on-surface truncate">{ev.title}</h4>
                      <p className="text-xs text-outline mt-1 font-mono">Capacity: {ev.capacity || 20} places</p>
                      <span className="inline-block mt-2 font-label-caps text-[10px] text-primary font-bold">
                        {isSelected ? '✓ Roster Loaded' : 'Click to Load Roster →'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Attendee Roster Table */}
        {selectedEventId && (
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Confirmed Attendees for: <span className="text-primary">{selectedEvent?.title}</span>
              </h3>
              <span className="font-label-caps text-label-caps px-3 py-1 bg-surface-container rounded-full text-primary font-bold">
                {attendees.length} / {selectedEvent?.capacity || 20} Registered
              </span>
            </div>

            {isLoadingAttendees ? (
              <div className="p-8 text-center text-outline">
                <span className="material-symbols-outlined text-[28px] animate-spin text-primary">progress_activity</span>
                <p className="text-xs mt-2">Loading attendees from API...</p>
              </div>
            ) : attendeeError ? (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-xs font-semibold">
                {attendeeError}
              </div>
            ) : attendees.length === 0 ? (
              <div className="p-6 bg-surface-container-low rounded-2xl text-center text-xs text-outline">
                No attendees registered yet for this event.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-outline-variant/30">
                <table className="w-full text-left font-body-sm text-body-sm">
                  <thead className="bg-surface-container-low text-on-surface-variant font-label-caps text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Attendee User</th>
                      <th className="py-3 px-4">Registration ID</th>
                      <th className="py-3 px-4">Registered At</th>
                      <th className="py-3 px-4">Turnstile Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest">
                    {attendees.map((att, idx) => (
                      <tr key={att.id || idx} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-on-surface">
                          {getUserEmail(att.user_id)}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-outline">
                          {att.id ? att.id.slice(0, 13) : 'EVT-REG-01'}...
                        </td>
                        <td className="py-3 px-4 text-xs text-outline">
                          {att.createdAt ? new Date(att.createdAt).toLocaleString() : 'Pre-registered'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                            VALID TICKET
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Stats Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/20">
          <div className="pt-2 sm:pt-0 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">calendar_today</span>
            </div>
            <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
              {events.length} Live
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant font-medium mt-1">Events on API</span>
          </div>

          <div className="pt-4 sm:pt-0 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">confirmation_number</span>
            </div>
            <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
              2M+
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant font-medium mt-1">Passes Issued</span>
          </div>

          <div className="pt-4 sm:pt-0 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">hotel_class</span>
            </div>
            <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
              {users.filter(u => u.role === 'organiser' || u.role === 'organizer').length}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant font-medium mt-1">Verified Organizers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
