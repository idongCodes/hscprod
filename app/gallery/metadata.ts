import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HSC Gallery - Visuals & Behind the Scenes",
  description: "Explore HSC's visual gallery - behind the scenes photos, studio sessions, music video stills, and creative content from NYC producer.",
  keywords: ["HSC gallery", "music producer photos", "studio sessions", "behind the scenes", "music visuals", "hip hop gallery", "producer content"],
  openGraph: {
    title: "HSC Gallery - Visuals & Content",
    description: "Explore HSC's visual gallery with behind the scenes content and creative visuals.",
    type: "website",
    images: ["/images/hsc_logo_blk_bg.JPG"],
    url: "https://hscprod.com/gallery",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSC Gallery - Visuals & Content",
    description: "Explore HSC's visual gallery with behind the scenes content.",
    images: ["/images/hsc_logo_blk_bg.JPG"],
  },
};
