"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiTrash2,
  FiBookmark,
  FiAlertCircle,
} from "react-icons/fi";

export interface ToastInfo {
  message: string;
  type: "add" | "remove" | "save" | "unsave" | "limit";
}

interface WorkoutContextType {
  planIds: number[];
  savedIds: number[];
  toast: ToastInfo | null;
  togglePlan: (id: number, workoutName?: string) => void;
  toggleSaved: (id: number, workoutName?: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedPlan = localStorage.getItem("fitlog_plan");
        return savedPlan ? JSON.parse(savedPlan) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [savedIds, setSavedIds] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedBookmark = localStorage.getItem("fitlog_saved");
        return savedBookmark ? JSON.parse(savedBookmark) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fitlog_plan", JSON.stringify(planIds));
    }
  }, [planIds]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedIds));
    }
  }, [savedIds]);

  // Toast Lifecycle
  useEffect(() => {
    if (!toast) return;

    const enterTimer = requestAnimationFrame(() => {
      setIsToastVisible(true);
    });

    const exitTimer = setTimeout(() => {
      setIsToastVisible(false);
    }, 2800);

    const removeTimer = setTimeout(() => {
      setToast(null);
    }, 3200);

    return () => {
      cancelAnimationFrame(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [toast]);

  // Toggle Plan with Max 5 Constraint (Assignment Req 2 & 6)
  const togglePlan = (id: number, workoutName?: string) => {
    const label = workoutName ? `"${workoutName}"` : "Workout";
    setPlanIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        setToast({
          message: `${label} removed from today's plan`,
          type: "remove",
        });
        return prev.filter((i) => i !== id);
      } else {
        // Enforce Cap of 5 lifts
        if (prev.length >= 5) {
          setToast({
            message: "Cap reached: You can only add up to 5 lifts for today!",
            type: "limit",
          });
          return prev;
        }

        setToast({
          message: `${label} added to today's plan`,
          type: "add",
        });
        return [...prev, id];
      }
    });
  };

  const toggleSaved = (id: number, workoutName?: string) => {
    const label = workoutName ? `"${workoutName}"` : "Workout";
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        setToast({
          message: `${label} removed from bookmarks`,
          type: "unsave",
        });
        return prev.filter((i) => i !== id);
      } else {
        setToast({
          message: `${label} saved to bookmarks`,
          type: "save",
        });
        return [...prev, id];
      }
    });
  };

  const isPositive = toast?.type === "add" || toast?.type === "save";
  const isLimit = toast?.type === "limit";

  return (
    <WorkoutContext.Provider
      value={{ planIds, savedIds, toast, togglePlan, toggleSaved }}
    >
      {children}

      {/* ================= INLINE FLOATING ANIMATION STYLE ================= */}
      <style>{`
        @keyframes floatUpDown {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .toast-float-box {
          animation: floatUpDown 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* ================= TOAST POPUP (FULLY RESPONSIVE) ================= */}
      {toast && (
        <aside
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 pointer-events-none transition-all duration-300 ease-out flex justify-center sm:justify-end ${
            isToastVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-90"
          }`}
        >
          <div className="toast-float-box w-full max-w-sm">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all ${
                isLimit
                  ? "bg-[#14161b]/95 border-amber-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(251,191,36,0.2)]"
                  : isPositive
                    ? "bg-[#14161b]/95 border-[#ccff00]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(204,255,0,0.2)]"
                    : "bg-[#14161b]/95 border-red-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(239,68,68,0.2)]"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-xl ${
                  isLimit
                    ? "bg-amber-400/15 text-amber-400"
                    : isPositive
                      ? "bg-[#ccff00]/15 text-[#ccff00]"
                      : "bg-red-500/15 text-red-400"
                }`}
              >
                {toast.type === "add" && (
                  <FiCheckCircle className="w-4 h-4 stroke-[2.5]" />
                )}
                {toast.type === "remove" && <FiTrash2 className="w-4 h-4" />}
                {toast.type === "save" && (
                  <FiBookmark className="w-4 h-4 fill-[#ccff00]" />
                )}
                {toast.type === "unsave" && <FiBookmark className="w-4 h-4" />}
                {toast.type === "limit" && (
                  <FiAlertCircle className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>

              {/* Message Text */}
              <p className="font-heading text-xs sm:text-sm font-semibold tracking-wide text-white leading-tight pr-1">
                {toast.message}
              </p>
            </div>
          </div>
        </aside>
      )}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
