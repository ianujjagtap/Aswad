import type { Metadata } from "next";
import {
  Inter,
  Noto_Sans_Devanagari,
  Yatra_One,
  Rozha_One,
  Mukta,
  Amita,
  Cinzel,
  Cinzel_Decorative,
} from "next/font/google";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cinzelDec = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel-dec",
  weight: ["400", "700", "900"],
  display: "swap",
});

const amsManthan = localFont({
  src: "./fonts/AMS_Manthan.ttf",
  variable: "--font-ams-manthan",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const yatraOne = Yatra_One({
  subsets: ["devanagari"],
  variable: "--font-yatra",
  weight: "400",
  display: "swap",
});

const rozhaOne = Rozha_One({
  subsets: ["devanagari"],
  variable: "--font-rozha",
  weight: "400",
  display: "swap",
});

const amita = Amita({
  subsets: ["devanagari"],
  variable: "--font-amita",
  weight: ["400", "700"],
  display: "swap",
});

const mukta = Mukta({
  subsets: ["devanagari"],
  variable: "--font-mukta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// VERCEL_PROJECT_PRODUCTION_URL is set automatically by Vercel on every deployment
// (e.g. "aswad-liart.vercel.app"). Falls back to AUTH_URL for local dev.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.AUTH_URL ?? "http://localhost:3000");

// Absolute URL so WhatsApp / Telegram / iMessage crawlers never get a relative path
export const OG_IMAGE = `${siteUrl}/Aaswad-logo.jpeg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "आस्वाद शाही बिर्याणी | Aaswad Shahi Biryani",
  description:
    "आस्वाद शाही बिर्याणी - Authentic Biryani & Indian Cuisine. View our digital menu card.",
  openGraph: {
    title: "आस्वाद शाही बिर्याणी | Aaswad Shahi Biryani",
    description:
      "Authentic Biryani & Indian Cuisine. View our digital menu card.",
    type: "website",
    url: siteUrl,
    siteName: "Aaswad Shahi Biryani",
    images: [{ url: OG_IMAGE, alt: "आस्वाद शाही बिर्याणी" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "आस्वाद शाही बिर्याणी | Aaswad Shahi Biryani",
    description:
      "Authentic Biryani & Indian Cuisine. View our digital menu card.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mr"
      className={`${inter.variable} ${notoDevanagari.variable} ${yatraOne.variable} ${rozhaOne.variable} ${mukta.variable} ${amsManthan.variable} ${amita.variable} ${cinzel.variable} ${cinzelDec.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
