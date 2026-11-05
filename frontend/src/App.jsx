import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MyTicketsView from './views/MyTicketsView';
import DiscoverView from './views/DiscoverView';
import OrganizersView from './views/OrganizersView';
import PassDetailModal from './components/PassDetailModal';
import WalletSyncModal from './components/WalletSyncModal';
import BookEventModal from './components/BookEventModal';
import CreateEventModal from './components/CreateEventModal';
import {
  getEvents,
  getUsers,
  getMyRegistrations,
  enrichEventData,
  getSavedUserId,
  saveUserId,
} from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('explore'); // 'explore', 'tickets', 'organize'
  const [eventsList, setEventsList] = useState([]);
  const [eventsMap, setEventsMap] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  // Modals state
  const [selectedPass, setSelectedPass] = useState(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [bookingEvent, setBookingEvent] = useState(null);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // Load users & initial events on mount
  useEffect(() => {
    async function init() {
      try {
        setIsLoadingEvents(true);

        // 1. Fetch users from API
        const users = await getUsers();
        setUsersList(users);

        // Match or restore saved user
        const savedId = getSavedUserId();
        const matchedUser = users.find((u) => u.id === savedId) || users[0] || null;
        setCurrentUser(matchedUser);

        // Build organizers lookup
        const orgMap = {};
        users.forEach((u) => {
          orgMap[u.id] = u.email;
        });

        // 2. Fetch live events from GET /api/events
        const rawEvents = await getEvents();
        const enriched = rawEvents.map((e) => enrichEventData(e, orgMap));
        setEventsList(enriched);

        const map = {};
        enriched.forEach((e) => {
          map[e.id] = e;
        });
        setEventsMap(map);

        // 3. Fetch registrations for active user if present
        if (matchedUser) {
          loadRegistrations(matchedUser.id);
        }
      } catch (err) {
        console.error('Failed to initialize API data:', err);
      } finally {
        setIsLoadingEvents(false);
      }
    }

    init();
  }, []);

  // Fetch registrations whenever user switches
  const loadRegistrations = async (userId) => {
    setIsLoadingRegistrations(true);
    try {
      const regs = await getMyRegistrations(userId);
      setRegistrations(regs);
    } catch (err) {
      console.warn('Unable to load registrations:', err);
      setRegistrations([]);
    } finally {
      setIsLoadingRegistrations(false);
    }
  };

  const handleUserChange = (user) => {
    setCurrentUser(user);
    saveUserId(user.id);
    loadRegistrations(user.id);
  };

  const handleLikeToggle = (eventId) => {
    setEventsList((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, isLiked: !ev.isLiked } : ev))
    );
  };

  const handleBookingSuccess = (newReg, bookedEvent) => {
    alert(`Success (HTTP 201 Created)! Registered for "${bookedEvent.title}".`);
    if (currentUser) {
      loadRegistrations(currentUser.id);
    }
    setCurrentView('tickets');
  };

  const handleAddEvent = (newEvent) => {
    setEventsList((prev) => [newEvent, ...prev]);
    alert(`Event "${newEvent.title}" published! Showing in Explore Events.`);
    setCurrentView('explore');
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col selection:bg-primary-container selection:text-white">
      {/* Fixed Sticky Header with live demo user selector */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        users={usersList}
        currentUser={currentUser}
        onUserChange={handleUserChange}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1">
        {/* Explore Events / Home View */}
        {(currentView === 'explore' || currentView === 'home') && (
          <DiscoverView
            events={eventsList}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onSelectEvent={(ev) => setBookingEvent(ev)}
            onLikeToggle={handleLikeToggle}
            searchQuery={searchQuery}
          />
        )}

        {/* My Registrations View */}
        {currentView === 'tickets' && (
          <MyTicketsView
            registrations={registrations}
            eventsMap={eventsMap}
            isLoading={isLoadingRegistrations}
            currentUser={currentUser}
            onOpenPass={(passData) => setSelectedPass(passData)}
            onOpenWallet={() => setIsWalletModalOpen(true)}
            onDownloadAll={() => alert(`Generating combined PDF pass package for ${registrations.length} registrations...`)}
            onNavigateToExplore={() => setCurrentView('explore')}
            onNavigateToOrganizers={() => setCurrentView('organize')}
          />
        )}

        {/* Organizer Console View */}
        {currentView === 'organize' && (
          <OrganizersView
            events={eventsList}
            currentUser={currentUser}
            users={usersList}
            onSwitchUser={handleUserChange}
            onOpenCreateEvent={() => setIsCreateEventOpen(true)}
          />
        )}
      </main>

      {/* Footer matching Stitch */}
      <Footer onNavigate={(v) => setCurrentView(v)} />

      {/* Pass Detail & QR Modal */}
      <PassDetailModal
        passData={selectedPass}
        onClose={() => setSelectedPass(null)}
        onSaveToWallet={() => {
          alert(`Pass for ${selectedPass.title} saved to Apple / Google Wallet!`);
          setSelectedPass(null);
        }}
        onDownloadPdf={() => {
          alert(`Downloading print-ready digital PDF pass for Order #${selectedPass.orderId}...`);
          setSelectedPass(null);
        }}
      />

      {/* Digital Wallet Sync Modal */}
      <WalletSyncModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSync={(walletType) => {
          alert(`All ${registrations.length} passes synced with ${walletType}! Check your phone notification.`);
          setIsWalletModalOpen(false);
        }}
      />

      {/* Event Booking / Registration Modal (POST /api/registrations) */}
      <BookEventModal
        event={bookingEvent}
        currentUser={currentUser}
        onClose={() => setBookingEvent(null)}
        onBookSuccess={handleBookingSuccess}
        isLiked={bookingEvent ? bookingEvent.isLiked : false}
        onLikeToggle={handleLikeToggle}
      />

      {/* Host Event Modal */}
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
