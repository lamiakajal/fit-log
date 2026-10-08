import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InitialLoader from "@/components/InitialLoader";
import { WorkoutProvider } from "@/context/WorkoutContext";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FitLog — Workout Library & Daily Lift Tracker",
    template: "%s | FitLog",
  },
  description:
    "Track every rep, hit your target progressive overload, and design your daily lifting split with zero friction.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "FitLog — Workout Library & Daily Lift Tracker",
    description:
      "Track every rep, hit your target progressive overload, and design your daily lifting split with zero friction.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ccff00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-[#0f1115] text-[#f1f3f7] font-sans antialiased selection:bg-[#ccff00] selection:text-black min-h-screen flex flex-col overflow-x-hidden">
        {/* Initial mount preloader */}
        <InitialLoader />

        {/* Global state and layout container */}
        <WorkoutProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
