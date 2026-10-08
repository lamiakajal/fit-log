"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaDumbbell } from "react-icons/fa6";
import { useWorkout } from "@/context/WorkoutContext";

function NavbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const { planIds, savedIds } = useWorkout();

  // Active state detection
  const isPlanActive =
    pathname === "/my-plan" && (tabParam === "plan" || !tabParam);
  const isSavedActive = pathname === "/my-plan" && tabParam === "saved";

  return (
    <header className="w-full bg-[#0f1115] border-b border-white/6 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white hover:text-[#ccff00] transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#14161b] border border-white/10 flex items-center justify-center text-[#ccff00] group-hover:scale-105 group-hover:border-[#ccff00]/40 transition-all">
            <FaDumbbell className="w-4 h-4 transform -rotate-45" />
          </div>
          <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/"
            className={`font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative py-1 ${
              pathname === "/"
                ? "text-[#ccff00]"
                : "text-[#8b929e] hover:text-white"
            }`}
          >
            Workouts
            {pathname === "/" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ccff00] rounded-full" />
            )}
          </Link>

          <Link
            href="/my-plan?tab=plan"
            className={`font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative py-1 ${
              pathname === "/my-plan"
                ? "text-[#ccff00]"
                : "text-[#8b929e] hover:text-white"
            }`}
          >
            My Plan
            {pathname === "/my-plan" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ccff00] rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right Badges: Plan & Saved Dynamic Pill Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan Button */}
          <Link
            href="/my-plan?tab=plan"
            scroll={false}
            className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-200 text-xs font-heading font-semibold cursor-pointer transform-gpu active:scale-95 ${
              isPlanActive
                ? "bg-[#181b22] border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                : "bg-[#14161b] hover:bg-[#181b22] border border-white/8 hover:border-white/20 text-[#8b929e] hover:text-white"
            }`}
          >
            <span className={isPlanActive ? "text-white" : ""}>Plan</span>
            {/* Count Badge: 0 hole greyish, > 0 hole neon green */}
            <span
              className={`font-bold px-1.5 py-0.5 rounded-full text-[11px] leading-none min-w-4 text-center transition-colors ${
                planIds.length > 0
                  ? "bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                  : "bg-[#1f232b] text-[#8b929e]"
              }`}
            >
              {planIds.length}
            </span>
          </Link>

          {/* Saved Button */}
          <Link
            href="/my-plan?tab=saved"
            scroll={false}
            className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-200 text-xs font-heading font-semibold cursor-pointer transform-gpu active:scale-95 ${
              isSavedActive
                ? "bg-[#181b22] border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                : "bg-[#14161b] hover:bg-[#181b22] border border-white/8 hover:border-white/20 text-[#8b929e] hover:text-white"
            }`}
          >
            <span className={isSavedActive ? "text-white" : ""}>Saved</span>
            {/* Count Badge: 0 hole greyish, > 0 hole neon green */}
            <span
              className={`font-bold px-1.5 py-0.5 rounded-full text-[11px] leading-none min-w-4 text-center transition-colors ${
                savedIds.length > 0
                  ? "bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.3)]"
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
