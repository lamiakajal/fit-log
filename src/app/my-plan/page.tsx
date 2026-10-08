"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import workoutsData from "@/data/workouts.json";
import { FiCheck } from "react-icons/fi";

interface Workout {
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

export default function MyPlanPage() {
  const [workouts] = useState<Workout[]>(workoutsData as Workout[]);
  const [planIds, setPlanIds] = useState<number[]>([1]);
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const activePlanWorkouts = workouts.filter((item) =>
    planIds.includes(item.id),
  );

  const totalExercises = activePlanWorkouts.length;
  const totalMinutes = activePlanWorkouts.reduce(
    (acc, curr) => acc + curr.duration,
    0,
  );
  const totalCalories = activePlanWorkouts.reduce(
    (acc, curr) => acc + curr.caloriesBurned,
    0,
  );

  const toggleComplete = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const removeFromPlan = (id: number) => {
    setPlanIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col justify-between selection:bg-[#ccff00] selection:text-black">
      <Navbar />

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            My Plan
          </h1>
          <p className="text-[#8b929e] text-xs sm:text-sm mt-1 font-light">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-[#181b22] border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <span className="text-[#8b929e] text-xs uppercase tracking-wider">
              Exercises
            </span>
            <span className="font-heading text-2xl sm:text-4xl font-bold text-white mt-3">
              {totalExercises}
            </span>
          </div>

          <div className="bg-[#181b22] border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <span className="text-[#8b929e] text-xs uppercase tracking-wider">
              Minutes
            </span>
            <span className="font-heading text-2xl sm:text-4xl font-bold text-white mt-3">
              {totalMinutes}
            </span>
          </div>

          <div className="bg-[#181b22] border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <span className="text-[#8b929e] text-xs uppercase tracking-wider">
              Calories
            </span>
            <span className="font-heading text-2xl sm:text-4xl font-bold text-white mt-3">
              {totalCalories}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`text-xs sm:text-sm px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "today"
                  ? "bg-[#1f242d] text-white border border-white/10"
                  : "text-[#8b929e] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`text-xs sm:text-sm px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#1f242d] text-white border border-white/10"
                  : "text-[#8b929e] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8b929e]">Sort By:</span>
            <div className="bg-[#181b22] border border-white/10 px-3 py-1.5 rounded-lg text-white font-medium cursor-pointer">
              Duration
            </div>
          </div>
        </div>

        {activePlanWorkouts.length > 0 ? (
          <div className="space-y-4">
            {activePlanWorkouts.map((workout) => {
              const isDone = completedIds.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`bg-[#181b22] border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 ${
                    isDone ? "border-[#ccff00]/40 opacity-75" : "border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold uppercase text-white">
                        {workout.name}
                      </h3>
                      <p className="text-[#8b929e] text-xs mt-0.5">
                        {workout.equipment}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#8b929e] mt-2">
                        <span>⏱ {workout.duration} min</span>
                        <span>🔥 {workout.caloriesBurned} kcal</span>
                        <span className="text-yellow-400">
                          ★ {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => removeFromPlan(workout.id)}
                      className="text-xs bg-[#242933] hover:bg-[#2e3442] text-gray-300 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleComplete(workout.id)}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                        isDone
                          ? "bg-[#ccff00] text-black"
                          : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                      }`}
                    >
                      {isDone && <FiCheck className="w-3.5 h-3.5 stroke-3" />}
                      {isDone ? "Completed" : "Mark as Done"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#181b22] border border-white/5 rounded-2xl py-16 px-6 text-center space-y-4">
            <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
              NOTHING HERE YET
            </h3>
            <p className="text-[#8b929e] text-xs sm:text-sm max-w-sm mx-auto font-light">
              Browse the library and add a lift to get today moving.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full border-t border-white/5 py-6 px-4 text-center mt-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#5d636f] gap-3">
          <span className="font-heading uppercase tracking-wider text-[#8b929e]">
            FITLOG
          </span>
          <p>
            &copy; {new Date().getFullYear()} FitLog — Workout Library. Train
            hard, log honest.
          </p>
        </div>
      </footer>
    </div>
  );
}
