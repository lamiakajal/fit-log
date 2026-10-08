"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoBarbellOutline } from "react-icons/io5";

/**
 * ==============================================================================
 * FITLOG FOOTER COMPONENT (RESPONSIVE & SCROLL ANIMATED)
 * ==============================================================================
 * Media Query Breakpoint Grid Mapping:
 * - Extra Small (xs < 576px):
 *     Vertical centered stack, compact vertical padding, fluid text sizing.
 * - Small (sm: 576px - 767.98px):
 *     Split row transition, comfortable horizontal edge padding.
 * - Medium (md: 768px - 991.98px):
 *     Edge-to-edge balanced flex layout with subtle border highlights.
 * - Large (lg: 992px - 1199.98px):
 *     Standard desktop layout matching screenshot design.
 * - Extra Large & 2XL (>= 1200px):
 *     Constrained max-w-7xl auto container with high visual depth.
 *
 * Integrated Animations:
 * - IntersectionObserver: Smooth fade-in & upward slide entry on scroll.
 * - Hover Micro-interactions: Barbell icon rotation & neon glow physics.
 * ==============================================================================
 */

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Scroll entry animation trigger using native IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    const currentRef = footerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#0f1115] border-t border-white/8 mt-auto select-none overflow-hidden transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-7 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* ==================================================================== */}
        {/* 1. LEFT BRAND LOGO (Slide-in from Left on Scroll)                    */}
        {/* ==================================================================== */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8 sm:-translate-x-12"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer pointer-events-auto"
          >
            {/* Animated Barbell Frame with subtle neon hover glow */}
            <div className="w-8 h-8 rounded-lg bg-[#181b22] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#ccff00]/60 group-hover:bg-[#ccff00]/10 group-hover:shadow-[0_0_15px_rgba(204,255,0,0.35)]">
              <IoBarbellOutline className="w-4 h-4 text-[#ccff00] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-out" />
            </div>

            {/* Typography */}
            <span className="font-heading text-lg sm:text-xl font-bold tracking-wider text-white uppercase group-hover:text-[#ccff00] transition-colors duration-200">
              FITLOG
            </span>
          </Link>
        </div>

        {/* ==================================================================== */}
        {/* 2. RIGHT COPYRIGHT & MOTTO (Slide-in from Right on Scroll)          */}
        {/* ==================================================================== */}
        <div
          className={`transition-all duration-700 ease-out delay-100 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8 sm:translate-x-12"
          }`}
        >
          <p className="text-[#8b929e] hover:text-[#c5cbd6] transition-colors duration-200 text-xs sm:text-sm font-light text-center sm:text-right tracking-wide leading-relaxed">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
}
