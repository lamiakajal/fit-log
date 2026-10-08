"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaDumbbell } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import { useWorkout } from "@/context/WorkoutContext";

function NavbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { planIds, savedIds } = useWorkout();

  // Active state detection
  const isPlanActive =
    pathname === "/my-plan" && (currentTab === "plan" || !currentTab);
  const isSavedActive = pathname === "/my-plan" && currentTab === "saved";
  const isWorkoutsActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="w-full bg-[#0f1115] border-b border-white/6 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 sm:gap-2.5 text-white hover:text-[#ccff00] transition-colors group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#14161b] border border-white/10 flex items-center justify-center text-[#ccff00] group-hover:scale-105 group-hover:border-[#ccff00]/40 transition-all duration-300">
            <FaDumbbell className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform -rotate-45" />
          </div>
          <span className="font-heading text-lg sm:text-2xl font-extrabold tracking-wider uppercase text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Center Navigation Links: Desktop & Tablet Only */}
        <nav className="hidden md:flex items-center gap-2 sm:gap-3">
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

        {/* Right Badges & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Plan Pill Button */}
          <Link
            href="/my-plan?tab=plan"
            onClick={closeMobileMenu}
            className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all duration-300 ease-out text-xs sm:text-sm font-medium cursor-pointer transform-gpu hover:-translate-y-0.5 active:scale-95 ${
              isPlanActive
                ? "bg-[#181b22] border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                : "bg-[#14161b] hover:bg-[#181b22] border border-white/8 hover:border-[#ccff00]/40 text-[#8b929e] hover:text-white hover:shadow-[0_0_16px_rgba(204,255,0,0.12)]"
            }`}
          >
            <span className={isPlanActive ? "text-white" : ""}>Plan</span>
            <span
              className={`font-bold px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] leading-none min-w-3.5 sm:min-w-4 text-center transition-all duration-300 ${
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
            onClick={closeMobileMenu}
            className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all duration-300 ease-out text-xs sm:text-sm font-medium cursor-pointer transform-gpu hover:-translate-y-0.5 active:scale-95 ${
              isSavedActive
                ? "bg-[#181b22] border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                : "bg-[#14161b] hover:bg-[#181b22] border border-white/8 hover:border-[#ccff00]/40 text-[#8b929e] hover:text-white hover:shadow-[0_0_16px_rgba(204,255,0,0.12)]"
            }`}
          >
            <span className={isSavedActive ? "text-white" : ""}>Saved</span>
            <span
              className={`font-bold px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] leading-none min-w-3.5 sm:min-w-4 text-center transition-all duration-300 ${
                savedIds.length > 0
                  ? "bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.35)] group-hover:scale-105"
                  : "bg-[#1f232b] text-[#8b929e]"
              }`}
            >
              {savedIds.length}
            </span>
          </Link>

          {/* Mobile Hamburger Toggle Button (Hidden on md and up) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-xl bg-[#14161b] border border-white/10 text-white hover:text-[#ccff00] transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/6 bg-[#0f1115]/98 backdrop-blur-xl px-4 py-4 space-y-2 animate-fadeIn">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isWorkoutsActive
                ? "bg-[#1d2611] text-[#ccff00] font-semibold"
                : "text-[#8b929e] hover:text-white hover:bg-white/5"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan?tab=plan"
            onClick={closeMobileMenu}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isMyPlanActive
                ? "bg-[#1d2611] text-[#ccff00] font-semibold"
                : "text-[#8b929e] hover:text-white hover:bg-white/5"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
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
