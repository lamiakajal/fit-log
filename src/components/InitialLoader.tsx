"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Progressive simulation interval
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const delta = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + delta, 100);
      });
    }, 65);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  // Exit transition after completion
  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => setIsDone(true), 400);
      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "unset";
      }, 900);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [progress]);

  if (!shouldRender) return null;

  // SVG perimeter calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div
      aria-hidden="true"
      style={{ zIndex: 99999 }}
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[#0f1115] transition-all duration-500 ease-out select-none px-4 ${
        isDone ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes loaderGlow {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.65;
            transform: scale(1.15);
          }
        }
        @keyframes orbitRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .loader-backdrop-glow {
          animation: loaderGlow 3s ease-in-out infinite;
        }
        .orbit-spin {
          animation: orbitRotate 4s linear infinite;
        }
      `}</style>

      {/* Backdrop glow */}
      <div className="absolute w-72 sm:w-96 md:w-115 h-72 sm:h-96 md:h-115 bg-[#ccff00]/12 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none loader-backdrop-glow" />

      {/* Progress ring with center percentage */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-36 h-36 sm:w-44 md:w-48 sm:h-44 md:h-48 flex items-center justify-center">
          {/* Rotating orbit ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#ccff00]/25 orbit-spin pointer-events-none" />

          {/* Progress circle */}
          <svg
            className="w-full h-full transform -rotate-90 pointer-events-none"
            viewBox="0 0 140 140"
          >
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#1a1e26"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#ccff00"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
              style={{
                filter: "drop-shadow(0 0 8px rgba(204, 255, 0, 0.6))",
              }}
            />
          </svg>

          {/* Center percentage frame */}
          <div className="absolute w-18 h-18 sm:w-22 md:w-24 sm:h-22 md:h-24 rounded-2xl bg-[#14161b] border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(204,255,0,0.2)]">
            <div className="flex items-baseline justify-center">
              <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ccff00] tracking-tight [text-shadow:0_0_16px_rgba(204,255,0,0.45)]">
                {progress}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#ccff00]/80 font-mono ml-0.5">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
