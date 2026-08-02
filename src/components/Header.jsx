import React from 'react';
import { Camera, QrCode, Tv, Download } from 'lucide-react';

export default function Header({ event, photoCount, onOpenCamera, onOpenQR, onOpenSlideshow, onDownloadAll }) {
  return (
    <header className="relative w-full text-center">
      {/* Top Banner Marquee */}
      <div className="marquee-bar bg-[#060606]">
        <div className="inline-block animate-pulse">
          {event.title.toUpperCase()} &nbsp;•&nbsp; {event.date.toUpperCase()} &nbsp;•&nbsp; DIGITAL DISPOSABLE CAMERA &nbsp;•&nbsp; {photoCount} MOMENTS CAPTURED
        </div>
      </div>

      {/* Main Hero B&W Cinematic Canvas */}
      <div className="relative w-full h-[50vh] min-h-[340px] max-h-[500px] bg-[#0d0d0d] overflow-hidden flex items-center justify-center">
        {/* Cover Image with B&W / Moody Contrast */}
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover grayscale contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0a0a0a]" />

        {/* Large Sweeping Calligraphy Title (Cordelia Rose Style) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <h1 className="font-calligraphy text-6xl sm:text-8xl md:text-9xl text-white font-normal leading-none drop-shadow-2xl select-none">
            {event.hostName}
          </h1>

          <div className="flex items-center gap-4 mt-3 text-[10px] sm:text-xs text-stone-300 uppercase tracking-editorial font-medium">
            <span>EST. 2026</span>
            <span>•</span>
            <span>{event.location}</span>
          </div>

          <p className="text-[10px] uppercase tracking-editorial text-stone-400 mt-1 font-mono">
            {event.title}
          </p>
        </div>
      </div>

      {/* Minimalist Editorial Action Bar */}
      <div className="px-6 py-4 bg-[#0a0a0a] border-b border-white/10 flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-editorial text-stone-300 font-semibold">
        <button
          onClick={onOpenCamera}
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Camera className="w-3.5 h-3.5 text-stone-400" />
          <span>Ambil Foto</span>
        </button>

        <button
          onClick={onOpenQR}
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <QrCode className="w-3.5 h-3.5 text-stone-400" />
          <span>Kode QR</span>
        </button>

        <button
          onClick={onOpenSlideshow}
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Tv className="w-3.5 h-3.5 text-stone-400" />
          <span>Live Slideshow</span>
        </button>

        <button
          onClick={onDownloadAll}
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-stone-400" />
          <span>Unduh Album</span>
        </button>
      </div>

      {/* Editorial Vertical Line & Quote Block */}
      <div className="px-6 py-8 flex flex-col items-center text-center">
        <div className="editorial-line-v" />

        <h2 className="font-calligraphy text-4xl sm:text-6xl text-white font-normal">
          Through the eyes of lovers
        </h2>

        <p className="text-[10px] sm:text-xs uppercase tracking-editorial text-stone-400 font-semibold mt-2">
          DOCUMENTING YOUR WEDDING STORY
        </p>

        <p className="text-xs sm:text-sm text-stone-400 max-w-lg mt-4 font-editorial italic leading-relaxed">
          Foto-foto dari sudut pandang para tamu tercinta. Momen spontan, tawa hangat, dan kenangan tak terlupakan yang diabadikan melalui Kamera Sekali Pakai Digital.
        </p>

        {/* 3 Editorial Quick Action Cards */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6">
          <button
            onClick={onOpenQR}
            className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-center gap-1.5 text-stone-300 hover:bg-white hover:text-black hover:border-white transition-all group"
          >
            <QrCode className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">KODE QR</span>
          </button>

          <button
            onClick={onOpenSlideshow}
            className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-center gap-1.5 text-stone-300 hover:bg-white hover:text-black hover:border-white transition-all group"
          >
            <Tv className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">SLIDESHOW</span>
          </button>

          <button
            onClick={onDownloadAll}
            className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-center gap-1.5 text-stone-300 hover:bg-white hover:text-black hover:border-white transition-all group"
          >
            <Download className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">UNDUH ZIP</span>
          </button>
        </div>

        {/* Big Pill Outline Primary Button */}
        <button
          onClick={onOpenCamera}
          className="btn-editorial-pill mt-4 w-full max-w-md py-3.5"
        >
          <Camera className="w-4 h-4" />
          <span>AMBIL FOTO (DISPOSABLE CAMERA)</span>
        </button>

        <div className="editorial-line-v" />
      </div>
    </header>
  );
}
