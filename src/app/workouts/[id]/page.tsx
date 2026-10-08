"use client";

import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCalendar, FiCheck, FiArrowLeft } from "react-icons/fi";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import workoutsData from "@/data/workouts.json";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/components/WorkoutLibrary";

/**
 * ==============================================================================
 * WORKOUT DETAIL VIEW COMPONENT
 * ==============================================================================
 * Responsive Grid Architecture:
 * - xs (<576px): Stacked single column, fluid image, responsive spec rows
 * - sm (576px - 767.98px): Spaced column stack with comfortable touch targets
 * - md (768px - 991.98px): 2-Column split layout
 * - lg & xl (992px+): Matches side-by-side design composition
 *
 * Integrated Animations & Features:
 * - IntersectionObserver: Dual-sided entrance (Image from left, specs from right)
 * - Continuous loops: Neon aura pulse on visual & badge breathing loop
 * - Context Integration: togglePlan & toggleSaved with workout name for toast
 * ==============================================================================
 */
export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const workoutId = parseInt(id, 10);
  const workout = (workoutsData as Workout[]).find((w) => w.id === workoutId);

  const { planIds, savedIds, togglePlan, toggleSaved } = useWorkout();

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Section scroll entry observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  if (!workout) {
    notFound();
  }

  const isInPlan = planIds.includes(workout.id);
  const isSaved = savedIds.includes(workout.id);

  return (
    <main
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Top Back Navigation Breadcrumb */}
      <div
        className={`mb-6 transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8b929e] hover:text-[#ccff00] transition-colors cursor-pointer group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
          Back to Library
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
        {/* ==================================================================== */}
        {/* 1. LEFT COLUMN: WORKOUT VISUAL FRAME WITH LOOP GLOW                  */}
        {/* ==================================================================== */}
        <div
          className={`relative w-full flex items-center justify-center transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10 sm:-translate-x-16"
          }`}
        >
          {/* Subtle Ambient Radial Pulse Glow */}
          <div className="absolute w-4/5 h-4/5 bg-[#ccff00]/10 rounded-full blur-[70px] sm:blur-[90px] pointer-events-none animate-aura-loop" />

          {/* Main Visual Frame */}
          <div className="relative w-full aspect-square bg-[#14161b] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/8 shadow-[0_16px_40px_rgba(0,0,0,0.8)] group">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. RIGHT COLUMN: DETAILS, SPECS TABLE & ACTION BUTTONS              */}
        {/* ==================================================================== */}
        <div
          className={`flex flex-col space-y-6 transition-all duration-700 ease-out delay-100 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10 sm:translate-x-16"
          }`}
        >
          {/* Title & Short Description */}
          <div className="space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              {workout.name}
            </h1>
            <p className="text-[#8b929e] text-sm sm:text-base font-light leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Muscle Group Badges with Breathing Loop */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider select-none shadow-sm animate-badge-loop"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Specs Table Container */}
          <div className="bg-[#14161b] border border-white/8 rounded-xl p-4 sm:p-5 divide-y divide-white/6 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2.5">
              <span className="font-heading uppercase tracking-wider text-[#8b929e] font-semibold">
                EQUIPMENT
              </span>
              <span className="text-white font-medium">
                {workout.equipment}
              </span>
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="font-heading uppercase tracking-wider text-[#8b929e] font-semibold">
                DIFFICULTY
              </span>
              <span className="text-white font-medium">
                {workout.difficulty}
              </span>
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="font-heading uppercase tracking-wider text-[#8b929e] font-semibold">
                SETS
              </span>
              <span className="text-white font-medium">{workout.sets}</span>
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="font-heading uppercase tracking-wider text-[#8b929e] font-semibold">
                REPS
              </span>
              <span className="text-white font-medium">{workout.reps}</span>
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="font-heading uppercase tracking-wider text-[#8b929e] font-semibold">
                DURATION
              </span>
              <span className="text-white font-medium">
                {workout.duration} min
              </span>
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="font-heading uppercase tracking-wider text-[#8b929e] font-semibold">
                CALORIES
              </span>
              <span className="text-white font-medium">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="font-heading uppercase tracking-wider text-[#8b929e] font-semibold">
                RATING
              </span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          {workout.instructions && workout.instructions.length > 0 && (
            <div className="space-y-3 pt-2">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-2 text-xs sm:text-sm text-[#8b929e] leading-relaxed list-none">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-white font-medium">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Action CTAs (Responsive Buttons + Specific Workout Name for Toast) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
            {/* Primary Action Button: Add/Remove Plan */}
            <button
              type="button"
              onClick={() => togglePlan(workout.id, workout.name)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 font-heading uppercase text-xs sm:text-sm font-bold tracking-wider px-6 py-3.5 rounded-lg transition-all duration-200 cursor-pointer transform-gpu hover:-translate-y-0.5 active:scale-95 ${
                isInPlan
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                  : "bg-[#ccff00] text-black hover:bg-white glow-lime"
              }`}
            >
              {isInPlan ? (
                <>
                  <FiCheck className="w-4 h-4 shrink-0" />
                  Remove from plan
                </>
              ) : (
                <>
                  <FiCalendar className="w-4 h-4 shrink-0" />
                  Add to today&apos;s plan
                </>
              )}
            </button>

            {/* Bookmark Action Button: Save/Unsave */}
            <button
              type="button"
              onClick={() => toggleSaved(workout.id, workout.name)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 font-heading uppercase text-xs sm:text-sm font-semibold tracking-wider px-6 py-3.5 rounded-lg border transition-all duration-200 cursor-pointer transform-gpu hover:-translate-y-0.5 active:scale-95 ${
                isSaved
                  ? "bg-[#ccff00]/10 border-[#ccff00] text-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.2)]"
                  : "bg-[#14161b] hover:bg-[#181b22] border-white/10 text-white hover:border-white/25"
              }`}
            >
              {isSaved ? (
                <>
                  <IoBookmark className="w-4 h-4 text-[#ccff00] shrink-0" />
                  Saved
                </>
              ) : (
                <>
                  <IoBookmarkOutline className="w-4 h-4 shrink-0" />
                  Save for later
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
