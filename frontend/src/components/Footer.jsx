import React from 'react';

export default function Footer({ onNavigate = () => {} }) {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl pt-space-xl pb-space-lg border-t border-outline-variant/30">
      <div className="max-w-[1240px] mx-auto px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg pb-space-xl">
          {/* Brand description & socials */}
          <div className="lg:col-span-2 space-y-space-md">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 8h10M7 12h10M7 16h6" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-headline-md text-headline-md text-primary tracking-tight font-extrabold">
                CampusConnect
              </span>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Discover electric experiences, secure instant tickets, and build unforgettable memories in your city with seamless checkout and guaranteed entry.
            </p>

            <div className="flex items-center gap-space-sm pt-space-xs">
              <a
                href="#community"
                onClick={(e) => e.preventDefault()}
                aria-label="Global Community"
                className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                href="#conversations"
                onClick={(e) => e.preventDefault()}
                aria-label="Conversations"
                className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">forum</span>
              </a>
              <a
                href="#broadcasts"
                onClick={(e) => e.preventDefault()}
                aria-label="Broadcasts"
                className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">podcasts</span>
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Explore</h3>
            <ul className="space-y-space-xs">
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <button type="button" onClick={() => onNavigate('explore')} className="text-left">
                  Concerts & Gigs
                </button>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <button type="button" onClick={() => onNavigate('explore')} className="text-left">
                  Tech Summits
                </button>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <button type="button" onClick={() => onNavigate('explore')} className="text-left">
                  Nightlife & Parties
                </button>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <button type="button" onClick={() => onNavigate('explore')} className="text-left">
                  Workshops
                </button>
              </li>
            </ul>
          </div>

          {/* Organizers Column */}
          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Organizers</h3>
            <ul className="space-y-space-xs">
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <button type="button" onClick={() => onNavigate('organize')} className="text-left">
                  Host an Event
                </button>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <button type="button" onClick={() => onNavigate('organize')} className="text-left">
                  Ticketing Engine
                </button>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <button type="button" onClick={() => onNavigate('organize')} className="text-left">
                  Box Office Analytics
                </button>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <button type="button" onClick={() => onNavigate('organize')} className="text-left">
                  Pricing & Fees
                </button>
              </li>
            </ul>
          </div>

          {/* Stay Connected Column */}
          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Stay Connected</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Get curated weekly drops of the best events in Bangalore.
            </p>
            <div className="space-y-space-xs">
              <div className="flex rounded-full bg-surface-container-lowest p-space-xs shadow-sm border border-outline-variant/30">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-space-md py-space-xs text-on-surface placeholder:text-outline font-body-sm text-body-sm bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => alert('Thank you for subscribing to weekly drops!')}
                  className="px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors shrink-0"
                >
                  Join
                </button>
              </div>
              <span className="font-body-sm text-body-sm text-outline block">Zero spam. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-space-lg border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-space-md text-outline font-body-sm text-body-sm">
          <p>© 2026 CampusConnect Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-space-lg">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-on-surface transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-on-surface transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" onClick={(e) => e.preventDefault()} className="hover:text-on-surface transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
