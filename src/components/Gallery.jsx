import React, { useState } from 'react';
import { Heart, Sparkles, Eye } from 'lucide-react';

export default function Gallery({ photos, onSelectPhoto, onLikePhoto }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredPhotos = React.useMemo(() => {
    let result = [...photos];
    if (activeTab === 'wishes') {
      result = result.filter(p => p.wish && p.wish.trim().length > 0);
    } else if (activeTab === 'popular') {
      result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return result;
  }, [photos, activeTab]);

  return (
    <section className="w-full px-6 py-4 border-t border-white/10">
      {/* Editorial Gallery Header */}
      <div className="flex flex-col items-center text-center gap-2 mb-8">
        <h2 className="font-calligraphy text-4xl sm:text-5xl text-white font-normal">
          The Moment Gallery
        </h2>
        <p className="text-[10px] sm:text-xs uppercase tracking-editorial text-stone-400 font-semibold">
          COLLECTIVE MOMENTS & GUEST WISHES
        </p>

        {/* Minimalist Pill Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-editorial font-semibold transition-all border ${
              activeTab === 'all'
                ? 'bg-white text-black border-white'
                : 'text-stone-400 border-white/20 hover:border-white/50 hover:text-white'
            }`}
          >
            ALL ({photos.length})
          </button>

          <button
            onClick={() => setActiveTab('wishes')}
            className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-editorial font-semibold transition-all border ${
              activeTab === 'wishes'
                ? 'bg-white text-black border-white'
                : 'text-stone-400 border-white/20 hover:border-white/50 hover:text-white'
            }`}
          >
            WISHES
          </button>

          <button
            onClick={() => setActiveTab('popular')}
            className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-editorial font-semibold transition-all border ${
              activeTab === 'popular'
                ? 'bg-white text-black border-white'
                : 'text-stone-400 border-white/20 hover:border-white/50 hover:text-white'
            }`}
          >
            FAVORITES
          </button>
        </div>
      </div>

      {/* Grid Container */}
      {filteredPhotos.length === 0 ? (
        <div className="p-12 text-center flex flex-col items-center gap-2 text-stone-400 border border-white/10 rounded-2xl bg-white/[0.02]">
          <p className="text-xs uppercase tracking-editorial">NO PHOTOS IN THIS CATEGORY YET</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="group relative aspect-square bg-[#121212] overflow-hidden border border-white/10 cursor-pointer transition-all duration-500 hover:border-white/40"
            >
              {/* Photo Image */}
              <img
                src={photo.imageUrl}
                alt={`Momen oleh ${photo.guestName}`}
                className="w-full h-full object-cover grayscale-[25%] contrast-110 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />

              {/* Preset Badge */}
              <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-stone-300 border border-white/10 uppercase">
                {photo.presetId || 'PORTRA400'}
              </div>

              {/* Bottom Card Details Bar */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-end justify-between text-white">
                <div className="truncate pr-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-100 truncate">
                    {photo.guestName || 'Tamu Acara'}
                  </p>
                  {photo.wish && (
                    <p className="text-[11px] text-stone-300 font-editorial italic truncate mt-0.5">
                      "{photo.wish}"
                    </p>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikePhoto(photo.id);
                  }}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:scale-110 transition-transform bg-black/60 px-2 py-0.5 rounded-full border border-white/20"
                >
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span className="font-mono text-[10px] text-gray-200">{photo.likes || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
