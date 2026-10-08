"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaDumbbell } from "react-icons/fa6";
import { FiGithub, FiTwitter, FiInstagram, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance transition on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const currentRef = footerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#0b0d11] border-t border-white/6 select-none mt-16 sm:mt-24 overflow-hidden"
    >
      <style>{`
        @keyframes footerAuraPulse {
          0%, 100% {
            opacity: 0.2;
            transform: translate(-50%, 0) scale(1);
          }
          50% {
            opacity: 0.55;
            transform: translate(-50%, 0) scale(1.2);
          }
        }
        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px) rotate(-45deg);
          }
          50% {
            transform: translateY(-3px) rotate(-45deg);
          }
        }
        .footer-glow-loop {
          animation: footerAuraPulse 4.5s ease-in-out infinite;
        }
        .footer-icon-float {
          animation: iconFloat 3s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient backdrop glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-85 sm:w-137.5 md:w-175 h-36 bg-[#ccff00]/6 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none footer-glow-loop" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 md:py-16">
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-white/6 items-start transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Brand */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-white hover:text-[#ccff00] transition-colors group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14161b] border border-white/10 flex items-center justify-center text-[#ccff00] group-hover:scale-105 group-hover:border-[#ccff00]/50 transition-all duration-300">
                <FaDumbbell className="w-4 h-4 footer-icon-float" />
              </div>
              <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-white">
                FIT
                <span className="text-[#ccff00] [text-shadow:0_0_12px_rgba(204,255,0,0.4)]">
                  LOG
                </span>
              </span>
            </Link>
            <p className="text-[#8b929e] text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Track every rep, hit your target progressive overload, and design
              your daily lifting split with zero friction.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#8b929e] hover:text-[#ccff00] hover:translate-x-1 inline-block transition-all"
                >
                  Workouts Library
                </Link>
              </li>
              <li>
                <Link
                  href="/my-plan?tab=plan"
                  className="text-[#8b929e] hover:text-[#ccff00] hover:translate-x-1 inline-block transition-all"
                >
                  Today&apos;s Plan
                </Link>
              </li>
              <li>
                <Link
                  href="/my-plan?tab=saved"
                  className="text-[#8b929e] hover:text-[#ccff00] hover:translate-x-1 inline-block transition-all"
                >
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14161b] border border-white/8 hover:border-[#ccff00]/40 flex items-center justify-center text-[#8b929e] hover:text-[#ccff00] hover:scale-105 transition-all duration-200"
              >
                <FiGithub className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14161b] border border-white/8 hover:border-[#ccff00]/40 flex items-center justify-center text-[#8b929e] hover:text-[#ccff00] hover:scale-105 transition-all duration-200"
              >
                <FiTwitter className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14161b] border border-white/8 hover:border-[#ccff00]/40 flex items-center justify-center text-[#8b929e] hover:text-[#ccff00] hover:scale-105 transition-all duration-200"
              >
                <FiInstagram className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>
            </div>
            <p className="text-[#8b929e] text-[11px] font-light">
              Built for performance lifters.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-150 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[#8b929e] text-xs font-light text-center sm:text-left">
            &copy; 2026 FitLog. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8b929e] hover:text-[#ccff00] transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-[#14161b] border border-white/10 flex items-center justify-center group-hover:border-[#ccff00]/50 group-hover:bg-[#ccff00]/10 transition-all">
              <FiArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
