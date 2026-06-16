import { useState } from "react";//manejo estados
import api from "../../service/api";//conecto con el back?

interface ExerciseModalProps {
  onClose: () => void;
  onExerciseAdded: () => void;
}

export default function ExerciseModal({ onClose, onExerciseAdded}: ExerciseModalProps) {

  const [name, setName] = useState("");
  const [duration, setDuration] = useState<number | string>(30);
  const [caloriesBurned, setCaloriesBurned] = useState<number | string>(300);

  //function to add exercise
  const handleAddExercise = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post("/exercises",
        {
          name,
          duration: Number(duration),
          caloriesBurned: Number(caloriesBurned)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Exercise created");
      
      onExerciseAdded();
      onClose();
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-end pb-20 bg-black/50">

      <div onClick={(e) => e.stopPropagation()} className="w-full p-6 rounded-t-[32px] bg-zinc-900">

        <h2 className="mb-5 text-2xl font-bold text-white"> Agregar ejercicio </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Exercise name"
          className="w-full p-4 text-white border rounded-2xl bg-zinc-800 border-zinc-700"
        />

        <input
          type="number"
          value={duration}
          onChange={(e) => {
  const value = e.target.value;

  setDuration(
    value === ""
      ? ""
      : Number(value)
  );
}}
          className="w-full p-4 mt-2 text-white border rounded-2xl bg-zinc-800 border-zinc-700"
        />

        <input
          type="number"
          value={caloriesBurned}
          onChange={(e) => {
  const value = e.target.value;

  setCaloriesBurned(
    value === ""
      ? ""
      : Number(value)
  );
}}
          className="w-full p-4 mt-2 text-white border rounded-2xl bg-zinc-800 border-zinc-700"
        />

        <button
          onClick={handleAddExercise}
          className="w-full py-4 mt-6 font-medium text-white rounded-2xl bg-[#7999D9]"
        >
          Add Exercise
        </button>

        <button
          onClick={onClose}
          className="w-full py-4 mt-6 font-medium text-white rounded-2xl bg-[#7999D9]"
        >
          Cerrar
        </button>

      </div>
    </div>
  );
}