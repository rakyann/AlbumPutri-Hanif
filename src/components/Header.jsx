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

        {/* Vintage Disposable Camera Hero CTA Badge */}
        <button
          onClick={onOpenCamera}
          className="mt-8 w-full max-w-xl sm:max-w-2xl p-5 sm:p-7 bg-gradient-to-br from-[#231e1c] via-[#2c2523] to-[#1a1514] text-[#faf6f0] border-2 border-amber-600/40 rounded-3xl shadow-2xl hover:shadow-amber-900/30 hover:border-amber-500 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer relative overflow-hidden group flex items-center justify-between gap-4"
        >
          {/* Decorative Film Edge Viewfinder Lines */}
          <div className="absolute top-2 left-6 right-6 flex justify-between text-[8px] font-mono text-amber-500/40 tracking-widest pointer-events-none select-none">
            <span>◄ FILM DISPOSABLE 35MM ►</span>
            <span>READY 36/36</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 z-10 pt-2">
            {/* Viewfinder Lens Icon Box */}
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-[#141110] border-2 border-amber-500/30 shadow-inner flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:scale-105 transition-all shrink-0 relative">
              <Camera className="w-7 h-7 sm:w-9 sm:h-9 text-amber-300" />
              {/* Glass Reflection Glow */}
              <div className="absolute top-1 right-1 w-3 h-3 bg-amber-200/20 rounded-full blur-[1px]" />
            </div>

            {/* Label & Details */}
            <div className="flex flex-col text-left">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-base sm:text-xl font-black uppercase tracking-wider text-[#faf6f0]">
                  AMBIL FOTO
                </span>
                <span className="bg-rose-950/80 text-rose-400 border border-rose-600/50 text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-md tracking-widest flex items-center gap-1 shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  ROLL READY
                </span>
              </div>
              <span className="text-xs sm:text-sm text-[#d4c8b5] font-mono tracking-widest mt-1">
                DIGITAL DISPOSABLE CAMERA
              </span>
            </div>
          </div>

          {/* Shutter Trigger Button Indicator */}
          <div className="z-10 shrink-0 flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500 text-[#1c1716] font-extrabold flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-400 transition-all text-base sm:text-lg">
              →
            </div>
            <span className="text-[8px] font-mono tracking-widest text-amber-400/80 uppercase">SHUTTER</span>
          </div>
        </button>

        <div className="editorial-line-v" />
      </div>
    </header>
  );
}
