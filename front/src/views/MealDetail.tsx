"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../service/api";
import { useRouter } from "next/navigation";

export default function MealDetailPage(){
  
  const params = useParams();
  const router = useRouter();
  const [meal, setMeal] = useState<any>(null);
  const [quantity, setQuantity] = useState("");
  
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(
          `/meals/${params.id}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        setMeal(res.data);
        setQuantity(res.data.quantity);
        
      } catch(error){
        console.log(error);
      }

    };

    fetchMeal();

  }, []);

  if(!meal){
    return <p className="text-white">Details not found</p>;
  }

  const handleUpdateMeal = async () => {
    try {
    const token =
      localStorage.getItem("token");

    const res = await api.put(
  `/meals/${params.id}`,
  {
    quantity
  },
  {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
);

    router.push("/diary");

    } catch(error){

    console.log(error);

    }

}  ;

  //recalcular macros visualmente
  const quantityNumber = Number(quantity) || 0;

  const calories =
  (meal?.baseCalories * quantityNumber) / 100;

  const protein =
  (meal?.baseProtein * quantityNumber) / 100;

  const carbs =
  (meal?.baseCarbs * quantityNumber) / 100;

  const fat =
  (meal?.baseFat * quantityNumber) / 100;
  
  return(
    <main className="min-h-screen p-6 bg-zinc-950">
      <h1 className="mb-6 text-3xl font-bold text-white"> {meal.name} </h1>

      <div className="space-y-4">

        <div className="p-4 text-white rounded-2xl bg-zinc-900">
  Calories: {Math.round(calories)}
</div>

        <div className="p-4 text-white rounded-2xl bg-zinc-900">
          Protein: {meal.protein}g
        </div>

        <div className="p-4 text-white rounded-2xl bg-zinc-900">
          Carbs: {meal.carbs}g
        </div>

        <div className="p-4 text-white rounded-2xl bg-zinc-900">
          Fat: {meal.fat}g
        </div>

      </div>

      <div className="mb-6">

  <input
    type="number"
    value={quantity}
     onChange={(e) => { const value = e.target.value;
          setQuantity(value === "" ? "" : value);
              }}
    className="w-full p-4 mt-4 text-white border rounded-2xl bg-zinc-900 border-zinc-800"
  />

   <p className="mt-2 ml-2 text-sm text-zinc-400">
    Quantity (g)
  </p>
</div>

<button
  onClick={handleUpdateMeal}
  className="
    w-full
    py-4
    mt-6
    font-medium
    text-white
    rounded-2xl
    bg-[#7999D9]
  "
>
  Save changes
</button>

    </main>
  );
}