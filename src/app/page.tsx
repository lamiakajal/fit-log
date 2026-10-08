"use client";

import Banner from "@/components/Banner";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-[#0f1115] overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* 1. Hero Showcase Banner */}
      <Banner />

      {/* 2. Workout Library Grid */}
      <WorkoutLibrary />

      {/* 3. Footer Section */}
      <Footer />
    </main>
  );
}
