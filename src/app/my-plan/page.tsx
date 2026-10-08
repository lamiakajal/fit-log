"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FiCheck,
  FiX,
  FiClock,
  FiZap,
  FiStar,
  FiChevronDown,
} from "react-icons/fi";
import workoutsData from "@/data/workouts.json";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/components/WorkoutLibrary";

type SortOption = "duration" | "calories" | "rating" | "name";

function MyPlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryTab = searchParams.get("tab");

  // Tab state derived directly from query parameter
  const activeTab: "plan" | "saved" = queryTab === "saved" ? "saved" : "plan";

  const { planIds, savedIds, togglePlan, toggleSaved } = useWorkout();
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  // Section Observer for initial entry animation
  const pageRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    const currentRef = pageRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Filter workouts by active tab
  const workoutsList = useMemo(() => {
    const allWorkouts = workoutsData as Workout[];
    const targetIds = activeTab === "plan" ? planIds : savedIds;
    const filtered = allWorkouts.filter((w) => targetIds.includes(w.id));

    return [...filtered].sort((a, b) => {
      if (sortBy === "duration") return b.duration - a.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [activeTab, planIds, savedIds, sortBy]);

  // Dynamic Calculated Metrics
  const allWorkouts = workoutsData as Workout[];
  const targetWorkouts = allWorkouts.filter((w) =>
    (activeTab === "plan" ? planIds : savedIds).includes(w.id),
  );

  const totalExercises = targetWorkouts.length;
  const totalMinutes = targetWorkouts.reduce(
    (acc, curr) => acc + curr.duration,
    0,
  );
  const totalCalories = targetWorkouts.reduce(
    (acc, curr) => acc + curr.caloriesBurned,
    0,
  );

  const toggleMarkAsDone = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleTabSwitch = (tab: "plan" | "saved") => {
    router.replace(`/my-plan?tab=${tab}`, { scroll: false });
  };

  return (
    <main
      ref={pageRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 select-none min-h-[80vh] flex flex-col overflow-hidden"
    >
      {/* 1. Header Title & Subtitle */}
      <header
        className={`space-y-1.5 mb-8 transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
          MY PLAN
        </h1>
        <p className="text-[#8b929e] text-xs sm:text-sm font-light">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      {/* 2. Top Summary Stat Metric Banner */}
      <section
        className={`w-full bg-[#14161b] border border-white/6 rounded-2xl p-6 sm:p-8 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/6 shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-700 ease-out delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex flex-col space-y-1">
          <span className="text-[#8b929e] text-xs font-semibold uppercase tracking-wider font-heading">
            Exercises
          </span>
          <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#ccff00]">
            {totalExercises}
          </span>
        </div>

        <div className="flex flex-col space-y-1 sm:pl-8 pt-4 sm:pt-0">
          <span className="text-[#8b929e] text-xs font-semibold uppercase tracking-wider font-heading">
            Minutes
          </span>
          <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {totalMinutes}
          </span>
        </div>

        <div className="flex flex-col space-y-1 sm:pl-8 pt-4 sm:pt-0">
          <span className="text-[#8b929e] text-xs font-semibold uppercase tracking-wider font-heading">
            Calories
          </span>
          <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {totalCalories}
          </span>
        </div>
      </section>

      {/* 3. Tab Filter Bar & Sort Dropdown */}
      <section
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 transition-all duration-700 ease-out delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Tab Switcher Pills */}
        <div className="inline-flex items-center bg-[#14161b] p-1 rounded-xl border border-white/8 self-start">
          <button
            type="button"
            onClick={() => handleTabSwitch("plan")}
            className={`px-4 sm:px-5 py-2 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === "plan"
                ? "bg-[#1f232b] text-white shadow-sm"
                : "text-[#8b929e] hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch("saved")}
            className={`px-4 sm:px-5 py-2 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#1f232b] text-white shadow-sm"
                : "text-[#8b929e] hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-[#8b929e] font-heading font-medium">
          <span>Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-[#14161b] text-white border border-white/8 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold focus:outline-none focus:border-[#ccff00]/40 transition-colors cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
            <FiChevronDown className="w-3.5 h-3.5 text-[#8b929e] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 4. Workout Content Area */}
      <section
        className={`flex-1 w-full transition-all duration-700 ease-out delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {workoutsList.length === 0 ? (
          /* Empty State */
          <div className="w-full border border-dashed border-white/10 rounded-2xl py-16 sm:py-24 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
              NOTHING HERE YET
            </h3>
            <p className="text-[#8b929e] text-xs sm:text-sm font-light max-w-sm">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-heading text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] mt-2 cursor-pointer transform-gpu hover:scale-105 active:scale-95"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards */
          <div className="space-y-4">
            {workoutsList.map((item, index) => {
              const isCompleted = completedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className={`w-full bg-[#14161b] border border-white/6 rounded-2xl p-3 sm:p-4 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-white/15 transform-gpu ${
                    isCompleted ? "opacity-60 bg-[#101216]" : ""
                  }`}
                >
                  {/* Left: Thumbnail & Info */}
                  <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                    <Link
                      href={`/workouts/${item.id}`}
                      className="relative w-24 sm:w-28 h-16 sm:h-18 rounded-xl overflow-hidden bg-[#181b22] shrink-0 border border-white/8 cursor-pointer"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="flex flex-col space-y-1 min-w-0">
                      <Link
                        href={`/workouts/${item.id}`}
                        className={`font-heading text-base sm:text-lg font-bold uppercase tracking-tight text-white hover:text-[#ccff00] transition-colors truncate cursor-pointer ${
                          isCompleted ? "line-through text-[#8b929e]" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                      <span className="text-[#8b929e] text-xs font-light">
                        {item.equipment}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-[#8b929e] pt-0.5">
                        <span className="flex items-center gap-1 text-[#ccff00]">
                          <FiClock className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[#8b929e]">
                            {item.duration} min
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-[#ccff00]">
                          <FiZap className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[#8b929e]">
                            {item.caloriesBurned} kcal
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-[#ccff00]">
                          <FiStar className="w-3.5 h-3.5 fill-[#ccff00] shrink-0" />
                          <span className="text-[#8b929e]">{item.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-white/6">
                    <Link
                      href={`/workouts/${item.id}`}
                      className="px-4 py-2 rounded-lg border border-white/10 hover:border-white/25 bg-[#181b22] text-xs font-heading font-semibold text-white tracking-wider uppercase transition-all cursor-pointer hover:bg-[#20242d] transform-gpu active:scale-95"
                    >
                      View Details
                    </Link>

                    {/* Mark as Done Button (Visible only in Today's Plan Tab) */}
                    {activeTab === "plan" && (
                      <button
                        type="button"
                        onClick={() => toggleMarkAsDone(item.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-heading font-bold tracking-wider uppercase transition-all cursor-pointer transform-gpu active:scale-95 ${
                          isCompleted
                            ? "bg-[#ccff00]/15 border border-[#ccff00]/40 text-[#ccff00]"
                            : "bg-[#ccff00] text-black hover:bg-white shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                        }`}
                      >
                        <FiCheck className="w-4 h-4 stroke-[2.5]" />
                        {isCompleted ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    {/* Remove Button */}
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => {
                        if (activeTab === "plan") {
                          togglePlan(item.id, item.name);
                        } else {
                          toggleSaved(item.id, item.name);
                        }
                      }}
                      className="p-2 rounded-lg text-[#8b929e] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer transform-gpu active:scale-90"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center text-[#8b929e]">
          Loading...
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}
