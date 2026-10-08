"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDumbbell } from "react-icons/fa6";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = useWorkout();

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

        {/* Right Badges: Plan & Saved Pill Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan Pill Button */}
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 bg-[#14161b] hover:bg-[#1a1e26] border border-white/8 hover:border-[#ccff00]/40 px-3 sm:px-4 py-1.5 rounded-full transition-all text-xs font-heading font-semibold text-white cursor-pointer transform-gpu active:scale-95"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black font-bold px-1.5 py-0.2 rounded-full text-[11px] leading-tight min-w-4 text-center">
              {planIds.length}
            </span>
          </Link>

          {/* Saved Pill Button */}
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 bg-[#14161b] hover:bg-[#1a1e26] border border-white/8 hover:border-white/20 px-3 sm:px-4 py-1.5 rounded-full transition-all text-xs font-heading font-semibold text-white cursor-pointer transform-gpu active:scale-95"
          >
            <span className="text-[#8b929e]">Saved</span>
            <span className="bg-[#1f232b] text-[#8b929e] font-bold px-1.5 py-0.2 rounded-full text-[11px] leading-tight min-w-4 text-center">
              {savedIds.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
