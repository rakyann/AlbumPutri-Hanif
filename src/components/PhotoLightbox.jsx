import React from 'react';
import { X, Heart, Download, Calendar, Share2 } from 'lucide-react';

export default function PhotoLightbox({ photo, onClose, onLikePhoto }) {
  if (!photo) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.imageUrl;
    link.download = `tuaipandang_${photo.guestName.replace(/\s+/g, '_')}_${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      // Fetch the image as a blob so we can share the actual file
      const response = await fetch(photo.imageUrl);
      const blob = await response.blob();
      const ext = blob.type.includes('png') ? 'png' : 'jpg';
      const fileName = `tuaipandang_${(photo.guestName || 'foto').replace(/\s+/g, '_')}.${ext}`;
      const file = new File([blob], fileName, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        // Share actual image file — works great on Android & iOS
        await navigator.share({
          files: [file],
          title: `📸 Foto dari Pernikahan Putri & Hanif`,
          text: `Momen spesial dari pernikahan Putri & Hanif – 8 Agustus 2026 💍\n\nLihat semua foto di: https://tuaipandang.vercel.app/e/putri-hanif`
        });
      } else if (navigator.share) {
        // Share via URL only (fallback)
        await navigator.share({
          title: `📸 Foto dari Pernikahan Putri & Hanif`,
          text: `Momen spesial dari pernikahan Putri & Hanif – 8 Agustus 2026 💍`,
          url: photo.imageUrl
        });
      } else {
        // Desktop fallback: copy URL to clipboard
        await navigator.clipboard.writeText(photo.imageUrl);
        alert('Link foto berhasil disalin! Tempel di IG, WA, atau aplikasi lain.');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        // Fallback: copy URL
        try {
          await navigator.clipboard.writeText(photo.imageUrl);
          alert('Link foto disalin ke clipboard!');
        } catch {
          console.error('Share failed:', err);
        }
      }
    }
  };

  const presetLabels = {
    portra400: 'KODAK PORTRA 400',
    cinestill800t: 'CINESTILL 800T',
    fujisuperia: 'FUJI SUPERIA 400',
    bwmono: 'B&W VINTAGE NOIR',
    clean: 'CLEAN ORIGINAL'
  };

  return (
    <div className="modal-backdrop-editorial z-50">
      <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          title="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Photo Image Viewport */}
        <div className="w-full md:w-3/5 bg-[#050505] flex items-center justify-center relative overflow-hidden p-2">
          <img
            src={photo.imageUrl}
            alt={photo.guestName}
            className="w-full h-full max-h-[75vh] object-contain rounded-lg"
          />

          {/* Preset Badge positioned at TOP-LEFT to avoid overlapping with bottom watermark */}
          <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-stone-300 border border-white/20 uppercase">
            {presetLabels[photo.presetId] || 'KODAK PORTRA 400'}
          </div>
        </div>

        {/* Content Side Column */}
        <div className="w-full md:w-2/5 p-6 md:p-8 bg-[#0a0a0a] flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
          <div>
            {/* Guest Info Tag */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 text-white font-serif-luxury text-lg flex items-center justify-center font-bold">
                {photo.guestName ? photo.guestName.charAt(0).toUpperCase() : 'T'}
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {photo.guestName || 'Tamu Acara'}
                </h4>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 flex items-center gap-1.5 mt-0.5 font-mono">
                  <Calendar className="w-3 h-3 text-stone-400" />
                  {new Date(photo.timestamp).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Wish Message Frame */}
            {photo.wish && (
              <div className="p-5 bg-white/[0.03] border-l-2 border-white/40 border-y border-r border-white/10 rounded-r-xl relative mb-6">
                <p className="text-base text-stone-200 font-editorial italic leading-relaxed">
                  "{photo.wish}"
                </p>
              </div>
            )}
          </div>

          {/* Minimalist Editorial Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            {/* Like button — full width */}
            <button
              onClick={() => onLikePhoto(photo.id)}
              className="w-full py-2.5 px-4 rounded-full border border-white/30 text-[10px] uppercase tracking-widest font-semibold text-stone-200 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{photo.likes || 0} SUKA</span>
            </button>

            {/* Download + Share side by side */}
            <div className="flex items-center gap-2">
              {/* Download */}
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 px-3 rounded-full bg-white text-black text-[10px] uppercase tracking-widest font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Download className="w-3.5 h-3.5" />
                <span>UNDUH</span>
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-[10px] uppercase tracking-widest font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-lg"
                title="Share ke IG, WA, dll"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>BAGIKAN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
