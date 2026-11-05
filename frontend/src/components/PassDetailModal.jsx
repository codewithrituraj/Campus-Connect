import React from 'react';

export default function PassDetailModal({
  passData,
  onClose,
  onSaveToWallet,
  onDownloadPdf,
}) {
  if (!passData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative transform transition-all animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-primary p-space-lg text-on-primary relative flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps text-on-primary-container tracking-wider uppercase">
              CampusConnect Verified Pass
            </span>
            <h2 className="font-headline-lg text-headline-lg tracking-tight mt-0.5">
              {passData.title}
            </h2>
            <p className="font-body-sm text-body-sm text-on-primary-container opacity-90">
              Order #{passData.orderId || 'EVT-9042'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-on-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-space-lg space-y-space-md">
          {/* Big QR Showcase */}
          <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col items-center justify-center text-center space-y-space-xs">
            <div className="w-48 h-48 bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center justify-center">
              <svg className="w-40 h-40 text-primary" fill="currentColor" viewBox="0 0 100 100">
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
            <span className="font-label-caps text-label-caps text-on-surface-variant pt-space-xs tracking-wider">
              SHOW AT CHECK-IN TURNSTILE
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              {passData.count || '1 Ticket'} Admission Granted
            </span>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-space-sm font-body-sm text-body-sm">
            <div className="bg-surface-container-low p-space-sm rounded-xl">
              <span className="font-label-caps text-label-caps text-outline block">DATE & TIME</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {passData.date}
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-xl">
              <span className="font-label-caps text-label-caps text-outline block">LOCATION</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {passData.location}
              </span>
            </div>
          </div>

          {/* Pass Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
            <button
              type="button"
              onClick={onSaveToWallet}
              className="w-full flex-1 py-space-xs px-space-md rounded-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-space-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_to_home_screen</span>
              Save to Wallet
            </button>
            <button
              type="button"
              onClick={onDownloadPdf}
              className="w-full flex-1 py-space-xs px-space-md rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md text-label-md flex items-center justify-center gap-space-xs shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
