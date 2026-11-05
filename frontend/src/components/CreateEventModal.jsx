import React, { useState } from 'react';

export default function CreateEventModal({ isOpen, onClose, onAddEvent }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Music');
  const [date, setDate] = useState('15 Dec 2026');
  const [time, setTime] = useState('6:00 PM');
  const [location, setLocation] = useState('Bangalore');
  const [venue, setVenue] = useState('UB City Arena, Bengaluru');
  const [price, setPrice] = useState('399');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);

    setTimeout(() => {
      onAddEvent({
        id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
        title: title || 'Bengaluru Music Showcase',
        category: category,
        categoryId: category.toLowerCase(),
        date: date.split(' ').slice(0, 2).join(' ') || '15 Dec',
        fullDate: `${date}, ${time}`,
        location: location,
        venue: venue,
        price: Number(price) || 299,
        priceLabel: `₹${price || 299} onwards`,
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
        description: description || 'Exciting community gathering with keynote speakers and live entertainment.',
        organizer: 'Verified CampusConnect Creator',
        isLiked: false,
      });
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/30 animate-in zoom-in-95 duration-200">
        <div className="bg-primary p-space-lg text-on-primary relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-on-primary flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <span className="font-label-caps text-label-caps text-on-primary-container tracking-wider uppercase">
            Organizer Portal
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold mt-1">Host an Event on CampusConnect</h2>
          <p className="font-body-sm text-body-sm text-on-primary-container opacity-90 mt-1">
            Reach thousands of enthusiastic attendees in Bangalore with instant ticketing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-space-lg space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Bangalore Indie Music Showcase"
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Music">Music</option>
                <option value="Cultural">Cultural</option>
                <option value="Tech">Tech</option>
                <option value="Workshops">Workshops</option>
                <option value="Food">Food</option>
                <option value="Arts">Arts</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
                Starting Price (₹)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="299"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="15 Dec 2026"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
                City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bangalore"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
              Venue Name & Address
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Palace Grounds / UB City, Bangalore"
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
              Event Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe event schedule, artist lineup, and guest guidelines..."
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={isSuccess}
              className="flex-1 py-3 px-4 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSuccess ? 'check' : 'rocket_launch'}
              </span>
              <span>{isSuccess ? 'Published to CampusConnect!' : 'Publish Event Now'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
