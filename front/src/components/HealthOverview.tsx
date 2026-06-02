"use client";

import {
  Droplets,
  Footprints,
  Dumbbell,
  Flame,
  Weight,
} from "lucide-react";

export default function HealthOverview() {
  const waterGoal = 2500;
  const waterConsumed = 1700;

  const waterPercentage =
    (waterConsumed / waterGoal) * 100;

   const stepsGoal = 10000;
   const stepsDone = 6842;

  const stepsPercentage =
  (stepsDone / stepsGoal) * 100;

  const exerciseGoal = 60;

const exerciseEntries = [
  {
    type: "Running",
    minutes: 30,
    calories: 300,
  },
  {
    type: "Musculación",
    minutes: 15,
    calories: 120,
  },
];

const totalMinutes = exerciseEntries.reduce(
  (acc, item) => acc + item.minutes,
  0
);

const totalCalories = exerciseEntries.reduce(
  (acc, item) => acc + item.calories,
  0
);

const exercisePercentage =
  (totalMinutes / exerciseGoal) * 100;

  return (
    <div className="grid gap-4 p-3 pb-20 lg:grid-cols-2">
      {/* CARD AGUA */}
      <div className="p-5 text-white shadow-xl rounded-3xl bg-zinc-900">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Hidratación
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Consumo registrado
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Droplets size={22} />
          </div>
        </div>

        {/* CIRCULO */}
        <div className="flex justify-center mt-8">
          <div className="relative flex items-center justify-center h-44 w-44">
            <svg
              className="absolute -rotate-90"
              width="180"
              height="180"
            >
              {/* fondo */}
              <circle
                cx="90"
                cy="90"
                r="70"
                stroke="#27272a"
                strokeWidth="12"
                fill="none"
              />

              {/* progreso */}
              <circle
                cx="90"
                cy="90"
                r="70"
                stroke="#67e8f9"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={440}
                strokeDashoffset={
                  440 -
                  (440 * waterPercentage) / 100
                }
              />
            </svg>

            <div className="z-10 text-center">
              <p className="text-4xl font-bold">
                {(
                  waterConsumed / 1000
                ).toFixed(1)}
                L
              </p>

              <p className="text-sm text-zinc-400">
                de {(waterGoal / 1000).toFixed(1)}L
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CARD Steps */}
      <div className="p-5 text-white shadow-xl rounded-3xl bg-zinc-900">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Pasos
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Pasos registrados
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F2B47E] text-gray-50">
            <Footprints size={22} />
          </div>
        </div>

        {/* CIRCULO */}
        <div className="flex justify-center mt-8">
          <div className="relative flex items-center justify-center h-44 w-44">
            <svg
              className="absolute -rotate-90"
              width="180"
              height="180"
            >
              {/* fondo */}
              <circle
                cx="90"
                cy="90"
                r="70"
                stroke="#27272a"
                strokeWidth="12"
                fill="none"
              />

              {/* progreso */}
              <circle
                cx="90"
                cy="90"
                r="70"
                stroke="#F2B47E"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={440}
                strokeDashoffset={
                  440 -
                  (440 * stepsPercentage) / 100
                }
              />
            </svg>

            <div className="z-10 text-center">
              <p className="text-4xl font-bold">
                 {stepsDone.toLocaleString()}
              </p>

              <p className="text-sm text-zinc-400">
                de {stepsGoal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CARD Excercises */}
      <div className="p-5 text-white shadow-xl rounded-3xl bg-zinc-900">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Ejercicio
            </h2>

      <p className="mt-1 text-sm text-zinc-400">
        Actividad del día
      </p>
    </div>

    <div className="p-3 rounded-2xl bg-[#D9667B] text-gray-50">
      <Dumbbell size={22} />
    </div>
  </div>

  {/* CIRCULO */}
  <div className="flex justify-center mt-8">
    <div className="relative flex items-center justify-center h-44 w-44">
      <svg
        className="absolute -rotate-90"
        width="180"
        height="180"
      >
        {/* fondo */}
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="#27272a"
          strokeWidth="12"
          fill="none"
        />

        {/* progreso */}
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="#D9667B"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={440}
          strokeDashoffset={
            440 -
            (440 * exercisePercentage) / 100
          }
        />
      </svg>

      <div className="z-10 text-center">
        <p className="text-4xl font-bold">
          {totalMinutes}
        </p>

        <p className="text-sm text-zinc-400">
          de {exerciseGoal} min
        </p>
      </div>
    </div>
  </div>

  {/* INFO */}
  <div className="mt-6 space-y-3">
    {exerciseEntries.map((exercise, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-4 rounded-2xl bg-zinc-800/70"
      >
        <div>
          <p className="font-medium">
            {exercise.type}
          </p>

          <p className="text-sm text-zinc-400">
            {exercise.minutes} min
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-[#D9667B]">
            {exercise.calories} kcal
          </p>

          <p className="text-xs text-zinc-500">
            quemadas
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* TOTAL */}
  <div className="p-4 mt-5 rounded-2xl bg-[#D9667B]">
    <div className="flex items-center justify-between">
      <span className="text-zinc-300">
        Calorías totales
      </span>

      <span className="text-lg font-bold text-gray-50">
        {totalCalories} kcal
      </span>
    </div>
  </div>
</div>

      {/* CARD PESO */}
      <div className="p-5 text-white shadow-xl rounded-3xl bg-zinc-900">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Último peso
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Registro más reciente
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#6289D9] text-gray-50">
            <Weight size={22} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <div className="px-8 py-6 rounded-full bg-[#6289D9]">
            <p className="text-6xl font-bold text-center">
              72.4
            </p>

            <p className="mt-1 text-center text-zinc-400">
              kg
            </p>
          </div>

          <div className="px-5 py-3 mt-6 text-center rounded-2xl bg-zinc-800/70">
            <p className="text-sm text-zinc-400">
              Última actualización
            </p>

            <p className="mt-1 font-medium">
              Hoy · 08:42 AM
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <div className="px-4 py-2 text-sm rounded-xl bg-[#6289D9] text-gray-50">
              ↓ -1.6kg este mes
            </div>

            <div className="px-4 py-2 text-sm text-gray-50 rounded-xl bg-[#6289D9]">
              Objetivo: 68kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}