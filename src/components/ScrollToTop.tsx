"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setVisible(scrollY > 80);
    };

    // Attach passive listeners to both window and document
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        @keyframes scrollPulse {
          0%, 100% {
            box-shadow: 0 0 16px rgba(204, 255, 0, 0.25), 0 0 32px rgba(204, 255, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 24px rgba(204, 255, 0, 0.45), 0 0 44px rgba(204, 255, 0, 0.2);
          }
        }
        .scroll-pulse-loop {
          animation: scrollPulse 3s ease-in-out infinite;
        }
      `}</style>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{ zIndex: 99999 }}
        className={`fixed right-4 bottom-5 sm:right-7 sm:bottom-7 md:right-8 md:bottom-8 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#14161b] border border-[#ccff00]/60 text-[#ccff00] flex items-center justify-center transition-all duration-300 transform-gpu cursor-pointer group hover:bg-[#ccff00] hover:text-black hover:-translate-y-1 active:scale-95 ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto scroll-pulse-loop scale-100"
            : "opacity-0 translate-y-6 pointer-events-none scale-90"
        }`}
      >
        <FiArrowUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.4] transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </>
  );
}
