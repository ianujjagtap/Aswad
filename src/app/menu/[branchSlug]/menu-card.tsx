"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { aaswadMenuData, type BranchDetails, type MenuPageData } from "@/lib/demo-data";

interface ThemeConfig {
  id: string;
  name: string;
  previewColor: string;
  pageBg: string;
  cardBg: string;
  cardInnerBg: string;
  plaqueBg: string;
  activeTabBg: string;
  activeTabText: string;
  bottomRibbonBg: string;
}

const THEMES: Record<string, ThemeConfig> = {
  crimson: {
    id: "crimson",
    name: "रॉयल क्रिम्सन (Crimson)",
    previewColor: "#a80a18",
    pageBg: "linear-gradient(175deg, #1a0003 0%, #3d0208 25%, #5a0a14 50%, #3d0208 75%, #1a0003 100%)",
    cardBg: "linear-gradient(180deg, #4a030b, #2a0106)",
    cardInnerBg: "linear-gradient(180deg, #54040c 0%, #3d0208 40%, #2a0106 100%)",
    plaqueBg: "#a80a18",
    activeTabBg: "linear-gradient(135deg, #ffd93d, #f0c020)",
    activeTabText: "#1a0003",
    bottomRibbonBg: "linear-gradient(135deg, rgba(168, 10, 24, 0.75), rgba(100, 5, 12, 0.75))",
  },
  emerald: {
    id: "emerald",
    name: "रॉयल एमराल्ड (Emerald)",
    previewColor: "#055e34",
    pageBg: "linear-gradient(175deg, #01140a 0%, #032b17 25%, #064726 50%, #032b17 75%, #01140a 100%)",
    cardBg: "linear-gradient(180deg, #04351d, #021a0e)",
    cardInnerBg: "linear-gradient(180deg, #054124 0%, #032c18 40%, #021a0e 100%)",
    plaqueBg: "#055e34",
    activeTabBg: "linear-gradient(135deg, #ffd93d, #f0c020)",
    activeTabText: "#01140a",
    bottomRibbonBg: "linear-gradient(135deg, rgba(5, 94, 52, 0.75), rgba(2, 44, 24, 0.75))",
  },
  sapphire: {
    id: "sapphire",
    name: "रॉयल सॅफायर (Sapphire)",
    previewColor: "#083e66",
    pageBg: "linear-gradient(175deg, #010a14 0%, #03172b 25%, #062647 50%, #03172b 75%, #010a14 100%)",
    cardBg: "linear-gradient(180deg, #04243b, #02121e)",
    cardInnerBg: "linear-gradient(180deg, #052d47 0%, #031e30 40%, #02121e 100%)",
    plaqueBg: "#083e66",
    activeTabBg: "linear-gradient(135deg, #ffd93d, #f0c020)",
    activeTabText: "#010a14",
    bottomRibbonBg: "linear-gradient(135deg, rgba(8, 62, 102, 0.75), rgba(4, 30, 48, 0.75))",
  },
  charcoal: {
    id: "charcoal",
    name: "रॉयल चारकोल (Charcoal)",
    previewColor: "#262626",
    pageBg: "linear-gradient(175deg, #0b0b0b 0%, #151515 25%, #222222 50%, #151515 75%, #0b0b0b 100%)",
    cardBg: "linear-gradient(180deg, #1f1f1f, #121212)",
    cardInnerBg: "linear-gradient(180deg, #262626 0%, #1a1a1a 40%, #121212 100%)",
    plaqueBg: "#2d2d2d",
    activeTabBg: "linear-gradient(135deg, #ffd93d, #f0c020)",
    activeTabText: "#0b0b0b",
    bottomRibbonBg: "linear-gradient(135deg, rgba(51, 51, 51, 0.75), rgba(26, 26, 26, 0.75))",
  }
};

/* ── Single Menu Page (two-column flyer layout) ─────────────────────── */
function MenuPageView({ page, theme }: { page: MenuPageData; theme: ThemeConfig }) {
  return (
    <>
      <div className="grid grid-cols-[1.15fr_0.85fr] gap-x-3 pb-2">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          {page.leftColumn.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col">
              <h3 
                className="text-[15px] font-bold tracking-wide text-[#ffd93d] pb-1 font-[var(--font-amita)]"
                style={{ borderBottom: "1.5px solid rgba(255, 217, 61, 0.25)" }}
              >
                {category.nameMr}
              </h3>
              <div className="mt-2 flex flex-col gap-2">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col">
                    <div className="flex items-baseline justify-between text-[11px] font-medium">
                      <span className="text-stone-100/90 font-[var(--font-mukta)]">{item.nameMr}</span>
                      <span className="ml-1 text-[#ffd93d] font-bold tabular-nums font-[var(--font-mukta)]">₹{item.price}</span>
                    </div>
                    {item.descriptionMr && (
                      <span className="text-[8px] leading-relaxed text-stone-400 mt-0.5 pl-0.5 font-[var(--font-mukta)]">
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
                className="text-[15px] font-bold tracking-wide text-[#ffd93d] pb-1 font-[var(--font-amita)]"
                style={{ borderBottom: "1.5px solid rgba(255, 217, 61, 0.25)" }}
              >
                {category.nameMr}
              </h3>
              <div className="mt-2 flex flex-col gap-2">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col">
                    <div className="flex items-baseline justify-between text-[11px] font-medium">
                      <span className="text-stone-100/90 font-[var(--font-mukta)]">{item.nameMr}</span>
                      <span className="ml-1 text-[#ffd93d] font-bold tabular-nums font-[var(--font-mukta)]">₹{item.price}</span>
                    </div>
                    {item.descriptionMr && (
                      <span className="text-[8px] leading-relaxed text-stone-400 mt-0.5 pl-0.5 font-[var(--font-mukta)]">
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
          className="mt-3 rounded-lg py-2 px-3 text-center transition-all duration-500"
          style={{
            background: theme.bottomRibbonBg,
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

  const [activeThemeId, setActiveThemeId] = useState<string>("crimson");
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const theme = THEMES[activeThemeId] || THEMES.crimson;

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
      className="relative min-h-screen pb-24 font-[var(--font-mukta)] antialiased select-none text-white transition-all duration-500"
      style={{
        background: theme.pageBg
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
          className="relative rounded-2xl p-[3px] transition-all duration-500"
          style={{
            background: "linear-gradient(135deg, #ffd93d 0%, #b8860b 25%, #ffd93d 50%, #b8860b 75%, #ffd93d 100%)",
            boxShadow: "0 0 25px rgba(255, 217, 61, 0.15), 0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div 
            className="relative rounded-xl p-0.5 transition-all duration-500"
            style={{ background: theme.cardBg }}
          >
            <div 
              className="relative rounded-lg px-2.5 pt-2.5 pb-3 overflow-hidden transition-all duration-500"
              style={{ background: theme.cardInnerBg }}
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

              {/* Premium Color Theme Switcher */}
              <div className="mt-2.5 flex items-center justify-center gap-2">
                <span className="text-[8px] font-bold text-amber-500/40 uppercase tracking-widest">थीम:</span>
                <div className="flex gap-2">
                  {Object.values(THEMES).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveThemeId(t.id)}
                      className={`relative w-4.5 h-4.5 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 ${
                        activeThemeId === t.id 
                          ? "border-amber-400 scale-105 shadow-[0_0_8px_rgba(255,217,61,0.6)]" 
                          : "border-amber-500/20 opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        background: t.previewColor,
                      }}
                      title={t.name}
                    />
                  ))}
                </div>
              </div>

              {/* 2. Pointed Badge Logo Container */}
              <div className="relative mt-3 flex justify-center">
                {/* Ambient Gold Glow */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-56 h-20 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

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
                        <circle cx="10" cy="10" r="1.5" fill="rgba(255,217,61,0.3)" />
                        <circle cx="0" cy="0" r="1" fill="rgba(255,217,61,0.15)" />
                        <circle cx="20" cy="0" r="1" fill="rgba(255,217,61,0.15)" />
                        <circle cx="0" cy="20" r="1" fill="rgba(255,217,61,0.15)" />
                        <circle cx="20" cy="20" r="1" fill="rgba(255,217,61,0.15)" />
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
                      fill={theme.plaqueBg}
                      className="transition-all duration-500"
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
                    <circle cx="40" cy="60" r="2" fill="#ffd93d" opacity="0.4" />
                    <circle cx="320" cy="60" r="2" fill="#ffd93d" opacity="0.4" />
                    <circle cx="180" cy="14" r="1.5" fill="#ffd93d" opacity="0.3" />
                    <circle cx="180" cy="106" r="1.5" fill="#ffd93d" opacity="0.3" />
                  </svg>

                  {/* Text content overlaid on the badge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-[7px] font-bold text-amber-300/90 uppercase tracking-[0.18em] leading-none mb-0.5">
                      {branch.since}
                    </p>
                    
                    <h1 
                      className="text-[3rem] font-normal leading-none tracking-normal"
                      style={{
                        fontFamily: "var(--font-ams-manthan)",
                        color: "#ffd93d",
                        textShadow: "2px 2px 0px #500008, -1px -1px 0px #500008, 0 0 8px rgba(255, 217, 61, 0.3)"
                      }}
                    >
                      {"Aaasvaad"}
                    </h1>
                    
                    <p 
                      className="text-[0.95rem] font-normal tracking-widest text-white/95 leading-none mt-0.5"
                      style={{
                        fontFamily: "var(--font-ams-manthan)",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.7)"
                      }}
                    >
                      शाही बिर्याणी
                    </p>
                    
                    {/* Centered Veg / Non-veg Indicator Pair */}
                    <div className="flex items-center justify-center gap-2 mt-1.5 opacity-95">
                      <span className="inline-flex items-center justify-center border border-emerald-500 p-[1.5px] rounded-[2px] bg-[#1a0003]/60 w-3 h-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </span>
                      <span className="inline-flex items-center justify-center border border-rose-600 p-[1.5px] rounded-[2px] bg-[#1a0003]/60 w-3 h-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                      </span>
                    </div>
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
                        color: currentPage === idx ? theme.activeTabText : "rgba(255, 217, 61, 0.7)",
                        background: currentPage === idx 
                          ? theme.activeTabBg 
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
                    <MenuPageView page={page} theme={theme} />
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
        className="fixed inset-x-0 bottom-0 z-40 px-4 py-3 transition-all duration-500"
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
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#E23744] py-2.5 text-xs font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-[#c9303c]"
          >
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
