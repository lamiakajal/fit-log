"use client";

import { useEffect, useRef, useState } from "react";
import { FiTrendingUp, FiTarget, FiZap, FiShield } from "react-icons/fi";

const stats = [
  {
    id: 1,
    icon: FiTrendingUp,
    value: "500+",
    label: "Guided Reps",
    desc: "Targeted exercise mechanics",
    auraDelay: "0s",
  },
  {
    id: 2,
    icon: FiTarget,
    value: "6",
    label: "Muscle Groups",
    desc: "Targeted compound splits",
    auraDelay: "0.5s",
  },
  {
    id: 3,
    icon: FiZap,
    value: "5 Max",
    label: "Daily Cap",
    desc: "Focus on optimal overload",
    auraDelay: "1s",
  },
  {
    id: 4,
    icon: FiShield,
    value: "100%",
    label: "Logged Offline",
    desc: "Local persistence storage",
    auraDelay: "1.5s",
  },
];

export default function FeatureStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 select-none overflow-hidden"
    >
      <style>{`
        @keyframes auraPulseLoop {
          0%, 100% {
            opacity: 0.18;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(1.15);
          }
        }
        @keyframes cardBreathingFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .stats-aura-loop {
          animation: auraPulseLoop 4s ease-in-out infinite;
        }
        .stats-float-loop {
          animation: cardBreathingFloat 5s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-[#ccff00]/5 rounded-full blur-[90px] pointer-events-none stats-aura-loop" />

      {/* Stats grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 transition-all duration-700 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12 sm:translate-y-16"
        }`}
      >
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              style={{
                transitionDelay: `${idx * 120}ms`,
                animationDelay: `${idx * 0.4}s`,
              }}
              className="stats-float-loop relative group rounded-2xl bg-[#14161b] border border-white/6 hover:border-[#ccff00]/50 p-5 sm:p-6 transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(204,255,0,0.14)] overflow-hidden cursor-default"
            >
              <div
                style={{ animationDelay: stat.auraDelay }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-[#ccff00]/15 rounded-full blur-2xl pointer-events-none stats-aura-loop group-hover:bg-[#ccff00]/25 transition-all duration-300"
              />

              <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1b1f27] border border-white/8 flex items-center justify-center text-[#ccff00] group-hover:scale-110 group-hover:border-[#ccff00]/40 group-hover:bg-[#ccff00]/10 transition-all duration-300 shrink-0">
                  <IconComponent className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2.2]" />
                </div>
                <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none group-hover:text-[#ccff00] transition-colors duration-300">
                  {stat.value}
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <h3 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#ccff00] transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-[#8b929e] text-xs font-light leading-snug line-clamp-2">
                  {stat.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
