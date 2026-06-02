"use client";

import {
  Flame,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react";

export default function NutritionCards() {
  const userGoals = {
    calories: 1800,
    protein: 140,
    carbs: 180,
    fat: 60,
  };

  const totals = {
    calories: 1240,
    protein: 90,
    carbs: 110,
    fat: 40,
  };

  const macros = [
    {
      label: "Proteínas",
      value: totals.protein,
      goal: userGoals.protein,
      icon: <Beef size={18} />,
    },
    {
      label: "Carbohidratos",
      value: totals.carbs,
      goal: userGoals.carbs,
      icon: <Wheat size={18} />,
    },
    {
      label: "Grasas",
      value: totals.fat,
      goal: userGoals.fat,
      icon: <Droplets size={18} />,
    },
  ];

  const caloriesLeft =
    userGoals.calories - totals.calories;

  return (
    <div className="flex gap-4 p-3 pb-2 overflow-x-auto snap-x snap-mandatory">
      {/* CARD CALORIAS */}
      <div className="min-w-full p-5 text-white shadow-lg snap-center rounded-3xl bg-zinc-900">
        <h2 className="text-xl font-semibold">
          Calorías
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Restantes = Objetivo - Consumidas
        </p>

        <div className="flex items-center justify-center mt-6">
          <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-[12px] border-zinc-700">
            <div className="text-center">
              <p className="text-5xl font-bold">
                {caloriesLeft}
              </p>

              <p className="text-zinc-400">
                restantes
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around mt-6 text-sm">
          <div className="flex items-center gap-2">
            <Flame className="text-[#F2B47E]" />
            <div>
              <p className="text-zinc-400">
                Consumidas
              </p>

              <p className="font-semibold">
                {totals.calories}
              </p>
            </div>
          </div>

          <div>
            <p className="text-zinc-400">
              Objetivo
            </p>

            <p className="font-semibold">
              {userGoals.calories}
            </p>
          </div>
        </div>
      </div>

      {/* CARD MACROS */}
      <div className="min-w-full p-5 text-white shadow-lg snap-center rounded-3xl bg-zinc-900">
        <h2 className="text-xl font-semibold">
          Macros
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Seguimiento diario de macronutrientes
        </p>

        <div className="mt-6 space-y-5">
          {macros.map((macro) => {
            const percentage = Math.min(
              (macro.value / macro.goal) * 100,
              100
            );

            return (
              <div key={macro.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {macro.icon}

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