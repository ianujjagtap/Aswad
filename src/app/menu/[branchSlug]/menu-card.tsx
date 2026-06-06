"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { aaswadMenuData, type BranchDetails, type MenuPageData } from "@/lib/demo-data";

/* ── Single Menu Page (two-column flyer layout) ─────────────────────── */
function MenuPageView({ page }: { page: MenuPageData }) {
  return (
    <>
      {/* Two-Column Compact Flyer Menu Grid */}
      <div className="grid grid-cols-[1.15fr_0.85fr] gap-x-2.5 pb-2">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-3">
          {page.leftColumn.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col">
              <h3 className="text-[14px] font-normal tracking-wide text-[#ffd93d] border-b border-amber-500/20 pb-0.5 font-[var(--font-rozha)]">
                {category.nameMr}
              </h3>
              <div className="mt-1.5 flex flex-col gap-1.5">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col">
                    <div className="flex items-baseline justify-between text-[11.5px] font-extrabold">
                      <span className="text-stone-100">{item.nameMr}</span>
                      <span className="ml-1 text-[#ffd93d]">₹{item.price}</span>
                    </div>
                    {item.descriptionMr && (
                      <span className="text-[8.5px] leading-normal text-stone-300 mt-0.5 pl-0.5">
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
        <div className="flex flex-col gap-3">
          {page.rightColumn.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col">
              <h3 className="text-[14px] font-normal tracking-wide text-[#ffd93d] border-b border-amber-500/20 pb-0.5 font-[var(--font-rozha)]">
                {category.nameMr}
              </h3>
              <div className="mt-1.5 flex flex-col gap-1.5">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col">
                    <div className="flex items-baseline justify-between text-[11.5px] font-extrabold">
                      <span className="text-stone-100">{item.nameMr}</span>
                      <span className="ml-1 text-[#ffd93d]">₹{item.price}</span>
                    </div>
                    {item.descriptionMr && (
                      <span className="text-[8.5px] leading-normal text-stone-300 mt-0.5 pl-0.5">
                        {item.descriptionMr}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Overlapping circular dishes at bottom-right */}
          <div className="relative mt-4 flex items-center justify-center gap-1.5">
            {page.images.map((imgUrl, imgIdx) => (
              <div 
                key={imgIdx}
                className="relative size-16 overflow-hidden rounded-full border-2 border-amber-400 shadow-md"
                style={{
                  transform: `rotate(${imgIdx % 2 === 0 ? "4deg" : "-4deg"})`
                }}
              >
                <Image
                  src={imgUrl}
                  alt="Dishes illustration"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Ribbon Footer Banner */}
      {page.bottomText && (
        <div className="mt-2.5 rounded-lg border border-amber-500/30 bg-[#a80a18]/85 py-1.5 text-center shadow">
          <p className="text-[9.5px] font-bold text-amber-200 tracking-wide font-[var(--font-mukta)]">
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

  const handleScroll = useCallback(() => {
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
    setCurrentPage(idx);
    scrollRef.current?.scrollTo({ left: idx * (scrollRef.current?.clientWidth ?? 0), behavior: "smooth" });
  };

  return (
    <div 
      className="relative min-h-screen pb-24 font-[var(--font-mukta)] antialiased select-none text-white"
      style={{
        background: "radial-gradient(circle at center, #6b0813 0%, #4a030b 60%, #300005 100%)"
      }}
    >
      {/* Subtle Repeating Traditional Indian Mandala Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0 C45 20, 35 20, 40 40 C45 20, 55 20, 80 40 C55 40, 55 50, 40 40 C55 30, 45 30, 40 0 Z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />

      {/* Main Container optimized strictly for Mobile Viewport */}
      <div className="mx-auto max-w-[440px] px-2.5 py-4">
        
        {/* Border Frame for the Menu Flyer */}
        <div className="relative rounded-2xl border-4 border-amber-500/25 p-2 bg-[#54040c]/40 backdrop-blur-[1px]">
          
          {/* Decorative Corner Borders */}
          <div className="absolute top-1.5 left-1.5 size-4 border-t-2 border-l-2 border-amber-500/60 rounded-tl" />
          <div className="absolute top-1.5 right-1.5 size-4 border-t-2 border-r-2 border-amber-500/60 rounded-tr" />
          <div className="absolute bottom-1.5 left-1.5 size-4 border-b-2 border-l-2 border-amber-500/60 rounded-bl" />
          <div className="absolute bottom-1.5 right-1.5 size-4 border-b-2 border-r-2 border-amber-500/60 rounded-br" />

          {/* 1. Header Metadata Section */}
          <div className="flex justify-between px-1 text-[9px] font-bold text-amber-500/80">
            <span>प्रोफ्रा. {branch.proprietor}</span>
            <span>॥ श्री ॥</span>
            <span>मो. {branch.phone}</span>
          </div>

          {/* 2. Indian Temple Dome/Arch Logo Header Banner */}
          <div className="relative mt-2 flex justify-center">
            <div 
              className="relative w-full max-w-[320px] bg-[#a80a18] border-2 border-amber-500/70 px-4 py-2.5 text-center shadow-lg"
              style={{
                borderRadius: "45% 45% 12px 12px / 28px 28px 12px 12px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.15)"
              }}
            >
              <p className="text-[8.5px] font-bold text-amber-300 uppercase tracking-widest leading-none">
                {branch.since}
              </p>
              
              <h1 
                className="mt-1 text-[3.2rem] font-normal leading-none tracking-normal"
                style={{
                  fontFamily: "var(--font-ams-manthan)",
                  color: "#ffd93d",
                  textShadow: "1.5px 1.5px 0px #300005, -1.5px -1.5px 0px #300005, 2px 2px 4px rgba(0,0,0,0.4)"
                }}
              >
                {"Aaasvaad"}
              </h1>
              
              <p 
                className="pl-28 text-base font-normal tracking-wide text-white font-[var(--font-rozha)]"
                style={{
                  fontFamily: "var(--font-ams-manthan)",
                  textShadow: "1px 1px 1.5px rgba(0,0,0,0.5)"
                }}
              >
                शाही बिर्याणी
              </p>
            </div>
          </div>

          {/* 3. Page Tabs (shown only when multiple pages) */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {pages.map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  className={`px-3.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-300 border ${
                    currentPage === idx
                      ? "bg-amber-400 text-stone-950 border-amber-400 shadow-md scale-105"
                      : "bg-transparent text-stone-300 border-amber-500/20 hover:border-amber-500/40"
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>
          )}

          {/* 4. Swipable Pages Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="mt-5 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pages.map((page, idx) => (
              <div 
                key={idx} 
                className="w-full shrink-0 snap-start snap-always"
              >
                <MenuPageView page={page} />
              </div>
            ))}
          </div>

          {/* 5. Page Dots Indicator */}
          {totalPages > 1 && (
            <div className="mt-3 flex justify-center items-center gap-2">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    currentPage === idx 
                      ? "w-5 h-1.5 bg-amber-400" 
                      : "size-1.5 bg-amber-400/25"
                  }`}
                />
              ))}
              <span className="ml-1.5 text-[9px] text-amber-400/60 font-bold">
                {currentPage + 1}/{totalPages}
              </span>
            </div>
          )}

        </div>

      </div>

      {/* ── Fixed Sticky Order Actions Footer ──────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-amber-700/20 bg-[#4a030b] px-4 py-3 shadow-2xl">
        <div className="mx-auto flex max-w-[400px] gap-3">
          <a
            href={branch.zomatoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#E23744] py-2.5 text-xs font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-[#c9303c]"
          >
            {/* Zomato Logo */}
            <svg className="size-5 shrink-0" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="100" fill="white"/>
              <path d="M56 82h88c3.3 0 6 2.7 6 6v24c0 3.3-2.7 6-6 6H56c-3.3 0-6-2.7-6-6V88c0-3.3 2.7-6 6-6z" fill="#E23744"/>
              <text x="100" y="105" textAnchor="middle" fill="white" fontSize="26" fontWeight="bold" fontFamily="Arial,sans-serif">zomato</text>
            </svg>
            Zomato वर ऑर्डर करा
          </a>
          <a
            href={branch.swiggyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#FC8019] py-2.5 text-xs font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-[#e47214]"
          >
            {/* Swiggy Logo */}
            <svg className="size-5 shrink-0" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="100" fill="white"/>
              <path d="M100 40c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm-8 92c-2.2 0-4-1.8-4-4v-12c0-2.2 1.8-4 4-4h4V96h-4c-2.2 0-4-1.8-4-4V80c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v32h4c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4H92z" fill="#FC8019"/>
            </svg>
            Swiggy वर ऑर्डर करा
          </a>
        </div>
      </div>

    </div>
  );
}
