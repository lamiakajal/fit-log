"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Trigger entrance transition on mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    const currentRef = bannerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={bannerRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 pb-6 sm:pb-8 overflow-hidden"
    >
      <div className="relative w-full bg-[#14161b] border border-white/6 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-8 lg:gap-14 shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
        {/* Copy and CTA */}
        <div
          className={`w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 space-y-4 sm:space-y-5 lg:space-y-6 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10 sm:-translate-x-14"
          }`}
        >
          <span className="font-heading text-[#ccff00] text-xs sm:text-sm font-medium uppercase tracking-widest select-none">
            WORKOUT LIBRARY
          </span>

          <h1 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wide text-white leading-tight">
            <span className="block whitespace-nowrap">
              TRAIN WITH INTENT. LOG
            </span>
            <span className="block mt-0.5 sm:mt-1 text-white">EVERY SET.</span>
          </h1>

          <p className="text-[#8b929e] text-xs sm:text-sm lg:text-base leading-relaxed max-w-sm sm:max-w-md font-light">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2 sm:pt-3">
            <Link
              href="#library"
              className="inline-flex items-center justify-center font-heading uppercase text-xs sm:text-sm font-semibold tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-[#ccff00] text-black hover:bg-white hover:text-black transition-all duration-300 transform-gpu hover:-translate-y-0.5 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer select-none"
            >
              BROWSE WORKOUTS
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div
          className={`w-full md:w-1/2 flex items-center justify-center relative min-h-60 sm:min-h-80 md:min-h-100 lg:min-h-115 transition-all duration-700 ease-out delay-100 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10 sm:translate-x-14"
          }`}
        >
          <div className="absolute w-52 sm:w-68 md:w-80 lg:w-96 h-52 sm:h-68 md:h-80 lg:h-96 bg-[#ccff00]/12 rounded-full blur-[70px] sm:blur-[90px] pointer-events-none animate-aura-loop" />

          <div className="relative w-full max-w-65 sm:max-w-85 md:max-w-95 lg:max-w-115 aspect-4/3 sm:aspect-square flex items-center justify-center animate-floating-loop">
            <Image
              src="/assets/banner.webp"
              alt="FitLog Training Rig Mascot"
              fill
              priority
              className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
