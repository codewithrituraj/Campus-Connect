import React from 'react';

export default function EventlyLogo({ variant = 'dark', size = 'default', showText = true }) {
  const isLight = variant === 'light';

  const iconSizes = {
    small: 'w-6 h-6',
    default: 'w-7 h-7',
    large: 'w-9 h-9',
  };

  const textSizes = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2.5 cursor-pointer select-none">
      {/* Evently folded ticket / prism icon */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Angled ticket shape */}
          <path
            d="M8.5 4.5H23.5C25.1569 4.5 26.5 5.84315 26.5 7.5V11C25.1193 11 24 12.1193 24 13.5C24 14.8807 25.1193 16 26.5 16V24.5C26.5 26.1569 25.1569 27.5 23.5 27.5H8.5C6.84315 27.5 5.5 26.1569 5.5 24.5V16C6.88071 16 8 14.8807 8 13.5C8 12.1193 6.88071 11 5.5 11V7.5C5.5 5.84315 6.84315 4.5 8.5 4.5Z"
            stroke={isLight ? '#ffffff' : '#E50914'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 11L20 21"
            stroke={isLight ? '#ffffff' : '#FF1F2D'}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          <circle
            cx="16"
            cy="16"
            r="2"
            fill={isLight ? '#ffffff' : '#E50914'}
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-bold tracking-tight font-sans ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-on-surface'
          }`}
        >
          CampusConnect
        </span>
      )}
    </div>
  );
}
