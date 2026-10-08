"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoBarbellOutline,
  IoCloseOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { useWorkout } from "../context/WorkoutContext";

/**
 * =======================================================================
 * FITLOG PRIMARY NAVIGATION COMPONENT (RESPONSIVE & STICKY)
 * =======================================================================
 * Breakpoint Grid Structure:
 * - xs (<576px): Mobile compact bar with hamburger trigger & micro plan badge
 * - sm (576px - 767.98px): Expanded mobile layout with quick action buttons
 * - md (768px - 991.98px): Tablet layout with horizontal links & standard pills
 * - lg (992px - 1199.98px): Desktop expanded links with hover glow physics
 * - xl (1200px - 1399.98px): Large desktop high-density layout
 * - 2xl (>=1400px): Max-width centered container with cinematic spacing
 * =======================================================================
 */

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Close drawer helper
  const handleNavigate = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-999 w-full bg-[#0f1115]/95 backdrop-blur-md border-b border-white/8 select-none transition-all duration-300">
      {/*
        Container Width Mapping:
        - xs: px-4 (compact)
        - sm: px-6
        - md: px-8
        - lg: px-10
        - xl & 2xl: max-w-7xl mx-auto
      */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-16 sm:h-18 flex items-center justify-between relative">
        {/* ========================================================= */}
        {/* 1. BRAND LOGO SECTION (Always navigates to Home: /)       */}
        {/* ========================================================= */}
        <Link
          href="/"
          onClick={handleNavigate}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer relative z-20 pointer-events-auto"
        >
          {/* Animated Barbell Frame */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#181b22] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#ccff00]/60 group-hover:bg-[#ccff00]/10 group-hover:shadow-[0_0_15px_rgba(204,255,0,0.35)]">
            <IoBarbellOutline className="w-4 h-4 sm:w-5 sm:h-5 text-[#ccff00] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-out" />
          </div>

          {/* Typography: Responsive size scaling */}
          <span className="font-heading text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-white uppercase group-hover:text-[#ccff00] transition-colors duration-200">
            FITLOG
          </span>
        </Link>

        {/* ========================================================= */}
        {/* 2. DESKTOP/TABLET NAVIGATION LINKS (Hidden on xs & sm)     */}
        {/* ========================================================= */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 relative z-20">
          {/* Workouts Link -> Home Page */}
          <Link
            href="/"
            className={`font-heading text-xs lg:text-sm uppercase tracking-wider transition-all duration-200 relative py-1 hover:text-white cursor-pointer ${
              pathname === "/" ? "text-white font-semibold" : "text-[#8b929e]"
            }`}
          >
            Workouts
            {pathname === "/" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ccff00] rounded-full shadow-[0_0_8px_#ccff00]" />
            )}
          </Link>

          {/* My Plan Link -> /my-plan */}
          <Link
            href="/my-plan"
            className={`font-heading text-xs lg:text-sm uppercase tracking-wider transition-all duration-200 relative py-1 hover:text-white cursor-pointer ${
              pathname === "/my-plan"
                ? "text-white font-semibold"
                : "text-[#8b929e]"
            }`}
          >
            My Plan
            {pathname === "/my-plan" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ccff00] rounded-full shadow-[0_0_8px_#ccff00]" />
            )}
          </Link>
        </nav>

        {/* ========================================================= */}
        {/* 3. DESKTOP & TABLET ACTION BUTTONS (Hidden on mobile)     */}
        {/* ========================================================= */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3.5 relative z-20">
          {/* Plan Pill Button with live counter */}
          <Link
            href="/my-plan"
            className="group flex items-center gap-2 bg-[#181b22] hover:bg-[#20252e] border border-white/10 hover:border-[#ccff00]/60 px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs font-semibold tracking-wide text-white transition-all duration-200 cursor-pointer pointer-events-auto transform hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(204,255,0,0.18)] active:scale-95"
          >
            <span className="group-hover:text-[#ccff00] transition-colors">
              Plan
            </span>
            <span className="flex items-center justify-center min-w-4.5 h-4.5 lg:min-w-5 lg:h-5 px-1 rounded-full bg-[#ccff00] text-black font-extrabold text-[10px] lg:text-[11px] transition-transform group-hover:scale-110">
              {planIds.length}
            </span>
          </Link>

          {/* Saved Pill Button with live counter */}
          <Link
            href="/my-plan"
            className="group flex items-center gap-2 bg-[#181b22] hover:bg-[#20252e] border border-white/10 hover:border-[#ccff00]/40 px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs font-semibold tracking-wide text-white transition-all duration-200 cursor-pointer pointer-events-auto transform hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,255,255,0.06)] active:scale-95"
          >
            <span className="text-[#8b929e] group-hover:text-white transition-colors">
              Saved
            </span>
            <span className="flex items-center justify-center min-w-4.5 h-4.5 lg:min-w-5 lg:h-5 px-1 rounded-full bg-white/15 text-white font-bold text-[10px] lg:text-[11px] transition-transform group-hover:scale-110">
              {savedIds.length}
            </span>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* 4. MOBILE CONTROLS (Portrait & Landscape Phones < 768px)  */}
        {/* ========================================================= */}
        <div className="flex md:hidden items-center gap-2 relative z-20">
          {/* Quick Plan Badge on Mobile */}
          <Link
            href="/my-plan"
            onClick={handleNavigate}
            className="flex items-center gap-1.5 bg-[#181b22] border border-white/10 px-2.5 py-1.5 rounded-full text-xs font-semibold text-white pointer-events-auto cursor-pointer active:scale-95 transition-transform"
          >
            <span>Plan</span>
            <span className="flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[#ccff00] text-black font-bold text-[10px]">
              {planIds.length}
            </span>
          </Link>

          {/* Hamburger Drawer Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-9 h-9 rounded-lg bg-[#181b22] border border-white/10 flex items-center justify-center text-white hover:text-[#ccff00] hover:border-[#ccff00]/50 transition-all cursor-pointer pointer-events-auto active:scale-95"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? (
              <IoCloseOutline className="w-5 h-5 text-[#ccff00]" />
            ) : (
              <IoMenuOutline className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. MOBILE DRAWER OVERLAY (Responsive across xs & sm)      */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0f1115]/98 backdrop-blur-xl px-4 sm:px-6 py-5 space-y-4 shadow-2xl relative z-1000 pointer-events-auto animate-in slide-in-from-top-2 duration-200">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 font-heading text-sm tracking-wider uppercase">
            <Link
              href="/"
              onClick={handleNavigate}
              className={`p-3 rounded-lg transition-colors cursor-pointer pointer-events-auto flex items-center justify-between ${
                pathname === "/"
                  ? "bg-[#181b22] text-[#ccff00] font-bold border border-[#ccff00]/30"
                  : "text-[#8b929e] hover:text-white hover:bg-white/5"
              }`}
            >
              <span>Workouts</span>
              {pathname === "/" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
              )}
            </Link>

            <Link
              href="/my-plan"
              onClick={handleNavigate}
              className={`p-3 rounded-lg transition-colors cursor-pointer pointer-events-auto flex items-center justify-between ${
                pathname === "/my-plan"
                  ? "bg-[#181b22] text-[#ccff00] font-bold border border-[#ccff00]/30"
                  : "text-[#8b929e] hover:text-white hover:bg-white/5"
              }`}
            >
              <span>My Plan</span>
              {pathname === "/my-plan" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
              )}
            </Link>
          </div>

          {/* Bottom Actions Tray for Mobile Drawer */}
          <div className="pt-3 border-t border-white/8 grid grid-cols-2 gap-2.5">
            <Link
              href="/my-plan"
              onClick={handleNavigate}
              className="flex items-center justify-center gap-2 bg-[#181b22] hover:bg-[#20252e] border border-white/10 py-2.5 rounded-xl text-xs font-semibold text-white pointer-events-auto cursor-pointer"
            >
              <span>Plan</span>
              <span className="bg-[#ccff00] text-black px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                {planIds.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              onClick={handleNavigate}
              className="flex items-center justify-center gap-2 bg-[#181b22] hover:bg-[#20252e] border border-white/10 py-2.5 rounded-xl text-xs font-semibold text-white pointer-events-auto cursor-pointer"
            >
              <span className="text-[#8b929e]">Saved</span>
              <span className="bg-white/15 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                {savedIds.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
