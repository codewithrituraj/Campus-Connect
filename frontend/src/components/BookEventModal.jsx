import React, { useState } from 'react';
import { createRegistration } from '../services/api';

export default function BookEventModal({
  event,
  currentUser,
  onClose,
  onBookSuccess,
  isLiked = false,
  onLikeToggle,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!event) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await createRegistration(event.id);
      setIsSuccess(true);
      setTimeout(() => {
        onBookSuccess(result, event);
        onClose();
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed (HTTP 409 or 401).');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Banner image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Wishlist toggle */}
          <button
            type="button"
            onClick={() => onLikeToggle && onLikeToggle(event.id)}
            className="absolute top-4 right-16 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[20px] ${isLiked ? 'text-tertiary' : 'text-white'}`}>
              favorite
            </span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block px-2.5 py-0.5 font-label-caps text-label-caps bg-white/20 backdrop-blur-md rounded-md mb-1.5 border border-white/20">
              {event.category}
            </span>
            <h2 className="font-headline-lg text-headline-lg leading-tight text-white font-bold">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content details */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-on-surface-variant bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
              <span className="font-label-md text-label-md text-on-surface">{event.fullDate || event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">group</span>
              <span className="font-label-md text-label-md text-on-surface">Capacity: {event.capacity || 20} places</span>
            </div>
          </div>

          <div>
            <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1.5">
              API Registration Contract (POST /api/registrations)
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Registering will send a live request to <code className="bg-surface-container px-1 py-0.5 rounded text-xs text-primary font-bold">POST /api/registrations</code> with <code className="text-xs">event_id: "{event.id}"</code> and header <code className="text-xs">X-User-Id: "{currentUser?.id || '...'}"</code>.
            </p>
          </div>

          <div className="border border-outline-variant/40 rounded-2xl p-3.5 bg-surface-container-low flex items-center justify-between">
            <div>
              <p className="font-headline-sm text-headline-sm text-on-surface">Attendee</p>
              <p className="font-body-sm text-body-sm text-outline mt-0.5">{currentUser?.email || 'Guest User'}</p>
            </div>
            <span className="font-label-caps text-label-caps px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
              Free Admission
            </span>
          </div>

          <div className="flex items-center gap-2 font-body-sm text-body-sm text-outline">
            <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
            <span>Real-time seat verification • Immediate 201 status • Digital QR barcode</span>
          </div>
        </div>

        {/* Footer with Price and CTA */}
        <div className="p-4 sm:p-6 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between gap-4 mt-auto">
          <div>
            <span className="font-label-caps text-label-caps text-outline block">Fee</span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
              Free
            </span>
          </div>

          <button
            type="button"
            disabled={isSubmitting || isSuccess}
            onClick={handleConfirm}
            className={`py-3 px-6 rounded-full font-label-md text-label-md text-on-primary shadow-md transition-all flex items-center gap-2 cursor-pointer ${
              isSuccess
                ? 'bg-emerald-600'
                : 'bg-primary hover:bg-primary-container active:scale-95'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSubmitting ? 'progress_activity' : isSuccess ? 'check' : 'how_to_reg'}
            </span>
            <span>
              {isSubmitting
                ? 'Registering...'
                : isSuccess
                ? 'Registered (201 Created)!'
                : 'Confirm Registration'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
