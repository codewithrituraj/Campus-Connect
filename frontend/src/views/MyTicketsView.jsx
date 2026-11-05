import React, { useState } from 'react';

export default function MyTicketsView({
  registrations = [],
  eventsMap = {},
  isLoading = false,
  currentUser = null,
  onOpenPass = () => {},
  onOpenWallet = () => {},
  onDownloadAll = () => {},
  onNavigateToExplore = () => {},
  onNavigateToOrganizers = () => {},
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'past', 'cancelled'
  const [activeSidebar, setActiveSidebar] = useState('tickets');
  const [ticketSearch, setTicketSearch] = useState('');

  // Map each registration with its event metadata
  const mappedPasses = registrations.map((reg) => {
    const event = eventsMap[reg.event_id] || {
      id: reg.event_id,
      title: 'Workshop Session',
      category: 'Tech Summit',
      timestamp: reg.createdAt,
      fullDate: reg.createdAt ? new Date(reg.createdAt).toLocaleDateString() : 'Confirmed',
      location: 'Bangalore Innovation Hub',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      isPast: false,
    };

    const isPast = event.timestamp ? new Date(event.timestamp) < new Date() : false;

    return {
      registrationId: reg.id,
      shortOrderId: reg.id ? reg.id.slice(0, 8).toUpperCase() : 'EVT-9042',
      eventTitle: event.title,
      category: event.category || 'Tech',
      status: 'CONFIRMED',
      date: event.fullDate || 'Upcoming Session',
      location: event.location || 'Bangalore Innovation Hub',
      seat: 'Free Standing Zone A',
      ticketCount: '1 Pass',
      image: event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      createdAt: reg.createdAt,
      isPast,
    };
  });

  const upcomingPasses = mappedPasses.filter((p) => !p.isPast);
  const pastPasses = mappedPasses.filter((p) => p.isPast);

  // Filter based on tab and search
  const currentList = activeTab === 'upcoming' ? upcomingPasses : activeTab === 'past' ? pastPasses : [];
  const filteredPasses = currentList.filter((p) => {
    const q = ticketSearch.toLowerCase();
    return (
      p.eventTitle.toLowerCase().includes(q) ||
      p.shortOrderId.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-[1240px] w-full mx-auto px-margin py-space-xl">
      {/* Top Context & Quick Summary Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl pb-space-lg">
        <div className="space-y-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container text-primary font-label-caps text-label-caps">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              LIVE API PASSES & WALLET (GET /api/me/registrations)
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            My Registrations
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Viewing registered passes for <span className="font-semibold text-primary">{currentUser?.email || 'Guest User'}</span>
          </p>
        </div>

        <div className="flex items-center gap-space-sm flex-wrap">
          <button
            type="button"
            onClick={onOpenWallet}
            className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors font-label-md text-label-md shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            <span>Apple / Google Wallet</span>
          </button>
          <button
            type="button"
            onClick={onDownloadAll}
            className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download All Passes</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Nav + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-surface-container-lowest rounded-2xl p-space-md shadow-sm space-y-space-xs border border-outline-variant/30">
          <nav className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => setActiveSidebar('tickets')}
              className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-xl font-label-md text-label-md transition-colors text-left group cursor-pointer ${
                activeSidebar === 'tickets'
                  ? 'bg-surface-container text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  confirmation_number
                </span>
                <span>My Passes</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary text-on-primary">
                {registrations.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSidebar('past');
                setActiveTab('past');
              }}
              className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-xl font-label-md text-label-md transition-colors text-left group cursor-pointer ${
                activeSidebar === 'past'
                  ? 'bg-surface-container text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-outline group-hover:text-on-surface text-[20px]">
                  history
                </span>
                <span>Past Events</span>
              </div>
              <span className="text-xs font-medium text-outline">{pastPasses.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSidebar('profile')}
              className={`w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-xl font-label-md text-label-md transition-colors text-left group cursor-pointer ${
                activeSidebar === 'profile'
                  ? 'bg-surface-container text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-outline group-hover:text-on-surface text-[20px]">
                person
              </span>
              <span>Attendee Profile</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSidebar('api')}
              className={`w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-xl font-label-md text-label-md transition-colors text-left group cursor-pointer ${
                activeSidebar === 'api'
                  ? 'bg-surface-container text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-outline group-hover:text-on-surface text-[20px]">
                code
              </span>
              <span>API Contract Status</span>
            </button>
          </nav>

          {/* Organizer Console Prompt Card */}
          <div className="mt-space-lg pt-space-md">
            <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-xs relative overflow-hidden">
              <div className="flex items-center gap-space-xs text-primary">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="font-label-caps text-label-caps uppercase">Organizer Hub</span>
              </div>
              <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Check Attendee Roster
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                View real registrations for events you organize via /api/events/&#123;id&#125;/registrations.
              </p>
              <button
                type="button"
                onClick={onNavigateToOrganizers}
                className="inline-block pt-space-xs font-label-sm text-label-sm text-primary font-bold hover:underline cursor-pointer"
              >
                Go to Organizer Console →
              </button>
            </div>
          </div>
        </aside>

        {/* Center & Right: Passes Content Area */}
        <section className="lg:col-span-9 flex flex-col gap-space-lg">
          {activeSidebar === 'profile' ? (
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/30 space-y-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">Connected User Profile</h2>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-2xl shadow-sm">
                  {currentUser?.email ? currentUser.email[0].toUpperCase() : 'G'}
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{currentUser?.email || 'Guest User'}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    User ID: <span className="font-mono text-xs text-outline">{currentUser?.id || 'None'}</span>
                  </p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-caps text-label-caps font-bold uppercase">
                    Role: {currentUser?.role || 'Guest'}
                  </span>
                </div>
              </div>
            </div>
          ) : activeSidebar === 'api' ? (
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/30 space-y-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">API Contract Integration</h2>
              <p className="font-body-md text-on-surface-variant">
                Endpoint: <code className="bg-surface-container px-2 py-0.5 rounded text-primary font-bold">https://hello-world-workshop.onrender.com/</code>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <span className="font-bold text-emerald-600">GET /api/events</span>
                  <p className="text-outline mt-1">Browse and search all workshop events.</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <span className="font-bold text-emerald-600">GET /api/events/&#123;id&#125;</span>
                  <p className="text-outline mt-1">Fetches detailed event capacity and metadata.</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <span className="font-bold text-blue-600">POST /api/registrations</span>
                  <p className="text-outline mt-1">Registers current user. Responds with 201 or 409.</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <span className="font-bold text-purple-600">GET /api/me/registrations</span>
                  <p className="text-outline mt-1">Returns all active passes for currently authenticated user.</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Filter Tabs & Quick Search */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                {/* Status Tabs */}
                <div className="flex items-center gap-space-lg">
                  <button
                    type="button"
                    onClick={() => setActiveTab('upcoming')}
                    className={`relative pb-space-xs font-headline-sm text-headline-sm transition-colors cursor-pointer ${
                      activeTab === 'upcoming'
                        ? 'text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span>Upcoming ({upcomingPasses.length})</span>
                    {activeTab === 'upcoming' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('past')}
                    className={`relative pb-space-xs font-headline-sm text-headline-sm transition-colors cursor-pointer ${
                      activeTab === 'past'
                        ? 'text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span>Past ({pastPasses.length})</span>
                    {activeTab === 'past' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </button>
                </div>

                {/* Mini Search Input */}
                <div className="flex items-center gap-space-xs bg-surface-container-low rounded-full px-space-md py-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-outline text-[18px]">search</span>
                  <input
                    type="text"
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    placeholder="Search passes..."
                    className="bg-transparent text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none w-36 sm:w-44"
                  />
                </div>
              </div>

              {/* Passes List / Voucher Stack */}
              <div className="space-y-space-md">
                {isLoading ? (
                  <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[32px] text-primary animate-spin">
                      progress_activity
                    </span>
                    <p className="font-body-md text-on-surface-variant mt-2">
                      Fetching registrations from API...
                    </p>
                  </div>
                ) : filteredPasses.length === 0 ? (
                  <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[36px] text-outline mb-2">
                      confirmation_number
                    </span>
                    <p className="font-body-md text-on-surface-variant">
                      No registrations found for this user.
                    </p>
                    <button
                      type="button"
                      onClick={onNavigateToExplore}
                      className="mt-3 px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">explore</span>
                      <span>Explore & Register for Events</span>
                    </button>
                  </div>
                ) : (
                  filteredPasses.map((pass) => (
                    <article
                      key={pass.registrationId}
                      className="group relative bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row overflow-hidden border border-outline-variant/30"
                    >
                      {/* Left Info Section */}
                      <div className="flex-1 p-space-md sm:p-space-lg flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
                        <div className="relative w-full sm:w-36 h-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                          <img
                            src={pass.image}
                            alt={pass.eventTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-caps text-label-caps text-primary shadow-sm">
                            {pass.category}
                          </span>
                        </div>

                        <div className="flex-1 space-y-space-xs min-w-0">
                          <div className="flex items-center gap-space-xs">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-caps text-label-caps font-bold">
                              {pass.status}
                            </span>
                            <span className="font-body-sm text-body-sm text-outline font-mono">
                              Order #{pass.shortOrderId}
                            </span>
                          </div>

                          <h2 className="font-headline-md text-headline-md text-on-surface truncate group-hover:text-primary transition-colors">
                            {pass.eventTitle}
                          </h2>

                          <div className="flex flex-wrap items-center gap-y-1 gap-x-space-md text-on-surface-variant font-body-sm text-body-sm">
                            <span className="inline-flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px] text-primary">
                                calendar_today
                              </span>
                              {pass.date}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px] text-outline">
                                location_on
                              </span>
                              {pass.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-space-md pt-space-xs">
                            <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                              Seat: {pass.seat}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onOpenPass({
                                  title: pass.eventTitle,
                                  date: pass.date,
                                  location: pass.location,
                                  count: pass.ticketCount,
                                  orderId: pass.shortOrderId,
                                })
                              }
                              className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Perforation Cutouts & Divider (Desktop) */}
                      <div className="relative hidden md:flex flex-col justify-between items-center w-6">
                        <div className="w-6 h-6 rounded-full bg-surface -mt-3 shadow-inner"></div>
                        <div className="h-full w-0 border-l border-dashed border-outline-variant my-1"></div>
                        <div className="w-6 h-6 rounded-full bg-surface -mb-3 shadow-inner"></div>
                      </div>

                      {/* Mobile Divider */}
                      <div className="relative flex md:hidden items-center justify-between px-4">
                        <div className="w-5 h-5 rounded-full bg-surface -ml-6 shadow-inner"></div>
                        <div className="w-full border-t border-dashed border-outline-variant mx-1"></div>
                        <div className="w-5 h-5 rounded-full bg-surface -mr-6 shadow-inner"></div>
                      </div>

                      {/* Right Stub Section */}
                      <div
                        onClick={() =>
                          onOpenPass({
                            title: pass.eventTitle,
                            date: pass.date,
                            location: pass.location,
                            count: pass.ticketCount,
                            orderId: pass.shortOrderId,
                          })
                        }
                        className="w-full md:w-56 bg-surface-container-low p-space-md flex md:flex-col items-center justify-between text-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors"
                      >
                        <div className="flex flex-col items-start md:items-center">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary text-on-primary font-label-caps text-label-caps font-bold">
                            {pass.ticketCount}
                          </span>
                          <span className="hidden md:block font-body-sm text-body-sm text-outline mt-1">
                            Tap to inspect pass
                          </span>
                        </div>

                        {/* QR Code Mock Graphic */}
                        <div className="p-2 bg-surface-container-lowest rounded-xl shadow-sm flex items-center justify-center">
                          <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 100 100">
                            <rect fill="currentColor" fillOpacity="0.2" height="24" rx="4" width="24" x="10" y="10" />
                            <rect fill="currentColor" height="14" width="14" x="15" y="15" />
                            <rect fill="currentColor" fillOpacity="0.2" height="24" rx="4" width="24" x="66" y="10" />
                            <rect fill="currentColor" height="14" width="14" x="71" y="15" />
                            <rect fill="currentColor" fillOpacity="0.2" height="24" rx="4" width="24" x="10" y="66" />
                            <rect fill="currentColor" height="14" width="14" x="15" y="71" />
                            <circle cx="50" cy="20" fill="currentColor" r="4" />
                            <circle cx="50" cy="35" fill="currentColor" r="3" />
                            <circle cx="20" cy="50" fill="currentColor" r="3" />
                            <circle cx="35" cy="50" fill="currentColor" r="4" />
                            <circle cx="50" cy="50" fill="currentColor" r="5" />
                            <circle cx="65" cy="50" fill="currentColor" r="3" />
                            <circle cx="80" cy="50" fill="currentColor" r="4" />
                            <circle cx="50" cy="65" fill="currentColor" r="4" />
                            <circle cx="50" cy="80" fill="currentColor" r="3" />
                            <rect fill="currentColor" height="8" width="8" x="65" y="65" />
                            <rect fill="currentColor" height="10" width="10" x="78" y="78" />
                            <rect fill="currentColor" height="6" width="6" x="65" y="80" />
                            <rect fill="currentColor" height="6" width="8" x="80" y="66" />
                          </svg>
                        </div>

                        <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                          <span className="hidden md:inline">Scan QR</span>
                          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                            chevron_right
                          </span>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>

              {/* Venue Directions & Support Banner */}
              <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-[26px]">map</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Need directions or gate arrival assistance?
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Gate access guidelines open 2 hours prior to start time for verified ticket holders.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => alert(`Digital entry guidelines sent to ${currentUser?.email || 'your email'}!`)}
                    className="w-full md:w-auto px-space-md py-space-xs rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md text-center cursor-pointer shadow-sm"
                  >
                    Entry Guidelines
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Connecting to 24/7 CampusConnect Concierge Desk...')}
                    className="w-full md:w-auto px-space-md py-space-xs rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md text-label-md text-center cursor-pointer shadow-sm"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
