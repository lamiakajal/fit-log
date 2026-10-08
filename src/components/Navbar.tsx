"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaDumbbell } from "react-icons/fa6";
import { useWorkout } from "@/context/WorkoutContext";

function NavbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const { planIds, savedIds } = useWorkout();

  // Active state detection
  const isPlanActive =
    pathname === "/my-plan" && (currentTab === "plan" || !currentTab);
  const isSavedActive = pathname === "/my-plan" && currentTab === "saved";
  const isWorkoutsActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="w-full bg-[#0f1115] border-b border-white/6 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white hover:text-[#ccff00] transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#14161b] border border-white/10 flex items-center justify-center text-[#ccff00] group-hover:scale-105 group-hover:border-[#ccff00]/40 transition-all duration-300">
            <FaDumbbell className="w-4 h-4 transform -rotate-45" />
          </div>
          <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Center Navigation Links with Smooth Pill Animation */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {/* Workouts */}
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-out cursor-pointer transform-gpu hover:scale-[1.03] active:scale-95 ${
              isWorkoutsActive
                ? "bg-[#1d2611] text-[#ccff00] font-semibold shadow-[0_0_12px_rgba(204,255,0,0.15)]"
                : "text-[#8b929e] hover:text-white hover:bg-white/5"
            }`}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan?tab=plan"
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-out cursor-pointer transform-gpu hover:scale-[1.03] active:scale-95 ${
              isMyPlanActive
                ? "bg-[#1d2611] text-[#ccff00] font-semibold shadow-[0_0_12px_rgba(204,255,0,0.15)]"
                : "text-[#8b929e] hover:text-white hover:bg-white/5"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Badges: Font size strictly matching menu (text-xs sm:text-sm font-medium) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan Pill Button */}
          <Link
            href="/my-plan?tab=plan"
            className={`group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full transition-all duration-300 ease-out text-xs sm:text-sm font-medium cursor-pointer transform-gpu hover:-translate-y-0.5 active:scale-95 ${
              isPlanActive
                ? "bg-[#181b22] border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                : "bg-[#14161b] hover:bg-[#181b22] border border-white/8 hover:border-[#ccff00]/40 text-[#8b929e] hover:text-white hover:shadow-[0_0_16px_rgba(204,255,0,0.12)]"
            }`}
          >
            <span className={isPlanActive ? "text-white" : ""}>Plan</span>
            <span
              className={`font-bold px-1.5 py-0.5 rounded-full text-[11px] leading-none min-w-4 text-center transition-all duration-300 ${
                planIds.length > 0
                  ? "bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.35)] group-hover:scale-105"
                  : "bg-[#1f232b] text-[#8b929e]"
              }`}
            >
              {planIds.length}
            </span>
          </Link>

          {/* Saved Pill Button */}
          <Link
            href="/my-plan?tab=saved"
            className={`group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full transition-all duration-300 ease-out text-xs sm:text-sm font-medium cursor-pointer transform-gpu hover:-translate-y-0.5 active:scale-95 ${
              isSavedActive
                ? "bg-[#181b22] border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                : "bg-[#14161b] hover:bg-[#181b22] border border-white/8 hover:border-[#ccff00]/40 text-[#8b929e] hover:text-white hover:shadow-[0_0_16px_rgba(204,255,0,0.12)]"
            }`}
          >
            <span className={isSavedActive ? "text-white" : ""}>Saved</span>
            <span
              className={`font-bold px-1.5 py-0.5 rounded-full text-[11px] leading-none min-w-4 text-center transition-all duration-300 ${
                savedIds.length > 0
                  ? "bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.35)] group-hover:scale-105"
                  : "bg-[#1f232b] text-[#8b929e]"
              }`}
            >
              {savedIds.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 sm:h-20 bg-[#0f1115] w-full" />}>
      <NavbarContent />
    </Suspense>
  );
}
