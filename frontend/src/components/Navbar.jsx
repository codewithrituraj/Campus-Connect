import React, { useState } from 'react';
import { CITIES } from '../data/mockData';

export default function Navbar({
  currentView = 'explore',
  onNavigate = () => {},
  searchQuery = '',
  onSearchChange = () => {},
  selectedCity = 'Bangalore',
  onCityChange = () => {},
  users = [],
  currentUser = null,
  onUserChange = () => {},
}) {
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getRoleBadge = (role) => {
    if (role === 'organiser' || role === 'organizer') {
      return 'bg-purple-100 text-purple-700';
    }
    return 'bg-emerald-100 text-emerald-700';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1240px] mx-auto px-margin flex items-center justify-between gap-space-md">
        {/* Logo & City Pill */}
        <div className="flex items-center gap-space-lg">
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-space-xs text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 8h10M7 12h10M7 16h6" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-headline-md text-headline-md text-primary tracking-tight font-extrabold">
              CampusConnect
            </span>
          </button>

          {/* Location Selector */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setShowCityMenu(!showCityMenu)}
              className="flex items-center bg-surface-container-low hover:bg-surface-container rounded-full px-space-md py-space-xs gap-space-xs text-on-surface-variant transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-outline text-[18px]">location_on</span>
              <span className="font-label-md text-label-md text-on-surface">{selectedCity}</span>
              <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
            </button>

            {showCityMenu && (
              <div className="absolute left-0 mt-2 w-44 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high py-2 z-50 animate-in fade-in slide-in-from-top-1">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      onCityChange(city);
                      setShowCityMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-body-sm text-body-sm transition-colors cursor-pointer ${
                      selectedCity === city
                        ? 'bg-surface-container text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md items-center bg-surface-container-low rounded-full px-space-md py-space-xs gap-space-sm text-on-surface-variant focus-within:ring-2 focus-within:ring-primary/20">
          <span className="material-symbols-outlined text-outline text-[20px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search API events, topics..."
            className="bg-transparent w-full text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none"
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-space-sm">
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className={`transition-colors font-label-md text-label-md px-space-md py-space-xs rounded-full cursor-pointer ${
              currentView === 'explore' || currentView === 'home'
                ? 'text-primary bg-surface-container font-bold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Explore Events
          </button>

          <button
            type="button"
            onClick={() => onNavigate('tickets')}
            className={`transition-colors font-label-md text-label-md px-space-md py-space-xs rounded-full cursor-pointer ${
              currentView === 'tickets'
                ? 'text-primary bg-surface-container font-bold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            My Registrations
          </button>

          <button
            type="button"
            onClick={() => onNavigate('organize')}
            className={`transition-colors font-label-md text-label-md px-space-md py-space-xs rounded-full cursor-pointer ${
              currentView === 'organize'
                ? 'text-primary bg-surface-container font-bold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Organizer Console
          </button>
        </nav>

        {/* Right Action Icons: Demo User Selector & Notification */}
        <div className="flex items-center gap-space-sm">
          {/* Demo User Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-left cursor-pointer border border-outline-variant/30"
              title="Switch classroom demo user"
            >
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                {currentUser?.email ? currentUser.email[0].toUpperCase() : 'G'}
              </div>
              <div className="hidden sm:block text-left max-w-[120px] truncate">
                <p className="font-label-sm text-label-sm text-on-surface truncate font-semibold leading-none">
                  {currentUser ? currentUser.email.split('@')[0] : 'Guest User'}
                </p>
                <p className="text-[10px] text-outline font-medium leading-tight">
                  {currentUser?.role || 'Guest'}
                </p>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">unfold_more</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high py-2 z-50 animate-in fade-in slide-in-from-top-1 max-h-80 overflow-y-auto">
                <div className="px-4 py-1.5 border-b border-outline-variant/20 mb-1">
                  <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
                    Select Demo User (API Auth)
                  </span>
                </div>

                {users.map((user) => {
                  const isSelected = currentUser?.id === user.id;
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        onUserChange(user);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 font-body-sm text-body-sm transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-surface-container text-primary font-bold'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="truncate">
                        <p className="truncate text-xs font-semibold">{user.email}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Notifications"
            onClick={() => alert(`API Connected to https://hello-world-workshop.onrender.com/\nAuthenticated User: ${currentUser?.email || 'Guest'}`)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">hub</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="xl:hidden flex items-center justify-around border-t border-outline-variant/30 py-2 bg-surface-container-lowest/90 px-4 text-xs font-semibold">
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className={`px-3 py-1 rounded-full ${currentView === 'explore' || currentView === 'home' ? 'text-primary bg-surface-container font-bold' : 'text-on-surface-variant'}`}
        >
          Explore Events
        </button>
        <button
          type="button"
          onClick={() => onNavigate('tickets')}
          className={`px-3 py-1 rounded-full ${currentView === 'tickets' ? 'text-primary bg-surface-container font-bold' : 'text-on-surface-variant'}`}
        >
          My Passes
        </button>
        <button
          type="button"
          onClick={() => onNavigate('organize')}
          className={`px-3 py-1 rounded-full ${currentView === 'organize' ? 'text-primary bg-surface-container font-bold' : 'text-on-surface-variant'}`}
        >
          Organizer Console
        </button>
      </div>
    </header>
  );
}
