import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HSC IRL Shows & Venues - Live Performances",
  description: "See where HSC performs live! Upcoming shows, past venues, and booking information for live performances in NYC and beyond.",
  keywords: ["HSC live shows", "NYC music venues", "live performances", "music producer events", "venue booking", "HSC concerts", "Brooklyn music events", "Manhattan live shows"],
  openGraph: {
    title: "HSC IRL - Live Shows & Venues",
    description: "Catch HSC live! View upcoming performances, past shows, and book HSC for your venue.",
    type: "website",
    images: ["/images/hsc_logo_blk_bg.JPG"],
    url: "https://hscprod.com/irl",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSC IRL - Live Shows",
    description: "See where HSC performs live and book for your venue!",
    images: ["/images/hsc_logo_blk_bg.JPG"],
  },
};
