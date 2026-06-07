"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { aaswadMenuData, type BranchDetails, type MenuPageData } from "@/lib/demo-data";

/* ── Single Menu Page (two-column flyer layout) ─────────────────────── */
function MenuPageView({ page }: { page: MenuPageData }) {
  return (
    <>
      <div className="grid grid-cols-[1.15fr_0.85fr] gap-x-3 pb-2">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          {page.leftColumn.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col">
              <h3 
                className="text-[14.5px] tracking-wide text-[#ffd93d] pb-0.5 font-[var(--font-yatra)] font-normal"
                style={{ borderBottom: "1.2px solid rgba(255, 217, 61, 0.25)" }}
              >
                {category.nameMr}
              </h3>
              <div className="mt-2 flex flex-col gap-2">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col">
                    <div className="flex items-baseline justify-between text-[11px] font-medium">
                      <span className="text-stone-100/90 font-[var(--font-mukta)] font-medium">{item.nameMr}</span>
                      <span className="ml-1 text-[#ffd93d] font-bold tabular-nums font-[var(--font-mukta)]">₹{item.price}</span>
                    </div>
                    {item.descriptionMr && (
                      <span className="text-[8.5px] leading-relaxed text-stone-400 mt-0.5 pl-0.5 font-[var(--font-mukta)] font-light">
                        {item.descriptionMr}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4">
          {page.rightColumn.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col">
              <h3 
                className="text-[14.5px] tracking-wide text-[#ffd93d] pb-0.5 font-[var(--font-yatra)] font-normal"
                style={{ borderBottom: "1.2px solid rgba(255, 217, 61, 0.25)" }}
              >
                {category.nameMr}
              </h3>
              <div className="mt-2 flex flex-col gap-2">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col">
                    <div className="flex items-baseline justify-between text-[11px] font-medium">
                      <span className="text-stone-100/90 font-[var(--font-mukta)] font-medium">{item.nameMr}</span>
                      <span className="ml-1 text-[#ffd93d] font-bold tabular-nums font-[var(--font-mukta)]">₹{item.price}</span>
                    </div>
                    {item.descriptionMr && (
                      <span className="text-[8.5px] leading-relaxed text-stone-400 mt-0.5 pl-0.5 font-[var(--font-mukta)] font-light">
                        {item.descriptionMr}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Biryani food photos */}
          <div className="relative mt-3 flex items-center justify-center gap-3">
            {page.images.map((imgUrl, imgIdx) => (
              <div 
                key={imgIdx}
                className="relative size-[72px] overflow-hidden rounded-full shadow-lg"
                style={{
                  border: "2.5px solid #ffd93d",
                  boxShadow: "0 0 12px rgba(255, 217, 61, 0.3), 0 4px 12px rgba(0,0,0,0.4)",
                  transform: `rotate(${imgIdx % 2 === 0 ? "3deg" : "-3deg"})`
                }}
              >
                <Image src={imgUrl} alt="Biryani" fill className="object-cover" sizes="72px" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Ribbon */}
      {page.bottomText && (
        <div 
          className="mt-3 rounded-lg py-2 px-3 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(168, 10, 24, 0.75), rgba(100, 5, 12, 0.75))",
            border: "1px solid rgba(255, 217, 61, 0.2)",
            boxShadow: "inset 0 1px 6px rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[9.5px] font-bold text-amber-200/90 tracking-wide font-[var(--font-mukta)]">
            {page.bottomText}
          </p>
        </div>
      )}
    </>
  );
}

/* ── Main MenuCard Component ────────────────────────────────────────── */
export function MenuCard({ branch = aaswadMenuData }: { branch?: BranchDetails }) {
  const pages = branch.pages;
  const totalPages = pages.length;

  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / clientWidth);
      if (idx >= 0 && idx < totalPages) {
        setCurrentPage(idx);
      }
    }
  }, [totalPages]);

  const goToPage = (idx: number) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    isProgrammaticScrollRef.current = true;
    setCurrentPage(idx);
    
    if (scrollRef.current) {
      const targetLeft = idx * scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: targetLeft, behavior: "smooth" });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 500);
  };

  return (
    <div 
      className="relative min-h-screen pb-24 font-[var(--font-mukta)] antialiased select-none text-white"
      style={{
        background: "linear-gradient(175deg, #1a0003 0%, #3d0208 25%, #5a0a14 50%, #3d0208 75%, #1a0003 100%)"
      }}
    >
      {/* Mandala Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0 C45 20, 35 20, 40 40 C45 20, 55 20, 80 40 C55 40, 55 50, 40 40 C55 30, 45 30, 40 0 Z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />

      <div className="mx-auto max-w-[440px] px-2.5 py-4">
        
        {/* ═══ Triple-layered Gold Border Frame ═══ */}
        <div 
          className="relative rounded-2xl p-[3px]"
          style={{
            background: "linear-gradient(135deg, #ffd93d 0%, #b8860b 25%, #ffd93d 50%, #b8860b 75%, #ffd93d 100%)",
            boxShadow: "0 0 25px rgba(255, 217, 61, 0.15), 0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div 
            className="relative rounded-xl p-0.5"
            style={{ background: "linear-gradient(180deg, #4a030b, #2a0106)" }}
          >
            <div 
              className="relative rounded-lg px-2.5 pt-2.5 pb-3 overflow-hidden"
              style={{ background: "linear-gradient(180deg, #54040c 0%, #3d0208 40%, #2a0106 100%)" }}
            >
              {/* Decorative SVG Corner Ornaments */}
              <div className="absolute top-2 left-2 w-6 h-6">
                <svg viewBox="0 0 24 24" className="w-full h-full text-amber-500/50">
                  <path d="M0 0 L12 0 Q4 4, 0 12 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute top-2 right-2 w-6 h-6">
                <svg viewBox="0 0 24 24" className="w-full h-full text-amber-500/50">
                  <path d="M24 0 L12 0 Q20 4, 24 12 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute bottom-2 left-2 w-6 h-6">
                <svg viewBox="0 0 24 24" className="w-full h-full text-amber-500/50">
                  <path d="M0 24 L0 12 Q4 20, 12 24 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6">
                <svg viewBox="0 0 24 24" className="w-full h-full text-amber-500/50">
                  <path d="M24 24 L24 12 Q20 20, 12 24 Z" fill="currentColor" />
                </svg>
              </div>

              {/* 1. Header Metadata */}
              <div className="flex justify-between px-2 text-[9px] font-bold text-amber-500/70 tracking-wider">
                <span>प्रोफ्रा. {branch.proprietor}</span>
                <span>॥ श्री ॥</span>
                <span>मो. {branch.phone}</span>
              </div>

              {/* 2. Pointed Badge Logo Container */}
              <div className="relative mt-4.5 flex justify-center">
                {/* Ambient Gold Glow */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-56 h-20 bg-amber-500/5 rounded-full blur-6xl pointer-events-none" />

                <div className="relative w-full max-w-[340px]">
                  {/* SVG Pointed Badge */}
                  <svg 
                    className="w-full drop-shadow-lg" 
                    viewBox="0 0 360 120" 
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffd93d" />
                        <stop offset="25%" stopColor="#b8860b" />
                        <stop offset="50%" stopColor="#ffd93d" />
                        <stop offset="75%" stopColor="#daa520" />
                        <stop offset="100%" stopColor="#ffd93d" />
                      </linearGradient>
                      <radialGradient id="badgeGlow" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </radialGradient>
                      <pattern id="scrollwork" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        {/* <circle cx="10" cy="10" r="1.5" fill="rgba(255,217,61,0.3)" />
                        <circle cx="0" cy="0" r="1" fill="rgba(255,217,61,0.15)" />
                        <circle cx="20" cy="0" r="1" fill="rgba(255,217,61,0.15)" />
                        <circle cx="0" cy="20" r="1" fill="rgba(255,217,61,0.15)" />
                        <circle cx="20" cy="20" r="1" fill="rgba(255,217,61,0.15)" /> */}
                      </pattern>
                    </defs>

                    {/* Outer gold border shape */}
                    <polygon
                      points="10,60 50,8 310,8 350,60 310,112 50,112"
                      fill="none"
                      stroke="url(#goldBorder)"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                    
                    {/* Fill between outer and inner border with scrollwork pattern */}
                    <polygon
                      points="10,60 50,8 310,8 350,60 310,112 50,112"
                      fill="url(#scrollwork)"
                      opacity="0.5"
                    />

                    {/* Inner fill shape */}
                    <polygon
                      points="18,60 54,16 306,16 342,60 306,104 54,104"
                      fill="#a80a18"
                    />

                    {/* Inner white accent border */}
                    <polygon
                      points="18,60 54,16 306,16 342,60 306,104 54,104"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.8"
                    />

                    {/* Inner radial glow */}
                    <polygon
                      points="18,60 54,16 306,16 342,60 306,104 54,104"
                      fill="url(#badgeGlow)"
                    />

                    {/* Decorative gold dots along inner border */}
                    {/* <circle cx="40" cy="60" r="2" fill="#ffd93d" opacity="0.4" />
                    <circle cx="320" cy="60" r="2" fill="#ffd93d" opacity="0.4" />
                    <circle cx="180" cy="14" r="1.5" fill="#ffd93d" opacity="0.3" />
                    <circle cx="180" cy="106" r="1.5" fill="#ffd93d" opacity="0.3" /> */}
                  </svg>

                  {/* Text content overlaid on the badge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] font-bold text-amber-300/90 uppercase leading-none mb-1">
                      {branch.since}
                    </p>
                    
                    {/* Aaasvaad Logo Text with Shahi Biryani at Bottom Right */}
                    <div className="relative flex flex-col items-center justify-center">
                      <h1 
                        className="text-[3.25rem] font-bold leading-none tracking-widest pr-2.2"
                        style={{
                          color: "#ffd93d",
                          fontFamily: "var(--font-ams-manthan)",
                          textShadow: "2px 2px 0px #500008, -1px -1px 0px #500008, 0 0 6px rgba(255, 217, 61, 0.6), 0 0 12px rgba(255, 217, 61, 0.3)"
                        }}
                      >
                        Aaasvaad
                      </h1>
                      
                      <span 
                        className="absolute bottom-[-6px] right-[12px] text-[0.82rem] font-normal tracking-widest text-white/95 leading-none whitespace-nowrap font-[var(--font-ams-manthan)]"
                        style={{
                          textShadow: "1px 1px 2.5px rgba(0,0,0,0.9)"
                        }}
                      >
                        शाही बिर्याणी
                      </span>
                    </div>
                    
                    {/* Centered Veg / Non-veg Indicator Pair */}
                    {/* <div className="flex items-center justify-center gap-2 mt-2 opacity-95">
                      <span className="inline-flex items-center justify-center border border-emerald-500 p-[1.5px] rounded-[2px] bg-[#1a0003]/60 w-3 h-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </span>
                      <span className="inline-flex items-center justify-center border border-rose-600 p-[1.5px] rounded-[2px] bg-[#1a0003]/60 w-3 h-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* 3. Royal Page Tabs */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-1.5">
                  {pages.map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToPage(idx)}
                      className="relative px-4 py-1.5 text-[10.5px] font-bold whitespace-nowrap transition-all duration-300 font-[var(--font-amita)]"
                      style={{
                        color: currentPage === idx ? "#1a0003" : "rgba(255, 217, 61, 0.7)",
                        background: currentPage === idx 
                          ? "linear-gradient(135deg, #ffd93d, #f0c020)" 
                          : "transparent",
                        border: currentPage === idx 
                          ? "1px solid #ffd93d"
                          : "1px solid rgba(255, 217, 61, 0.15)",
                        borderRadius: "6px",
                        boxShadow: currentPage === idx 
                          ? "0 2px 10px rgba(255, 217, 61, 0.25)"
                          : "none",
                      }}
                    >
                      {page.title}
                    </button>
                  ))}
                </div>
              )}

              {/* 4. Swipable Pages */}
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="mt-5 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {pages.map((page, idx) => (
                  <div key={idx} className="w-full shrink-0 snap-start snap-always">
                    <MenuPageView page={page} />
                  </div>
                ))}
              </div>

              {/* 5. Page Dots */}
              {totalPages > 1 && (
                <div className="mt-3 flex justify-center items-center gap-2">
                  {pages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToPage(idx)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: currentPage === idx ? "20px" : "6px",
                        height: "6px",
                        background: currentPage === idx
                          ? "linear-gradient(90deg, #ffd93d, #f0c020)"
                          : "rgba(255, 217, 61, 0.15)",
                        boxShadow: currentPage === idx ? "0 0 6px rgba(255, 217, 61, 0.4)" : "none",
                      }}
                    />
                  ))}
                  <span className="ml-1 text-[9px] text-amber-400/50 font-bold">
                    {currentPage + 1}/{totalPages}
                  </span>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed Sticky Order Footer ──────────────────────────────────── */}
      <div 
        className="fixed inset-x-0 bottom-0 z-40 px-4 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(26, 0, 3, 0.95), rgba(26, 0, 3, 1))",
          borderTop: "1px solid rgba(255, 217, 61, 0.1)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <div className="mx-auto flex max-w-[400px] gap-3">
          <a
            href={branch.zomatoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-xl overflow-hidden shadow-md transition-all duration-300 active:scale-95 h-11 bg-[#E23744] hover:bg-[#c9303c] border border-red-600/30"
          >
            <svg viewBox="0 0 2500 887.28" className="w-full h-auto max-h-7" xmlns="http://www.w3.org/2000/svg">
              <path d="m0 0h2500v887.28h-2500z" fill="#e23744"/>
              <path d="m593.17 322.1-1.73 55.55-144.88 157.48c60.52 0 98.89-.59 121.02-1.82-6.41 29.89-11.63 54.32-16.88 90.95-29.1-2.46-74.47-3.07-119.87-3.07-50.6 0-94.83.61-130.32 3.07l1.18-56.18 144.87-156.85c-63.42 0-86.7.6-112.87 1.21 5.8-28.08 9.88-59.2 13.95-90.34 45.96 1.83 64 2.43 123.93 2.43 55.28 0 86.68-.6 121.6-2.43zm164.67-16.5c-94.28 0-166.4 84.24-166.4 184.99 0 75.68 43.63 133.67 128.57 133.67 94.84 0 166.41-84.25 166.41-185.59 0-75.05-42.49-133.07-128.58-133.07zm-28.52 237.69c-20.95 0-33.16-18.95-33.16-56.18 0-55.55 22.69-100.1 50.63-100.1 20.35 0 32.57 18.33 32.57 56.15-.01 54.94-22.1 100.13-50.04 100.13zm1361.13-241.87c-95.49 0-168.57 85.35-168.57 187.37 0 76.71 44.2 135.47 130.26 135.47 96.08 0 168.59-85.36 168.59-188.01 0-76.06-43.01-134.83-130.28-134.83zm-30.69 241.55c-20.96 0-33.16-18.95-33.16-56.18 0-55.55 22.7-100.09 50.63-100.09 20.34 0 32.58 18.31 32.58 56.14-.01 54.96-22.12 100.13-50.05 100.13zm-684.04-127.48c7.57-51.87 3.5-98.88-54.09-98.88-41.9 0-87.28 35.41-119.28 94.62 6.99-48.85 2.9-94.62-54.11-94.62-43.05 0-89.6 37.23-121.61 98.88 8.15-40.29 6.41-86.08 4.08-95.84-33.16 5.5-62.24 8.54-102.98 9.76 1.17 28.09-.58 64.69-5.82 99.51l-13.38 91.55c-5.24 36.03-11.06 77.54-16.88 103.79h108.22c.59-15.89 4.67-40.91 7.57-62.88l9.31-62.86c7.56-40.92 40.13-89.12 65.15-89.12 14.55 0 13.98 14.03 9.9 40.28l-10.48 70.79c-5.25 36.03-11.05 77.54-16.88 103.79h109.38c.59-15.89 4.08-40.91 6.98-62.88l9.3-62.86c7.57-40.92 40.17-89.12 65.17-89.12 14.56 0 13.99 13.41 11.64 31.74l-26.13 183.12h99.83zm522.69 112.93-11.64 72.04c-18.04 9.76-51.79 23.81-90.77 23.81-66.33 0-79.7-35.41-69.24-110.49l16.88-120.87h-32.64l9.22-78.24 35.64-1.72 13.39-56.77 100.63-37.85-12.79 94.62h69.24c-2.32 9.76-10.49 63.5-12.78 79.96h-67.53l-15.13 111.71c-4.07 28.69-1.73 39.07 18.03 39.07 14.58-.01 36.09-8.56 49.49-15.27zm-381.77 38.91c36.63-4.54 61.84-39.85 67.9-75.08l1.02-9.44c-15.74-3.52-38.49-6.2-60.55-3.5-21.01 2.56-38.49 11.29-47.89 23.93-7.09 9.08-10.65 19.94-9.07 32.89 2.39 19.4 23.84 34.22 48.59 31.2zm-31.18 55.8c-51.7 6.35-85.75-14.17-95.97-60.85-6.41-29.37 2.49-62.83 18.06-82.79 20.85-26.11 54.83-42.87 96.3-47.93 33.37-4.14 61.49-2.1 87.79 2.88l1.09-4.51c.75-7.21 1.51-14.41.46-23.03-2.73-22.13-20.18-35.31-63.27-30.01-29.07 3.57-56.73 14.07-78.21 26.02l-20.89-63.13c29.11-16.71 65.8-29.43 107.79-34.59 80.21-9.84 136.57 15.74 143.79 74.54 1.91 15.64 2.14 32.21.17 47.25-10.3 72.71-16.9 127.42-19.79 164.09-.47 5.68-.43 15.43.08 29.26l-99.54-.09c2.12-5.73 4.02-13.5 5.71-23.25 1.12-6.41 1.92-14.5 2.42-24.3-21.03 28.87-49.95 46.01-85.99 50.44z" fill="#fff"/>
            </svg>
          </a>
          <a
            href={branch.swiggyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-xl overflow-hidden shadow-md transition-all duration-300 active:scale-95 h-11 bg-white hover:bg-stone-50 border border-stone-200/55 px-4"
          >
            <svg viewBox="-1.5 -1.1 2501.5 730" className="w-full h-auto max-h-6" xmlns="http://www.w3.org/2000/svg">
              <path d="M246.7 728.9c-.5-.3-1-.8-1.5-1.3-8.8-10.9-63-79-118.2-166.4-16.6-27.8-27.3-49.6-25.3-55.2 5.4-14.6 101.7-22.6 131.4-9.4 9 4 8.8 9.3 8.8 12.4 0 13.4-.7 49.2-.7 49.2 0 7.4 6 13.4 13.4 13.4s13.4-6 13.4-13.5l-.1-89.4c0-7.8-8.4-9.7-10-10-15.5-.1-46.9-.2-80.7-.2-74.5 0-91.1 3.1-103.8-5.2C45.9 435.5 1.1 314.3 0 246.1-1.5 149.9 55.4 66.6 135.4 25.3 168.8 8.4 206.6-1.1 246.5-1.1c126.7 0 231 95.9 244.9 219.3v.3c2.5 29.8-161.4 36.2-193.8 27.5-5-1.3-6.2-6.4-6.2-8.6 0-22.7-.2-86.5-.2-86.5 0-7.4-6-13.4-13.4-13.4s-13.4 6-13.4 13.5l.3 117.6c.2 7.4 6.4 9.4 8.1 9.7h101.7c54.3 0 77.1 6.3 92.2 17.9 10.1 7.7 14 22.5 10.6 41.7C446.9 508.5 254 720 246.7 728.9zm523-398.5c48.7 20.9 78.8 44.1 78.8 95.1 0 52-39.3 85.6-100.1 85.6-49.3 0-88.8-22.4-108.5-61.4l-3.2-6.3 57.9-33.7 3.8 6.2c13 21.4 27.6 30.5 48.8 30.5 18.2 0 30.5-8.1 30.5-20.2 0-13.4-8.9-18.4-36.3-30.4l-13.9-6c-37.2-15.9-71.6-38-71.6-91.5 0-48.1 36.7-81.6 89.3-81.6 39.8 0 67.2 15.5 86 48.7l3.5 6.2-56.1 36.2-3.9-6.9c-9.4-16.8-18.2-20.2-29.4-20.2-11.7 0-19.3 6.5-19.3 16.6 0 11.6 5.6 16.7 29.9 27.2zm410.1 9.8l40.9-114.4h70.2l-104 290h-15.6L1108.2 380c-2.9-6.2-6-13.9-8.6-21-2.7 7.1-5.8 14.8-8.7 21.1l-65.6 135.8h-15.5l-105.7-290h75l41.3 114.4c2.6 7.3 5.3 16.2 7.7 24.4 2.8-8.5 6.2-17.7 9.7-25.1l54.3-116.1h15l55.1 116.1c3.5 7.4 6.9 16.6 9.7 25.1 2.5-8.3 5.3-17.2 7.9-24.5zm192.9 167.3V219.9h70.8v287.6zm303.1-96.7v-64.3h131.5v128.9l-2.7 2.2c-15 12.4-54.9 33.4-109 33.4-91.2 0-154.8-60.6-154.8-147.4 0-85.2 61.4-147 146.1-147 46.5 0 80.7 13.2 104.3 40.2l4.6 5.3-48.3 48-5.2-5.4c-13.5-13.9-27.5-22.6-55.3-22.6-43.3 0-73.6 33.5-73.6 81.5 0 50 32.3 82.3 82.4 82.3 16.6 0 33.9-2.9 45.7-7.5v-27.7zm359 0v-64.3h131.5v128.9l-2.7 2.2c-15.1 12.4-54.9 33.4-109 33.4-91.2 0-154.8-60.6-154.8-147.4 0-85.2 61.4-147 146-147 46.6 0 80.7 13.2 104.3 40.2l4.6 5.3-48.3 48-5.3-5.4c-13.5-13.9-27.5-22.6-55.4-22.6-43.3 0-73.6 33.5-73.6 81.5 0 50 32.3 82.4 82.4 82.3 16.6 0 33.9-2.9 45.7-7.5v-27.7zM2426 219.9h74l-101.6 191.4v96.2h-71.2v-92.1L2218.9 220h79l50 91.7c5.4 10 11 23.2 15.3 33.9 4.1-10.6 9.4-23.7 14.8-33.8z" fill="#fc8019"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  );
}
