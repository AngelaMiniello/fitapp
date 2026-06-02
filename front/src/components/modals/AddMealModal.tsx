import { useState } from "react";
import axios from "axios";
import FoodSearchResult from "../FoodSearchResult";

interface MealModalProps {
  onClose: () => void;
  onSuccess: () => void;
  mealType?: string;
}

export default function MealModal({ 
  onClose, onSuccess, mealType
}: MealModalProps) {
  
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState( mealType || "breakfast" );
  const [quantity, setQuantity] = useState<number | string>(100);
  
  const handleSearch = async () => {
    try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
       `${process.env.NEXT_PUBLIC_API_URL}/meals/search`,
      {
        params: {
          query
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

     console.log(response.data);
     
    setFoods(response.data);

    } catch(error) {
    console.error("Error buscando comida:", error);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-end pb-10 bg-black/50">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-h-[85vh] p-6 rounded-t-[32px] bg-zinc-900 border-t border-zinc-800 flex flex-col">
        <div className="w-16 h-1 mx-auto mb-6 rounded-full bg-zinc-700"/>
          <h2 className="mb-5 text-2xl font-bold text-white"> Add food </h2>
          <input
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search food..."
            className="w-full p-4 text-white border rounded-2xl bg-zinc-800 border-zinc-700"
          />

          <div className="mt-4">

  

  <input
    type="number"
    value={quantity}
    onChange={(e) => {

  const value = e.target.value;

  setQuantity(value === "" ? "" : Number(value));

}}
    className="w-full p-4 text-white border rounded-2xl bg-zinc-800 border-zinc-700"
  />
  <p className="mt-1 ml-2 text-sm text-zinc-400">
    Quantity (g)
  </p>
</div>

          {/* si no recibe mealType de Diary aparece el Select */}
          {!mealType && (
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
              className="w-full p-4 mt-4 text-white border rounded-2xl bg-zinc-800 border-zinc-700"
            >

              <option value="breakfast"> Breakfast </option>
              <option value="lunch"> Lunch </option>
              <option value="dinner"> Dinner </option>
              <option value="snack"> Snack </option>

            </select>
          )}

          <button
            onClick={handleSearch}
            className="w-full py-4 mt-6 font-medium text-white rounded-2xl bg-[#7999D9]"> Search 
          </button>
          
          {/* SOLO ESTO SCROLLEA */}
          <div className="flex-1 mt-6 overflow-y-auto">
            {foods.map((food:any)=>(
                <FoodSearchResult
                  key={food.fdcId}
                  food={food}
                  onFoodAdded={onSuccess}
                  mealType={selectedMealType}
                  quantity={quantity}
                />
            ))}
          </div>
      
      </div>
    </div>
  );

}