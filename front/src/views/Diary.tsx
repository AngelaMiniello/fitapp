"use client";

import { useState, useEffect } from "react";
import api from "../service/api";
import { Flame, Droplets, Dumbbell, Plus, SportShoe, Footprints, Bike, Waves, Icon } from "lucide-react";
import MealModal from "../components/modals/AddMealModal";
import WaterModal from "../components/modals/AddWaterModal";
import ExerciseModal from "../components/modals/AddExcersiceModal";
import MealSection from "../components/cards/MealSection";
import { useRouter } from "next/navigation";

export default function DiaryRegister() {
  const router = useRouter()
  const [meals, setMeals] = useState<any[]>([]);
  const [goals, setGoals] = useState<any>(null);
  const [activeModal, setActiveModal] = useState< "meal" | "water" | "exercise" | null>(null);//modal to add meals
  const [waterEntries, setWaterEntries] = useState<any[]>([]);
  const [selectedMealType, setSelectedMealType] = useState("");// meal type
  const [selectedMeal, setSelectedMeal] = useState<any>(null);//to get to meal detail
  const [exercises, setExercises] = useState([]);

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
      const token = localStorage.getItem("token");

      const res = await api.get("/meals/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMeals(
        Array.isArray(res.data.meals)
          ? res.data.meals
          : []
      );

    } catch (error) {
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

  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/exercises/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
    console.log(res.data);

    setExercises(
      Array.isArray(res.data.exercises)
        ? res.data.exercises
        : []
    );

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      fetchMeals();
      fetchGoals();
      fetchWater();
      fetchExercises();
    }, []);
  
  // meals
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
  
  const getExerciseIcon = (name: string) => {
    const exercise = name.toLowerCase();

    if (exercise.includes("run"))
      return <SportShoe size={28} />;

    if (exercise.includes("walk"))
      return <Footprints size={28} />;

    if (exercise.includes("bike"))
      return <Bike size={28} />;

    if (exercise.includes("swim"))
      return <Waves size={28} />;

    return <Dumbbell size={28} />;
  };

  console.log(exercises);
  return (
    <main className="min-h-screen px-4 py-6 pb-28 bg-zinc-950">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-sm text-zinc-400"> Today </p>
        <h1 className="text-3xl font-bold text-white">  Daily register </h1>
      </div>

      {/* Calories Hero */}
      <section className="relative overflow-hidden rounded-[32px] p-6 bg-gradient-to-br from-[#7999D9] to-[#A0CCF2] mb-6">
        <div className="absolute w-40 h-40 rounded-full -top-10 -right-10 bg-white/10"/>

          <div className="relative z-10">
            
            <p className="mb-2 text-sm text-white/80"> Calories left </p>
            <h2 className="text-5xl font-bold text-white"> {remainingCalories} </h2>

            <div className="flex items-center gap-3 mt-5 text-sm text-white/90">

              <div className="flex items-center gap-1">
                <Flame size={16} />
                {consumedCalories} consumed
              </div>

              <span>•</span>

              <div className="flex items-center gap-1">
                <Dumbbell size={16} />
                {burnedCalories} burned
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

            <h3 className="mt-1 font-bold text-white text-md"> + Add </h3>

          </button>

          <button
            onClick={() => {
              setSelectedMealType("");
              setActiveModal("meal");
            }}
            className="min-w-[110px] max-w-[115px] rounded-3xl p-4 bg-zinc-900 border border-zinc-800 text-left ">

            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-2xl bg-orange-500/20">
              <Plus
                size={20}
                className="text-orange-300"
              />
            </div>

            <p className="text-sm text-zinc-400"> Meal </p>

            <h3 className="mt-1 font-bold text-white text-md"> + Add </h3>

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

            <p className="text-sm text-zinc-400"> Exercise </p>

            <h3 className="mt-1 font-bold text-white text-md"> + Add </h3>

          </button>
        </div>
      </section>

      {/* Meals */}
      <section className="mb-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white"> Meals </h2>
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

      {/* Excersices */}
      <section className="space-y-4">
        <div className="mb-2">
          <h2 className="mb-4 text-xl font-bold text-white"> Exercises </h2>

            <div className="flex gap-4 pb-2 overflow-x-auto">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex flex-col items-center min-w-[90px]"
                  onClick={() =>
                    router.push(`/exercise/${exercise.id}`)
                  }
                >

                  <div className="flex items-center justify-center w-20 h-20 border rounded-full bg-zinc-900 border-zinc-800 text-[#7999D9] hover:border-[#7999D9] hover:border-1">
                    {getExerciseIcon(exercise.name)}
                  </div>

                  <p className="mt-2 text-sm font-medium text-white"> {exercise.duration} min </p>

                  <p className="text-xs text-zinc-400"> {exercise.caloriesBurned} kcal </p>

                </div>
              ))}
            </div>
        </div>
      </section>

      {/* AI Insight */}
      <section className="p-5 mt-8 border rounded-3xl bg-zinc-900 border-zinc-800">
        <p className="mb-2 text-sm text-zinc-400"> Insight IA </p>

        <h3 className="text-lg font-semibold leading-relaxed text-white">  More protein intake than yesterday 💪</h3>

        <p className="mt-2 text-sm text-zinc-500"> Keep going to get closer to your weekly goals </p>
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
          onExerciseAdded={fetchExercises}
        />
      )}
        
    </main>
  );
}