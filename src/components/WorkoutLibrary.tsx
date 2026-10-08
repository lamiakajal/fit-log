"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiActivity, FiStar } from "react-icons/fi";
import workoutsData from "@/data/workouts.json";

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

export default function WorkoutLibrary() {
  const workouts = workoutsData as Workout[];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Trigger entrance transition on scroll
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
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 select-none"
    >
      <style>{`
        @keyframes activeCardMotion {
          0%, 100% {
            transform: translateY(0px);
            border-color: rgba(255, 255, 255, 0.08);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
          }
          50% {
            transform: translateY(-8px);
            border-color: rgba(204, 255, 0, 0.35);
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(204, 255, 0, 0.15);
          }
        }
        @keyframes ambientAuraPulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
        .card-loop-motion {
          animation: activeCardMotion 3.8s ease-in-out infinite;
        }
        .card-aura-pulse {
          animation: ambientAuraPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
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

      {/* Responsive cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {workouts.map((workout, index) => {
          const delayClass =
            index % 3 === 0
              ? "delay-75"
              : index % 3 === 1
                ? "delay-150"
                : "delay-200";

          // Staggered loop animation timing for dynamic floating cadence
          const loopDelay = `${(index % 3) * 0.75}s`;

          return (
            <div
              key={workout.id}
              style={{ animationDelay: loopDelay }}
              className={`card-loop-motion rounded-2xl transition-all duration-500 ${
                isVisible
                  ? `opacity-100 translate-y-0 ${delayClass}`
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link
                href={`/workouts/${workout.id}`}
                className="group relative block bg-[#181b22] border border-white/6 hover:border-[#ccff00]/60 rounded-2xl overflow-hidden transition-all duration-300 transform-gpu cursor-pointer"
              >
                {/* Neon aura corner glow loop */}
                <div
                  style={{ animationDelay: loopDelay }}
                  className="absolute -top-10 -right-10 w-32 h-32 bg-[#ccff00]/15 rounded-full blur-2xl pointer-events-none card-aura-pulse group-hover:bg-[#ccff00]/30 transition-all duration-300"
                />

                {/* Media preview */}
                <div className="relative w-full aspect-16/10 bg-[#12141a] overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />

                  {/* Muscle badges */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {workout.muscleGroups.map((group) => (
                      <span
                        key={group}
                        className="bg-[#ccff00] text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm select-none"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors duration-200">
                      {workout.name}
                    </h3>
                    <p className="text-[#8b929e] text-xs mt-0.5 font-light">
                      {workout.equipment}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="mt-4 pt-3 border-t border-white/6 flex items-center justify-between text-xs text-[#8b929e]">
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <span className="flex items-center gap-1.5">
                        <FiClock className="w-3.5 h-3.5 text-[#8b929e]" />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiActivity className="w-3.5 h-3.5 text-[#8b929e]" />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1.5 text-white font-medium">
                        <FiStar className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom line indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
