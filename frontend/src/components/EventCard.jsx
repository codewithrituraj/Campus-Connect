import React from 'react';
import { MapPin, Heart } from 'lucide-react';

export default function EventCard({
  event,
  onLikeToggle = () => {},
  onSelect = () => {},
}) {
  const {
    id,
    title,
    category,
    date,
    location,
    priceLabel,
    image,
    isLiked,
  } = event;

  // Split date into day number and month if formatted like "12 Nov"
  const [day, month] = date.split(' ');

  const getCategoryBadgeClass = (cat) => {
    switch (cat.toLowerCase()) {
      case 'music':
        return 'bg-pink-50 text-pink-700 border-pink-100';
      case 'cultural':
      case 'arts':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'tech':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'food':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div
      onClick={() => onSelect(event)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Event Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Date badge: top right corner like in reference */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-md flex flex-col items-center justify-center min-w-[42px] border border-slate-100">
          <span className="text-sm font-bold text-slate-900 leading-none">{day}</span>
          <span className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">{month}</span>
        </div>

        {/* Category badge: bottom left over image */}
        <div className="absolute bottom-3 left-3">
          <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm border ${getCategoryBadgeClass(category)}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-[16px] text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-100">
          <div>
            <span className="text-sm font-bold text-slate-900">{priceLabel}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLikeToggle(id);
            }}
            aria-label="Wishlist"
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-slate-500'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
