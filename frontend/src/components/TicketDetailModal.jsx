import React from 'react';
import { X, Calendar, MapPin, QrCode, CheckCircle2, Share2, Download } from 'lucide-react';
import EventlyLogo from './EventlyLogo';

export default function TicketDetailModal({ ticket, onClose, onBookMore }) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="mb-2">
            <EventlyLogo variant="light" size="small" />
          </div>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 rounded-full mb-2">
            Confirmed Booking
          </span>
          <h2 className="text-xl font-bold leading-tight">{ticket.title}</h2>
        </div>

        {/* Ticket Body with perforated style */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <Calendar className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">{ticket.date}</p>
              <p className="text-xs text-slate-500">Doors open 45 minutes prior</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">{ticket.location}</p>
              <p className="text-xs text-slate-500">{ticket.venue || 'Main Arena, Gate 2'}</p>
            </div>
          </div>

          {/* Ticket metadata grid */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Tickets</span>
              <span className="font-bold text-slate-800 text-sm">{ticket.quantity} Pass</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Class</span>
              <span className="font-bold text-slate-800 text-sm">{ticket.ticketType || 'Standard'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Ref Code</span>
              <span className="font-mono font-bold text-indigo-600 text-xs">{ticket.bookingCode || 'EVNT-9842'}</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center text-center">
            {/* Visual SVG QR Code */}
            <div className="w-28 h-28 bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Simulated high-fidelity QR Code blocks */}
                <rect x="5" y="5" width="25" height="25" fill="#0A0A0A" rx="2" />
                <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
                <rect x="14" y="14" width="7" height="7" fill="#E50914" />

                <rect x="70" y="5" width="25" height="25" fill="#0A0A0A" rx="2" />
                <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
                <rect x="79" y="14" width="7" height="7" fill="#E50914" />

                <rect x="5" y="70" width="25" height="25" fill="#0A0A0A" rx="2" />
                <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
                <rect x="14" y="79" width="7" height="7" fill="#E50914" />

                {/* Pattern dots */}
                <rect x="35" y="10" width="8" height="8" fill="#E50914" />
                <rect x="50" y="15" width="10" height="6" fill="#0A0A0A" />
                <rect x="40" y="30" width="20" height="8" fill="#FF1F2D" />
                <rect x="15" y="45" width="15" height="10" fill="#0A0A0A" />
                <rect x="45" y="45" width="10" height="10" fill="#E50914" />
                <rect x="65" y="40" width="15" height="8" fill="#0A0A0A" />
                <rect x="70" y="60" width="18" height="10" fill="#FF1F2D" />
                <rect x="40" y="70" width="12" height="15" fill="#0A0A0A" />
                <rect x="60" y="78" width="12" height="8" fill="#E50914" />
                <rect x="80" y="80" width="10" height="10" fill="#0A0A0A" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">Scan ticket at entrance gate</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => alert(`Ticket #${ticket.bookingCode || 'EVNT-9842'} downloaded!`)}
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Save Ticket
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
