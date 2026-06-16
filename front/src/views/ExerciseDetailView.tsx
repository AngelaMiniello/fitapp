"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../service/api";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ExerciseDetailView(){

    const params = useParams();
    const { id } = useParams();
    const router = useRouter();
    const [exercise, setExercise] = useState<any>(null);
    const [duration, setDuration] = useState<number | string>("");

    useEffect(() => {//cuando monto la pag
      const fetchExercises = async () => {//voy a buscar los ejercicios
        try {//le digo proba 
            const token = localStorage.getItem("token");//q el usuer este logeado 

            const res = await api.get(`/exercises/${id}`,
              {
                headers:{
                  Authorization:`Bearer ${token}`
                }
            })

            setExercise(res.data);
            setDuration(res.data.duration);

        } catch (error) {
          console.log(error);
        }
      }

      fetchExercises();

    }, []);

    const handleUpdateExercise = async () => {
        try {
          const token = localStorage.getItem("token");

          const res = api.put(`/exercises/${id}`,
            {
              duration
            },
            {
              headers: {
                Authorization:`Bearer ${token}`
              }
            }
          );

          router.push("/diary");
        } catch(error) {
          console.log(error);
        }
    }

    //recalcular visualmente , duration (string del input), durationNumber (número), calcular calorías usando durationNumber
    const durationNumber = Number(duration) || 0;

    const calories = ((exercise?.baseCaloriesBurned ?? 0) * durationNumber) / (exercise?.baseDuration ?? 1);
    
    if (!exercise) {
      return (
    <main className="flex items-center justify-center min-h-screen text-white bg-zinc-950">
      Loading...
    </main>
  );
}

    return(
      <main className="min-h-screen p-6 bg-zinc-950">
        <h1 className="mb-6 text-3xl font-bold text-white"> {exercise.name} </h1>
 
        <div className="space-y-4">
            <div className="p-4 text-white rounded-2xl bg-zinc-900"> Burned calories: {Math.round(calories)} </div>
        </div>

        <div className="mb-6">
            <p className="mt-4 ml-2 text-sm text-zinc-400"> Duration: </p>
            <input
              type="number"
              value={duration}
              onChange={(e) => { const value = e.target.value;
                setDuration(value === "" ? "" : Number(value));
              }}
              className="w-full p-4 mt-4 text-white border rounded-2xl bg-zinc-900 border-zinc-800"
            >
            </input>
        </div>

        <div className="flex flex-col items-center mb-6">
            <button 
              onClick={handleUpdateExercise}
               className="w-full py-4 mt-4 font-medium text-white rounded-2xl bg-[#7999D9]"
            >
              Save changes
            </button>

            <button 
              onClick={() => router.push("/diary")}
              className="flex items-center gap-2 mt-2 text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              <span>Diary</span>
            </button>
        </div>
      </main>
    )
}