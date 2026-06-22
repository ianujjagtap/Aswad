"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { BranchMenuData, Locale, MenuPageData } from "@/lib/types/menu";
import { t } from "@/lib/types/menu";

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    );
  }
  if (platform === "zomato") {
    return (
      <span className="text-xs font-bold text-white">Zomato</span>
    );
  }
  if (platform === "swiggy") {
    return (
      <span className="text-xs font-bold text-[#fc8019]">Swiggy</span>
    );
  }
  return (
    <span className="text-xs font-semibold text-white">
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </span>
  );
}

function socialButtonStyle(platform: string): React.CSSProperties {
  switch (platform) {
    case "instagram":
      return {
        background:
          "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      };
    case "zomato":
      return { background: "#E23744" };
    case "swiggy":
      return { background: "#fff" };
    default:
      return {
        background: "linear-gradient(135deg, #ffd93d, #daa520)",
        color: "#1a0003",
      };
  }
}

function MenuPageView({
  page,
  locale,
}: {
  page: MenuPageData;
  locale: Locale;
}) {
  const images = [page.image1Url, page.image2Url].filter(Boolean) as string[];

  const renderColumn = (cols: MenuPageData["leftColumn"]) =>
    cols
      .filter((c) => c.isVisible)
      .map((category) => (
        <div key={category.id} className="flex flex-col">
          <div className="flex flex-col pb-0.5">
            <h3
              className={`text-[13.5px] tracking-wide text-[#ffd93d] font-normal ${locale === "mr" ? "font-[var(--font-yatra)]" : "font-sans"}`}
            >
              {t(locale, category.nameMr, category.nameEn)}
            </h3>
            <div
              className="mt-0.5 h-[1.2px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 217, 61, 0.6) 0%, rgba(255, 217, 61, 0.1) 100%)",
              }}
            />
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {category.items
              .filter((item) => item.isAvailable)
              .map((item) => (
                <div key={item.id} className="flex flex-col">
                  <div className="flex items-baseline justify-between text-[10.5px] leading-tight">
                    <div className="flex items-start gap-1">
                      <span className="mt-[3px] select-none text-[7px] text-[#ffd93d]">
                        ♦
                      </span>
                      <span
                        className={`font-semibold tracking-wide text-[#FFF8E7] ${locale === "mr" ? "font-[var(--font-devanagari)]" : "font-sans"}`}
                      >
                        {t(locale, item.nameMr, item.nameEn)}
                      </span>
                    </div>
                    <span className="ml-1.5 font-bold tabular-nums text-[#ffd93d]">
                      ₹{item.price}
                    </span>
                  </div>
                  {(item.descriptionMr || item.descriptionEn) && (
                    <span
                      className={`mt-0.5 pl-2.5 text-[8.5px] leading-relaxed text-stone-300/85 ${locale === "mr" ? "font-[var(--font-devanagari)] font-light" : "font-sans"}`}
                    >
                      {t(locale, item.descriptionMr, item.descriptionEn)}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      ));

  return (
    <>
      <div className="grid grid-cols-[1.12fr_auto_0.88fr] gap-x-2 pb-1">
        <div className="flex flex-col gap-2.5">{renderColumn(page.leftColumn)}</div>

        <div className="relative flex flex-col items-center justify-center py-1.5 select-none">
          <div className="h-full w-[1.2px] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
          <div
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border border-[#ffd93d]/40 bg-[#2d0206]"
            style={{ boxShadow: "0 0 4px rgba(255, 217, 61, 0.15)" }}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          {renderColumn(page.rightColumn)}
          {images.length > 0 && (
            <div className="relative mt-2.5 flex items-center justify-center gap-2">
              {images.map((imgUrl, imgIdx) => (
                <div
                  key={imgUrl}
                  className="relative size-[64px] overflow-hidden rounded-full shadow-lg"
                  style={{
                    border: "2px solid #ffd93d",
                    boxShadow: "0 0 10px rgba(255, 217, 61, 0.3)",
                    transform: `rotate(${imgIdx % 2 === 0 ? "3deg" : "-3deg"})`,
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(page.bottomTextMr || page.bottomTextEn) && (
        <div
          className="mt-2.5 rounded-lg px-3 py-1.5 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(168, 10, 24, 0.75), rgba(100, 5, 12, 0.75))",
            border: "1px solid rgba(255, 217, 61, 0.2)",
          }}
        >
          <p
            className={`text-[9.5px] font-bold tracking-wide text-amber-200/90 ${locale === "mr" ? "font-[var(--font-devanagari)]" : "font-sans"}`}
          >
            {t(locale, page.bottomTextMr, page.bottomTextEn)}
          </p>
        </div>
      )}
    </>
  );
}

export function MenuCard({ branch }: { branch: BranchMenuData }) {
  const [locale, setLocale] = useState<Locale>("mr");
  const [activeCategory, setActiveCategory] = useState<"veg" | "non-veg">(
    "non-veg"
  );
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredPages = branch.pages.filter((p) => p.category === activeCategory);
  const totalPages = filteredPages.length;

  const selectCategory = (cat: "veg" | "non-veg") => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    setCurrentPage(0);
  };

  const handleScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current || !scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / clientWidth);
      if (idx >= 0 && idx < totalPages) setCurrentPage(idx);
    }
  }, [totalPages]);

  const goToPage = (idx: number) => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    isProgrammaticScrollRef.current = true;
    setCurrentPage(idx);
    scrollRef.current?.scrollTo({
      left: idx * (scrollRef.current?.clientWidth ?? 0),
      behavior: "smooth",
    });
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 500);
  };

  return (
    <div
      className="relative min-h-screen pb-24 font-[var(--font-devanagari)] text-white antialiased select-none"
      style={{
        background:
          "linear-gradient(175deg, #1a0003 0%, #3d0208 25%, #5a0a14 50%, #3d0208 75%, #1a0003 100%)",
      }}
    >
      {/* Minimalist Language Toggle */}
      <div className="fixed right-3 top-3 z-50 flex items-center gap-2 rounded-full border border-[#ffd93d]/20 bg-[#1a0003]/60 px-3 py-1.5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setLocale("mr")}
          className="text-[10px] font-medium transition-colors"
          style={{ color: locale === "mr" ? "#ffd93d" : "rgba(255,217,61,0.5)" }}
        >
          मराठी
        </button>
        <button
          type="button"
          onClick={() => setLocale(locale === "mr" ? "en" : "mr")}
          className="relative h-4 w-8 rounded-full transition-colors"
          style={{ background: "rgba(255, 217, 61, 0.2)" }}
        >
          <div
            className="absolute top-0.5 h-3 w-3 rounded-full transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #ffd93d, #daa520)",
              left: locale === "mr" ? "2px" : "18px",
            }}
          />
        </button>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className="text-[10px] font-medium transition-colors"
          style={{ color: locale === "en" ? "#ffd93d" : "rgba(255,217,61,0.5)" }}
        >
          ENG
        </button>
      </div>

      <div className="mx-auto max-w-[440px] px-2.5 py-2">
        <div
          className="relative rounded-2xl p-[3px]"
          style={{
            background:
              "linear-gradient(135deg, #ffd93d 0%, #b8860b 25%, #ffd93d 50%, #b8860b 75%, #ffd93d 100%)",
            boxShadow:
              "0 0 25px rgba(255, 217, 61, 0.15), 0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="relative rounded-xl p-0.5"
            style={{ background: "linear-gradient(180deg, #4a030b, #2a0106)" }}
          >
            <div
              className="relative overflow-hidden rounded-lg px-2.5 pt-1.5 pb-2"
              style={{
                background:
                  "linear-gradient(180deg, #54040c 0%, #3d0208 40%, #2a0106 100%)",
              }}
            >
              <div className="flex justify-between px-2 text-[9px] font-bold tracking-wider text-amber-500/70">
                <span>
                  {locale === "mr" ? "प्रो." : "Prop."}{" "}
                  {t(locale, branch.proprietorMr, branch.proprietorEn)}
                </span>
                <span>{locale === "mr" ? "॥ श्री ॥" : "|| Shri ||"}</span>
                <span>
                  {locale === "mr" ? "मो." : "Ph."} {branch.phone}
                </span>
              </div>

              <div className="relative mt-4.5 flex justify-center">
                <div className="relative w-full max-w-[340px]">
                  <svg
                    className="w-full drop-shadow-lg"
                    viewBox="0 0 360 120"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffd93d" />
                        <stop offset="50%" stopColor="#ffd93d" />
                        <stop offset="100%" stopColor="#ffd93d" />
                      </linearGradient>
                      <linearGradient id="plaqueBg" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#c51323" />
                        <stop offset="100%" stopColor="#6e040c" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="10,60 50,8 310,8 350,60 310,112 50,112"
                      fill="none"
                      stroke="url(#goldBorder)"
                      strokeWidth="3.5"
                    />
                    <polygon
                      points="18,60 54,16 306,16 342,60 306,104 54,104"
                      fill="url(#plaqueBg)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="mb-0.5 text-[9px] font-bold uppercase leading-none text-amber-300/90">
                      {t(locale, branch.sinceMr, branch.sinceEn)}
                    </p>
                    <div className="relative flex flex-col items-center">
                      <h1
                        className="pr-2.2 text-[3rem] font-bold leading-none tracking-widest"
                        style={{
                          color: "#ffd93d",
                          fontFamily: "var(--font-ams-manthan), var(--font-cinzel-dec)",
                          textShadow:
                            "2px 2px 0 #500008, 0 0 6px rgba(255,217,61,0.6)",
                        }}
                      >
                        {branch.brandLogoText || "Aaasvaad"}
                      </h1>
                      <span
                        className={`absolute right-[12px] bottom-[-8px] text-[0.8rem] leading-none font-semibold whitespace-nowrap text-white/95 ${locale === "mr" ? "font-[var(--font-amita)]" : "font-[var(--font-amita)]"}`}
                      >
                        {t(locale, branch.taglineMr, branch.taglineEn)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-1.5 rounded-full border border-[#ffd93d]/30 bg-[#ffd93d]/10 px-3 py-1 shadow-[0_0_10px_rgba(255,217,61,0.1)] backdrop-blur-sm">
                  <span className="text-[10px]">📍</span>
                  <p className={`text-[11.5px] font-medium tracking-wide text-[#ffd93d] ${locale === "mr" ? "font-[var(--font-devanagari)]" : "font-sans"}`}>
                    {t(locale, branch.nameMr, branch.nameEn)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2.5">
                {(["veg", "non-veg"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => selectCategory(cat)}
                    className="flex items-center gap-2 px-4 py-1.5 text-[12px] whitespace-nowrap transition-all duration-300"
                    style={{
                      fontFamily: locale === "mr" ? "var(--font-yatra)" : "sans-serif",
                      color:
                        activeCategory === cat
                          ? "#1a0003"
                          : "rgba(255, 217, 61, 0.7)",
                      background:
                        activeCategory === cat
                          ? "linear-gradient(135deg, #ffd93d, #daa520)"
                          : "rgba(80, 0, 8, 0.35)",
                      border:
                        activeCategory === cat
                          ? "1.5px solid #ffd93d"
                          : "1px solid rgba(255, 217, 61, 0.18)",
                      borderRadius: "8px",
                    }}
                  >
                    {cat === "veg" ? (
                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border-[1.5px] border-green-600 bg-white">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                      </div>
                    ) : (
                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border-[1.5px] border-red-600 bg-white">
                        <div className="h-0 w-0 border-x-[3.5px] border-x-transparent border-b-[6px] border-b-red-600" />
                      </div>
                    )}
                    {cat === "veg" ? (locale === "mr" ? "शाकाहारी" : "VEG") : locale === "mr" ? "मांसाहारी" : "NON-VEG"}
                  </button>
                ))}
              </div>

              <div
                key={activeCategory}
                ref={scrollRef}
                onScroll={handleScroll}
                className="mt-3 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {filteredPages.map((page) => (
                  <div key={page.id} className="w-full shrink-0 snap-start">
                    <MenuPageView page={page} locale={locale} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-3 flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-2">
                    {filteredPages.map((page, idx) => (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => goToPage(idx)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: currentPage === idx ? "20px" : "6px",
                          height: "6px",
                          background:
                            currentPage === idx
                              ? "linear-gradient(90deg, #ffd93d, #f0c020)"
                              : "rgba(255, 217, 61, 0.15)",
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10.5px] font-medium tracking-widest text-[#ffd93d]/70">
                    {currentPage + 1} / {totalPages}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {branch.socialLinks.length > 0 && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 px-4 py-2"
          style={{
            background:
              "linear-gradient(180deg, rgba(26, 0, 3, 0.95), rgba(26, 0, 3, 1))",
            borderTop: "1px solid rgba(255, 217, 61, 0.1)",
          }}
        >
          <div className="mx-auto flex max-w-[400px] gap-2.5">
            {branch.socialLinks.slice(0, 4).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={t(locale, link.labelMr, link.labelEn)}
                className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 shadow-md transition-transform active:scale-95"
                style={socialButtonStyle(link.platform)}
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
