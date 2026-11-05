import React from 'react';

export default function WalletSyncModal({ isOpen, onClose, onSync }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-space-lg shadow-2xl relative space-y-space-md text-center animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 mx-auto rounded-full bg-surface-container text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px]">phone_iphone</span>
        </div>

        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Digital Wallet Integration</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Sync your passes automatically with Apple Wallet or Google Wallet for NFC tap-and-go entry.
          </p>
        </div>

        <div className="space-y-space-sm">
          <button
            type="button"
            onClick={() => onSync('Apple Wallet')}
            className="w-full py-3 px-space-md rounded-xl bg-inverse-surface text-inverse-on-surface hover:opacity-90 transition-opacity font-label-md text-label-md flex items-center justify-center gap-space-sm cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">smartphone</span>
            Add All to Apple Wallet
          </button>
          <button
            type="button"
            onClick={() => onSync('Google Wallet')}
            className="w-full py-3 px-space-md rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md flex items-center justify-center gap-space-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            Add All to Google Wallet
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="font-label-sm text-label-sm text-outline hover:text-on-surface cursor-pointer pt-1"
        >
          Close Window
        </button>
      </div>
    </div>
  );
}
