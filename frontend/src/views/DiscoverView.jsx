import React, { useState } from 'react';
import { CATEGORIES } from '../data/mockData';

export default function DiscoverView({
  events = [],
  onSelectEvent = () => {},
  onLikeToggle = () => {},
  selectedCategory = 'all',
  onCategorySelect = () => {},
  searchQuery = '',
}) {
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    {
      eyebrow: 'LIVE BETTER',
      title: 'Discover Events',
      highlight: 'That Move You',
      subtitle: 'Music, culture, workshops, food, sports and more — all in one place.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    },
    {
      eyebrow: 'EXPERIENCE CULTURE',
      title: 'Celebrate Traditions',
      highlight: '& Festive Nights',
      subtitle: 'Immerse in colorful Garba nights, music festivals, and live concerts in Bengaluru.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    },
    {
      eyebrow: 'CONNECT & GROW',
      title: 'Explore Tech Summits',
      highlight: '& Masterclasses',
      subtitle: 'Connect with visionary founders, builders, and creative minds at KTPO & BIEC.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    },
  ];

  const currentSlide = heroSlides[heroIndex];

  const handlePrevSlide = () => {
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <span className="material-symbols-outlined text-[18px]">auto_awesome</span>;
      case 'Music':
        return <span className="material-symbols-outlined text-[18px]">music_note</span>;
      case 'Code':
        return <span className="material-symbols-outlined text-[18px]">terminal</span>;
      case 'Wrench':
        return <span className="material-symbols-outlined text-[18px]">handyman</span>;
      case 'Trophy':
        return <span className="material-symbols-outlined text-[18px]">emoji_events</span>;
      case 'Palette':
        return <span className="material-symbols-outlined text-[18px]">palette</span>;
      case 'Utensils':
        return <span className="material-symbols-outlined text-[18px]">restaurant</span>;
      case 'Briefcase':
        return <span className="material-symbols-outlined text-[18px]">business_center</span>;
      default:
        return <span className="material-symbols-outlined text-[18px]">auto_awesome</span>;
    }
  };

  // Filter events
  const filteredEvents = events.filter((ev) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      ev.categoryId === selectedCategory ||
      ev.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1240px] w-full mx-auto px-margin py-space-xl space-y-space-xl">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-inverse-surface text-on-primary min-h-[300px] md:min-h-[340px] flex items-center shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide.image}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105 transition-transform duration-700"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-inverse-surface/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl p-6 sm:p-10 lg:p-12">
          {/* Eyebrow */}
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-on-primary-container uppercase mb-2 font-label-caps">
            {currentSlide.eyebrow}
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-white font-display-hero">
            {currentSlide.title}{' '}
            <span className="italic font-serif font-medium bg-gradient-to-r from-primary-fixed-dim via-on-primary-container to-tertiary-fixed-dim bg-clip-text text-transparent">
              {currentSlide.highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-inverse-on-surface font-body-md max-w-xl leading-relaxed">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/10 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none pt-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategorySelect(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-label-md transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                  : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              {renderCategoryIcon(cat.icon)}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Events Section */}
      <div>
        <div className="flex items-center justify-between mb-space-md">
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Featured Events
          </h2>
          <button
            type="button"
            onClick={() => onCategorySelect('all')}
            className="flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors group cursor-pointer"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
            <p className="font-body-md text-on-surface-variant">No events found matching your filter.</p>
            <button
              type="button"
              onClick={() => onCategorySelect('all')}
              className="mt-3 font-label-sm text-primary font-bold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {filteredEvents.map((event) => {
              const [day, month] = event.date.split(' ');
              return (
                <div
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Event Image & Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Date badge: top right corner */}
                    <div className="absolute top-3 right-3 bg-surface-container-lowest/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-md flex flex-col items-center justify-center min-w-[42px] border border-outline-variant/20">
                      <span className="text-sm font-bold text-on-surface leading-none">{day}</span>
                      <span className="text-[11px] font-semibold text-outline leading-tight mt-0.5 uppercase">
                        {month}
                      </span>
                    </div>

                    {/* Category badge: bottom left over image */}
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center font-label-caps text-label-caps px-2.5 py-1 rounded-md shadow-sm bg-surface-container-lowest/90 backdrop-blur-md text-primary font-bold">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1.5 font-medium">
                        <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-outline-variant/30">
                      <div>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                          {event.priceLabel}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLikeToggle(event.id);
                        }}
                        aria-label="Wishlist"
                        className="p-1.5 rounded-full hover:bg-surface-container text-outline hover:text-tertiary transition-colors"
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] transition-transform active:scale-125 ${
                            event.isLiked ? 'text-tertiary font-variation-fill' : 'text-outline'
                          }`}
                        >
                          favorite
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
