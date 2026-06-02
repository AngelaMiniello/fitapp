import {Trash2} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

type MealCardProps = {
  meal: any;
  onDelete: (id:number)=>void;
};

export default function MealCard({ meal, onDelete}:MealCardProps){

  const router = useRouter();
  
  return (
    <div className="relative mt-3 mb-3 overflow-hidden rounded-2xl">
      {/* fondo trash */}
      <div className="absolute right-0 flex items-center justify-end w-20 bg-zinc-800 p-3 top-[0.3] bottom-[0.5] rounded-2xl">
        <button onClick={() => onDelete(meal.id)}>
          <Trash2 size={20} className="text-white"/>
        </button>
      </div>

      {/* swipe */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -40, right: 0 }}
        dragElastic={0.1}
        className="relative z-10 w-full p-3 bg-zinc-800 rounded-2xl cursor-grab"
        onClick={() => router.push(`/meal/${meal.id}`)} 
      >

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white"> {meal.name} </h3>
            <p className="text-sm text-zinc-400"> {meal.calories} kcal • {meal.quantity}g </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}