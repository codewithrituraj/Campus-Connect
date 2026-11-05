import React from 'react';
import { Maximize2, ExternalLink } from 'lucide-react';
import DiscoverView from './DiscoverView';
import MyTicketsView from './MyTicketsView';
import OrganizersView from './OrganizersView';
import AuthView from './AuthView';
import Navbar from '../components/Navbar';

export default function ReferenceGalleryView({
  events,
  tickets,
  wishlist,
  selectedCategory,
  onCategorySelect,
  onSelectEvent,
  onLikeToggle,
  onSelectTicket,
  onOpenCreateEvent,
  onNavigateToView,
}) {
  return (
    <div className="space-y-6">
      {/* Top Banner explaining the 2x2 replica */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Reference Design Grid (4-Screen Layout)
          </span>
          <p className="text-xs text-slate-500">
            Interactive side-by-side replica of the 4 CampusConnect screens from the design reference image. Click "Expand Screen" on any panel to work in full-screen mode.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateToView('discover')}
            className="px-3.5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Open Full App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2x2 Grid of the 4 Panels matching the reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Top-Left - Sign Up / Auth Screen */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl flex flex-col relative group">
          <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">1. Sign Up / Authentication</span>
            <button
              type="button"
              onClick={() => onNavigateToView('auth')}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand</span>
            </button>
          </div>
          <div className="flex-1 p-2">
            <AuthView embedded={true} onAuthSuccess={() => onNavigateToView('discover')} />
          </div>
        </div>

        {/* Panel 2: Top-Right - Discover / Home Screen */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl flex flex-col relative group">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">2. Discover Events (Home)</span>
            <button
              type="button"
              onClick={() => onNavigateToView('discover')}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand</span>
            </button>
          </div>
          <div className="overflow-hidden">
            <Navbar
              currentView="discover"
              onNavigate={(v) => onNavigateToView(v)}
              selectedCity="Bangalore"
            />
          </div>
          <div className="p-4 overflow-y-auto max-h-[700px]">
            <DiscoverView
              events={events}
              selectedCategory={selectedCategory}
              onCategorySelect={onCategorySelect}
              onSelectEvent={onSelectEvent}
              onLikeToggle={onLikeToggle}
            />
          </div>
        </div>

        {/* Panel 3: Bottom-Left - My Tickets Screen */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl flex flex-col relative group">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">3. My Tickets (Dashboard)</span>
            <button
              type="button"
              onClick={() => onNavigateToView('tickets')}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand</span>
            </button>
          </div>
          <div className="overflow-hidden">
            <Navbar
              currentView="tickets"
              navVariant="tickets"
              onNavigate={(v) => onNavigateToView(v)}
              searchPlaceholder="Search your events..."
            />
          </div>
          <div className="p-4 overflow-y-auto max-h-[700px]">
            <MyTicketsView
              tickets={tickets}
              wishlist={wishlist}
              onSelectTicket={onSelectTicket}
              onSelectEvent={onSelectEvent}
              onNavigateHome={() => onNavigateToView('discover')}
            />
          </div>
        </div>

        {/* Panel 4: Bottom-Right - For Organizers Screen */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl flex flex-col relative group">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">4. For Organizers (Landing)</span>
            <button
              type="button"
              onClick={() => onNavigateToView('organize')}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand</span>
            </button>
          </div>
          <div className="overflow-hidden">
            <Navbar
              currentView="organize"
              onNavigate={(v) => onNavigateToView(v)}
              selectedCity="Bangalore"
            />
          </div>
          <div className="p-4 overflow-y-auto max-h-[700px]">
            <OrganizersView onOpenCreateEvent={onOpenCreateEvent} />
          </div>
        </div>
      </div>
    </div>
  );
}
