import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer"; // <--- 1. Import the Footer
import { AuthProvider } from "./AuthProvider"; // <--- Import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HSC Prod - Hip Hop Music Producer & Beatmaker",
  description: "HSC Prod - Professional hip hop music producer and beatmaker from NYC. Specializing in drill, trap, and modern hip hop beats. Stream, collaborate, and license beats.",
  keywords: ["HSC Prod", "hip hop producer", "beatmaker", "NYC music producer", "drill beats", "trap beats", "music production", "hip hop beats"],
  authors: [{ name: "HSC Prod" }],
  creator: "HSC Prod",
  publisher: "HSC Prod",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hscprod.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HSC Prod - Hip Hop Music Producer",
    description: "Professional hip hop music producer and beatmaker from NYC. Stream beats and collaborate.",
    type: "website",
    locale: "en_US",
    siteName: "HSC Prod",
    images: ["/images/hsc_logo_blk_bg.JPG"],
    url: "https://hscprod.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSC Prod - Hip Hop Music Producer",
    description: "Professional hip hop music producer and beatmaker from NYC. Stream beats and collaborate.",
    images: ["/images/hsc_logo_blk_bg.JPG"],
    site: "@hscprod",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer /> {/* <--- 2. Add the Footer here */}
        </AuthProvider>
      </body>
    </html>
  );
}
