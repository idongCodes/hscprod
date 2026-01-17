import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HSC Media - Music, Beats & Productions",
  description: "Listen to HSC's latest beats, productions, and collaborations. Stream hip hop, drill, and trap music from NYC's rising producer.",
  keywords: ["HSC beats", "hip hop beats", "drill music", "trap productions", "music producer", "NYC beats", "stream music", "hip hop producer"],
  openGraph: {
    title: "HSC Media - Music & Beats",
    description: "Stream HSC's latest beats and productions. Hip hop, drill, and trap music from NYC.",
    type: "website",
    images: ["/images/hsc_logo_blk_bg.JPG"],
    url: "https://hscprod.com/media",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSC Media - Music & Beats",
    description: "Stream HSC's latest beats and productions. Hip hop, drill, and trap music.",
    images: ["/images/hsc_logo_blk_bg.JPG"],
  },
};
