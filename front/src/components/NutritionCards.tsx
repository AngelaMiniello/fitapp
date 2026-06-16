"use client";

import { Flame, Beef, Wheat, Droplets, Icon, Cuboid } from "lucide-react";
import { useGoals } from "../context/GoalsContext";
import { useDailyProgress } from "../context/DailyProgress";

export default function NutritionCards() {

  const { goals } = useGoals();
  const { dailyProgress } = useDailyProgress();
  
  if (!goals || !dailyProgress) {
    return null;
  }

  const macros = [
    {
      label: "Proteínas",
      value: dailyProgress?.protein ?? 0,
      goal: goals?.proteinGoal ?? 0,
      icon: Beef,
    },
    {
      label: "Carbohidratos",
      value: dailyProgress.carbs ?? 0,
      goal: goals?.carbsGoal ?? 0,
      icon: Wheat
    },
    {
      label: "Grasas",
      value: dailyProgress.fat ?? 0,
      goal: goals?.fatGoal ?? 0,
      icon: Cuboid
    },
  ];

  const caloriesLeft =
    (goals?.dailyCalories ?? 0) -
    (dailyProgress?.caloriesConsumed ?? 0);
  
  return (
    <div className="flex gap-4 p-3 pb-2 overflow-x-auto snap-x snap-mandatory">
      {/*  CALORIES CARD*/}
      <div className="min-w-full p-5 text-white shadow-lg snap-center rounded-3xl bg-zinc-900">
        <h2 className="text-xl font-semibold"> Calories </h2>

        <p className="mt-1 text-sm text-zinc-400">  Calories left = Goal - Consumed </p>

        <div className="flex items-center justify-center mt-6">
          <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-[12px] border-zinc-700">
            <div className="text-center">
              <p className="text-5xl font-bold"> {caloriesLeft} </p>
              <p className="text-zinc-400"> left </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around mt-6 text-sm">
          <div className="flex items-center gap-2">
            <Flame className="text-[#F2B47E]" />
            <div>
              <p className="text-zinc-400">  Consumed</p>
              <p className="font-semibold">  {dailyProgress.caloriesConsumed} </p>
            </div>
          </div>

          <div>
            <p className="text-zinc-400"> Goal </p>
            <p className="font-semibold"> {goals?.dailyCalories} </p>
          </div>
        </div>
      </div>

      {/* MACROS CARD*/}
      <div className="min-w-full p-5 text-white shadow-lg snap-center rounded-3xl bg-zinc-900">
        <h2 className="text-xl font-semibold"> Macros </h2>

        <p className="mt-1 text-sm text-zinc-400">  Seguimiento diario de macronutrientes </p>

        <div className="mt-6 space-y-5">
          {macros.map((macro) => {
            const Icon = macro.icon;

            const percentage = macro.goal
              ? Math.min((macro.value / macro.goal) * 100, 100)
              : 0;

            return (
              <div key={macro.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon size={18} />

                    <span className="font-medium">
                      {macro.label}
                    </span>
                  </div>

                  <span className="text-sm text-zinc-300">
                    {macro.value}g / {macro.goal}g
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-zinc-700">
                  <div
                    className="h-full transition-all rounded-full bg-[#D9667B]"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}