import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer"; // <--- 1. Import the Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HSC Prod",
  description: "Official web app for HSC Prod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer /> {/* <--- 2. Add the Footer here */}
      </body>
    </html>
  );
}
