import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train hard, log honest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-[#0f1115] text-[#f1f3f7] font-sans antialiased selection:bg-[#ccff00] selection:text-black min-h-screen flex flex-col">
        <WorkoutProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
