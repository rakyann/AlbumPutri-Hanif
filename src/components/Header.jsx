import React from 'react';
import { Camera, QrCode, Tv, Download } from 'lucide-react';

export default function Header({ event, photoCount, onOpenCamera, onOpenQR, onOpenSlideshow, onDownloadAll }) {
  return (
    <header className="relative w-full text-center">
      {/* Top Banner Marquee */}
      <div className="marquee-bar bg-[#efe7db] text-[#574c43]">
        <div className="inline-block animate-pulse">
          {event.title.toUpperCase()} &nbsp;•&nbsp; {event.date.toUpperCase()} &nbsp;•&nbsp; DIGITAL DISPOSABLE CAMERA &nbsp;•&nbsp; {photoCount} MOMENTS CAPTURED
        </div>
      </div>

      {/* Main Hero B&W Cinematic Canvas */}
      <div className="relative w-full h-[50vh] min-h-[340px] max-h-[500px] bg-[#e8e0d2] overflow-hidden flex items-center justify-center">
        {/* Cover Image with B&W / Moody Contrast */}
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover grayscale contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#faf6f0]" />

        {/* Large Sweeping Calligraphy Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <h1 className="font-calligraphy text-6xl sm:text-8xl md:text-9xl text-white font-normal leading-none drop-shadow-2xl select-none">
            {event.hostName}
          </h1>

          <div className="flex items-center gap-3 mt-3 text-[11px] sm:text-xs text-stone-200 uppercase tracking-editorial font-medium drop-shadow">
            <span>SABTU, {event.date.toUpperCase()}</span>
            <span>•</span>
            <span>{event.location}</span>
          </div>

          <p className="text-[10px] uppercase tracking-editorial text-stone-300 mt-1 font-mono drop-shadow">
            {event.title}
          </p>
        </div>
      </div>

      {/* Minimalist Editorial Action Bar */}
      <div className="px-6 py-4 bg-[#faf6f0] border-b border-[#e5dcd0] flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-editorial text-[#574c43] font-semibold">
        <button
          onClick={onOpenCamera}
          className="hover:text-[#2c2523] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-[#786c65]" />
          <span>Ambil Foto</span>
        </button>

        <button
          onClick={onOpenQR}
          className="hover:text-[#2c2523] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5 text-[#786c65]" />
          <span>Kode QR</span>
        </button>

        <button
          onClick={onOpenSlideshow}
          className="hover:text-[#2c2523] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Tv className="w-3.5 h-3.5 text-[#786c65]" />
          <span>Live Slideshow</span>
        </button>

        <button
          onClick={onDownloadAll}
          className="hover:text-[#2c2523] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#786c65]" />
          <span>Unduh Album</span>
        </button>
      </div>

      {/* Editorial Quote & Clean Actions */}
      <div className="px-6 py-8 flex flex-col items-center text-center bg-[#faf6f0]">
        <div className="editorial-line-v" />

        <h2 className="font-calligraphy text-4xl sm:text-6xl text-[#2c2523] font-normal">
          Through the eyes of lovers
        </h2>

        <p className="text-[10px] sm:text-xs uppercase tracking-editorial text-[#786c65] font-semibold mt-2">
          DOCUMENTING OUR WEDDING STORY
        </p>

        <p className="text-xs sm:text-sm text-[#574c43] max-w-lg mt-4 font-editorial italic leading-relaxed">
          Foto-foto dari sudut pandang para tamu tercinta. Momen spontan, tawa hangat, dan kenangan tak terlupakan yang diabadikan melalui Kamera Sekali Pakai Digital.
        </p>

        {/* 3 Editorial Quick Action Cards */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6">
          <button
            onClick={onOpenQR}
            className="p-3.5 bg-white border border-[#e5dcd0] rounded-2xl flex flex-col items-center gap-1.5 text-[#2c2523] shadow-sm hover:shadow-md hover:bg-[#2c2523] hover:text-[#faf6f0] hover:border-[#2c2523] transition-all duration-300 group cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#786c65] group-hover:text-[#faf6f0] transition-colors" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">KODE QR</span>
          </button>

          <button
            onClick={onOpenSlideshow}
            className="p-3.5 bg-white border border-[#e5dcd0] rounded-2xl flex flex-col items-center gap-1.5 text-[#2c2523] shadow-sm hover:shadow-md hover:bg-[#2c2523] hover:text-[#faf6f0] hover:border-[#2c2523] transition-all duration-300 group cursor-pointer"
          >
            <Tv className="w-4 h-4 text-[#786c65] group-hover:text-[#faf6f0] transition-colors" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">SLIDESHOW</span>
          </button>

          <button
            onClick={onDownloadAll}
            className="p-3.5 bg-white border border-[#e5dcd0] rounded-2xl flex flex-col items-center gap-1.5 text-[#2c2523] shadow-sm hover:shadow-md hover:bg-[#2c2523] hover:text-[#faf6f0] hover:border-[#2c2523] transition-all duration-300 group cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#786c65] group-hover:text-[#faf6f0] transition-colors" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">UNDUH ZIP</span>
          </button>
        </div>

        {/* Full-width Large Card CTA Button - Dashed Cream Border Style */}
        <button
          onClick={onOpenCamera}
          className="mt-6 w-full py-10 sm:py-12 px-6 rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#c8bdab] bg-white/60 text-[#2c2523] hover:bg-[#2c2523] hover:text-[#faf6f0] hover:border-[#2c2523] transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex items-center justify-center gap-3.5 text-sm sm:text-base font-black tracking-editorial group"
        >
          <Camera className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
          <span>AMBIL FOTO (DISPOSABLE CAMERA)</span>
        </button>

        <div className="editorial-line-v" />
      </div>
    </header>
  );
}
