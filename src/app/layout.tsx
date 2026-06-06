import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Yatra_One, Rozha_One, Mukta, Amita } from "next/font/google";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

export const metadata: Metadata = {
  title: "आस्वाद शाही बिर्याणी | Aaswad Shahi Biryani",
  description:
    "आस्वाद शाही बिर्याणी - Authentic Biryani & Indian Cuisine. View our digital menu card.",
  openGraph: {
    title: "आस्वाद शाही बिर्याणी | Aaswad Shahi Biryani",
    description:
      "Authentic Biryani & Indian Cuisine. View our digital menu card.",
    type: "website",
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
      className={`${inter.variable} ${notoDevanagari.variable} ${yatraOne.variable} ${rozhaOne.variable} ${mukta.variable} ${amsManthan.variable} ${amita.variable}`}
    >
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
