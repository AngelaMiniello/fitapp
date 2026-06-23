"use client";

import { useState } from "react";
import api from "../service/api";
import { Flame, Beef, Droplets, Footprints, Dumbbell, Moon, ChevronRight, X } from "lucide-react";
import { useGoals } from "../context/GoalsContext";

export default function ConfigPage() {
  const { goals, setGoals } = useGoals();
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");

  const settingsCards = [
    {
      title: "Calorías",
      value: `${goals?.dailyCalories || 0} kcal`,
      rawValue: goals?.dailyCalories,
      description: "Objetivo diario",
      icon: Flame,
      field: "dailyCalories",
    },
    {
      title: "Proteína",
      value: `${goals?.proteinGoal || 0} g`,
      rawValue: goals?.proteinGoal,
      description: "Objetivo diario",
      icon: Beef,
      field: "proteinGoal",
    },
    {
      title: "Agua",
      value: `${goals?.waterGoal || 0} ml`,
      rawValue: goals?.waterGoal,
      description: "Objetivo diario",
      icon: Droplets,
      field: "waterGoal",
    },
    {
      title: "Pasos",
      value: `${goals?.stepsGoal || 0}`,
      rawValue: goals?.stepsGoal,
      description: "Meta diaria",
      icon: Footprints,
      field: "stepsGoal",
    },
    {
      title: "Ejercicio",
      value: `${goals?.workoutsPerWeekGoal || 0} días`,
      rawValue: goals?.workoutsPerWeekGoal,
      description: "Por semana",
      icon: Dumbbell,
      field: "workoutsPerWeekGoal",
    },
    {
      title: "Sueño",
      value: `${goals?.sleepGoal || 0} hs`,
      rawValue: goals?.sleepGoal,
      description: "Objetivo diario",
      icon: Moon,
      field: "sleepGoal",
    },
  ];

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put( "/goals",
        {
          [selectedCard.field]: Number(inputValue),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGoals((prev: any) => ({
        ...prev,
        [selectedCard.field]: Number(inputValue),
      }));

      setSelectedCard(null);

    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <main className="min-h-screen px-4 py-6 pb-28 bg-zinc-950">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white"> Config </h1>
        <p className="mt-1 text-sm text-zinc-400"> Manage your objectives and preferences </p>
      </div>

      {/* Cards */}
      <div className="p-5 border rounded-3xl bg-zinc-900 border-zinc-800 hover:border-[#7999D9] hover:bg-zinc-800">
        <h2 className="mb-2 text-xl font-semibold text-white"> Goals </h2>
        <p className="mb-4 text-sm text-zinc-400"> Personalize your daily goals </p>

          {settingsCards.map((card) => {

              const Icon = card.icon;

              return (
                <button
                  key={card.title}
                  className="flex items-center w-full py-3 border-b border-zinc-800 last:border-b-0"
                  onClick={() => {
                    setSelectedCard(card);
                    setInputValue(String(card.rawValue || ""));
                  }}
                >

                  <div className="flex items-center gap-3 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-800">

                      <Icon
                        size={24}
                        className="text-[#7999D9]"
                      />
                    </div>
                  </div>

                  <ChevronRight size={14} className="text-[#7999D9] mr-4"/> 
                  
                  <div className="flex flex-col text-left">
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      {card.title}
                    </h3>

                    <div className="flex items-baseline gap-2">
                      <p className="text-sm text-zinc-400">
                        {card.description} : 
                      </p>

                      <p className="font-bold text-white text-md">
                        {card.value}
                      </p>
                    </div>
                  </div>

                </button>
              );
          })}
      </div>

      {/* Modal */}
      {selectedCard && (

        <div className="fixed inset-0 z-50 flex items-end pb-20 bg-black/50">
          <div className="w-full p-6 border-t bg-zinc-900 rounded-t-3xl border-zinc-800">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-white"> Editar {selectedCard.title} </h2>

              <button onClick={() => setSelectedCard(null)}>
                <X className="text-zinc-400" />
              </button>

            </div>

            <input
              type="number"
              value={inputValue}
              onChange={(e) =>
                setInputValue(e.target.value)
              }
              className="w-full p-4 text-lg text-white border outline-none rounded-2xl bg-zinc-800 border-zinc-700 focus:border-[#7999D9]"/>

            <button
              onClick={handleSave}
              className="w-full p-4 mt-5 text-lg font-semibold text-white transition rounded-2xl bg-[#7999D9] hover:opacity-90">
              Guardar cambios
            </button>

          </div>
        </div>
      )}
    </main>
  );
}