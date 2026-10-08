import Link from "next/link";
import { FaDumbbell } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="w-full min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-10 select-none text-center relative overflow-hidden">
      {/* Background Neon Aura */}
      <div className="absolute w-56 sm:w-80 md:w-96 h-56 sm:h-80 md:h-96 bg-[#ccff00]/5 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none" />

      {/* Center Icon Frame */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-[#14161b] border border-white/10 flex items-center justify-center text-[#ccff00] mb-5 sm:mb-6 shadow-[0_0_30px_rgba(204,255,0,0.15)]">
        <FaDumbbell className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transform -rotate-45" />
      </div>

      {/* 404 Large Numeric Headline */}
      <span className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#ccff00] [text-shadow:0_0_24px_rgba(204,255,0,0.35)] leading-none mb-3">
        404
      </span>

      {/* Subtitle */}
      <h1 className="font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white mb-2">
        PAGE NOT FOUND
      </h1>

      <p className="text-[#8b929e] text-xs sm:text-sm font-light max-w-xs sm:max-w-md mb-6 sm:mb-8 leading-relaxed">
        The lift or workout routine you are looking for has been moved,
        completed, or does not exist in our library.
      </p>

      {/* Action Button: Back to Home */}
      <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#ccff00] text-black font-heading text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.25)] cursor-pointer transform-gpu hover:scale-105 active:scale-95"
      >
        <FiArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Back to Home</span>
      </Link>
    </main>
  );
}
