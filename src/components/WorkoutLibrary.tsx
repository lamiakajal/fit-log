"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiActivity, FiStar } from "react-icons/fi";
import workoutsData from "@/data/workouts.json";

/**
 * ==============================================================================
 * WORKOUT DATA CONTRACT
 * ==============================================================================
 */
export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

/**
 * ==============================================================================
 * FITLOG WORKOUT LIBRARY COMPONENT
 * ==============================================================================
 * Responsive Grid Architecture:
 * - xs (<576px): 1 Column full width cards with compact padding
 * - sm (576px - 767.98px): 2 Column grid with fluid gap
 * - md (768px - 991.98px): 2 Column grid with balanced breathing room
 * - lg (992px - 1199.98px): 3 Column dense grid
 * - xl & 2xl (>=1200px): 3 Column widescreen layout with max-w-7xl
 *
 * Animations Integrated:
 * - Scroll Entry: Staggered fade-up when scrolled into viewport
 * - Hover State: Card lift (-translate-y-1.5), image scale & electric border glow
 * - Loop Animation: Subtle breathing pulse loop on tag badges
 * ==============================================================================
 */
export default function WorkoutLibrary() {
  const workouts = workoutsData as Workout[];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Scroll entry animation trigger using native IntersectionObserver
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

  return (
    <section
      id="library"
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 select-none"
    >
      {/* ==================================================================== */}
      {/* 1. SECTION HEADER (Header Entry Fade-in)                             */}
      {/* ==================================================================== */}
      <div
        className={`mb-6 sm:mb-8 space-y-1.5 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
          THE LIBRARY
        </h2>
        <p className="text-[#8b929e] text-xs sm:text-sm font-light">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* ==================================================================== */}
      {/* 2. RESPONSIVE CARDS GRID (1 Col on xs, 2 Col on sm/md, 3 Col on lg+)  */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
        {workouts.map((workout, index) => {
          // Staggered delay mapping for entrance
          const delayClass =
            index % 3 === 0
              ? "delay-75"
              : index % 3 === 1
                ? "delay-150"
                : "delay-200";

          return (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className={`group block bg-[#181b22] border border-white/6 hover:border-[#ccff00]/40 rounded-2xl overflow-hidden transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(204,255,0,0.12)] cursor-pointer ${
                isVisible
                  ? `opacity-100 translate-y-0 ${delayClass}`
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Card Banner Image Frame with Hover Zoom & Floating Badges */}
              <div className="relative w-full aspect-16/10 bg-[#12141a] overflow-hidden">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />

                {/* Subtle vignette shadow overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Muscle Groups Badges with Ambient Loop Animation */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {workout.muscleGroups.map((group) => (
                    <span
                      key={group}
                      className="bg-[#ccff00] text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md animate-badge-loop"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Content Footer */}
              <div className="p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors duration-200">
                    {workout.name}
                  </h3>
                  <p className="text-[#8b929e] text-xs mt-0.5 font-light">
                    {workout.equipment}
                  </p>
                </div>

                {/* Meta Row: Duration, Calories & Rating */}
                <div className="mt-4 pt-3 border-t border-white/6 flex items-center justify-between text-xs text-[#8b929e]">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Duration */}
                    <span className="flex items-center gap-1.5">
                      <FiClock className="w-3.5 h-3.5 text-[#8b929e]" />
                      {workout.duration} min
                    </span>

                    {/* Calories */}
                    <span className="flex items-center gap-1.5">
                      <FiActivity className="w-3.5 h-3.5 text-[#8b929e]" />
                      {workout.caloriesBurned} kcal
                    </span>

                    {/* Rating */}
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <FiStar className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {workout.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
