"use client";

import { useState, useEffect } from "react";
import api from "../service/api";
import { Flame, Droplets, Dumbbell, Plus } from "lucide-react";
import MealModal from "../components/modals/AddMealModal";
import WaterModal from "../components/modals/AddWaterModal";
import ExerciseModal from "../components/modals/AddExcersiceModal";
import MealSection from "../components/cards/MealSection";

export default function DiaryRegister() {

  const [meals, setMeals] = useState<any[]>([]);
  const [goals, setGoals] = useState<any>(null);//traigo goals xq aca esta dailyCalories
  const [activeModal, setActiveModal] = useState< "meal" | "water" | "exercise" | null>(null);//ventana para agregar comidas
  const [waterEntries, setWaterEntries] = useState<any[]>([]);
  const [selectedMealType, setSelectedMealType] = useState("");// meal type
  const [selectedMeal, setSelectedMeal] = useState<any>(null);//to get to meal detail

  const handleDeleteMeal = async (id:number) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/meals/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchMeals();

    } catch(error) {
      console.log(error);
    }
  };

  const fetchWater = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/water/today",
          {
            headers: { Authorization: `Bearer ${token}`,},
          }
        );
        setWaterEntries(
          Array.isArray(res.data)
          ? res.data
          : []
        );

    } catch (error) {
    console.error(error);
    }
    };

  const fetchMeals = async () => {
  try {

    console.log("Entró a fetchMeals");

    const token = localStorage.getItem("token");

    const res = await api.get(
      "/meals/today",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Respuesta completa:");
    console.log(res.data);

    console.log("Meals:");
    console.log(res.data.meals);

    setMeals(
      Array.isArray(res.data.meals)
        ? res.data.meals
        : []
    );

  } catch (error) {
    console.error("ERROR FETCH:");
    console.error(error);
  }
};

  const fetchGoals = async () => {

      try {

      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/goals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGoals(res.data);

      } catch (error) {

      console.error(error);

      }

    };

  useEffect(() => {
      fetchMeals();
      fetchGoals();
      fetchWater();
    }, []);
  
  //agrupo meals
  const breakfastMeals = meals.filter(
      (meal) => meal.mealType === "breakfast"
    );

  const lunchMeals = meals.filter(
      (meal) => meal.mealType === "lunch"
    );

  const dinnerMeals = meals.filter(
      (meal) => meal.mealType === "dinner"
    );

  const snackMeals = meals.filter(
      (meal) => meal.mealType === "snack"
    );

  const consumedCalories = meals.reduce((total, meal) => total + meal.calories, 0);
  const burnedCalories = 0;
  const dailyGoal = goals?.dailyCalories || 0;
  const remainingCalories = dailyGoal - consumedCalories + burnedCalories;
  const totalWater = waterEntries.reduce((total, entry) => total + entry.amount, 0);
    
  return (
    <main className="min-h-screen px-4 py-6 pb-28 bg-zinc-950">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-sm text-zinc-400"> Hoy </p>
        <h1 className="text-3xl font-bold text-white">  Registro diario </h1>
      </div>

      {/* Calories Hero */}
      <section className="relative overflow-hidden rounded-[32px] p-6 bg-gradient-to-br from-[#7999D9] to-[#A0CCF2] mb-6">
        <div className="absolute w-40 h-40 rounded-full -top-10 -right-10 bg-white/10"/>

          <div className="relative z-10">
            
            <p className="mb-2 text-sm text-white/80"> Calorías restantes </p>
            <h2 className="text-5xl font-bold text-white"> {remainingCalories} </h2>

            <div className="flex items-center gap-3 mt-5 text-sm text-white/90">

              <div className="flex items-center gap-1">
                <Flame size={16} />
                {consumedCalories} consumidas
              </div>

              <span>•</span>

              <div className="flex items-center gap-1">
                <Dumbbell size={16} />
                {burnedCalories} quemadas
              </div>

            </div>

          </div>

      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveModal("water")}
            className="min-w-[110px] max-w-[115px] rounded-3xl p-4 bg-zinc-900 border border-zinc-800 text-left"
          >

            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-2xl bg-[#7999D9]/20">

              <Droplets
                size={20}
                className="text-[#A0CCF2]"
              />

            </div>

            <p className="text-sm text-zinc-400"> {totalWater} ml </p>

            <h3 className="mt-1 font-bold text-white text-md"> + Agregar </h3>

          </button>

          <button
            onClick={() => {
              setSelectedMealType("");
              setActiveModal("meal");
            }}
            className="min-w-[110px] max-w-[115px] rounded-3xl p-4 bg-zinc-900 border border-zinc-800text-left ">

            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-2xl bg-orange-500/20">
              <Plus
                size={20}
                className="text-orange-300"
              />
            </div>

            <p className="text-sm text-zinc-400"> Comida </p>

            <h3 className="mt-1 font-bold text-white text-md"> + Agregar</h3>

          </button>

          <button
            onClick={() => setActiveModal("exercise")}
            className="min-w-[110px] max-w-[115px] rounded-3xl p-4 bg-zinc-900 border border-zinc-800 text-left">

            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-2xl bg-green-500/20">
              <Dumbbell
                size={20}
                className="text-green-300"
              />
            </div>

            <p className="text-sm text-zinc-400"> Ejercicio</p>

            <h3 className="mt-1 font-bold text-white text-md"> + Agregar</h3>

          </button>
        </div>
      </section>

      {/* Meals */}
      <section className="space-y-4">

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white"> Comidas </h2>
        </div>

        <MealSection
          title="Breakfast"
          meals={breakfastMeals}
          onDelete={handleDeleteMeal}
          onAdd={() => {
            setSelectedMealType("breakfast");
            setActiveModal("meal");
          }}
        />

        <MealSection
          title="Lunch"
          meals={lunchMeals}
          onDelete={handleDeleteMeal}
          onAdd={() => {
            setSelectedMealType("lunch");
            setActiveModal("meal");
          }}
        />

        <MealSection
          title="Dinner"
          meals={dinnerMeals}
          onDelete={handleDeleteMeal}
          onAdd={() => {
            setSelectedMealType("dinner");
            setActiveModal("meal");
          }}
        />

        <MealSection
          title="Snack"
          meals={snackMeals}
          onDelete={handleDeleteMeal}
          onAdd={() => {
            setSelectedMealType("snack");
            setActiveModal("meal");
          }}
        />

      </section>

      {/* AI Insight */}
      <section className="p-5 mt-8 border rounded-3xl bg-zinc-900 border-zinc-800">
        <p className="mb-2 text-sm text-zinc-400"> Insight IA </p>

        <h3 className="text-lg font-semibold leading-relaxed text-white">  Hoy consumiste más proteína que ayer 💪</h3>

        <p className="mt-2 text-sm text-zinc-500">  Seguí así para acercarte a tu objetivo semanal. </p>
      </section>

      {activeModal === "meal" && (
      <MealModal
        mealType={selectedMealType}
        onClose={() => setActiveModal(null)}
        onSuccess={() => {
          fetchMeals();
          setActiveModal(null);
        }}
      />
      )}


      { activeModal === "water" && (
        <WaterModal
          onClose={() => setActiveModal(null)}
          onWaterAdded={fetchWater}
        />
      )}

      { activeModal === "exercise" && (
        <ExerciseModal
          onClose={() => setActiveModal(null)}
        />
      )}
        
    </main>
  );
}