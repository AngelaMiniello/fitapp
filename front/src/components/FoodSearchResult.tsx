import axios from "axios";

type FoodProps = {
  food: any;//la comida actual de USDA (Banana, calorías, etc.)
  onFoodAdded: () => void;//avisarle al componente padre:"ya guardé la comida", para ejecutar:fetchMeals(), y actualizar el Diary automáticamente.
  mealType: string;//si el usuario eligió  BreakfastLunchDinnerSnack
  quantity:number;
};

export default function FoodSearchResult({ food, onFoodAdded, mealType,  quantity }: FoodProps) {

  const baseCalories  =
    food.foodNutrients?.find(
      (n:any) => n.nutrientName === "Energy"
    )?.value || 0;
  
  const calories = (baseCalories * Number(quantity || 0)) / 100;

  const baseProtein =
    food.foodNutrients?.find(
      (n:any) => n.nutrientName === "Protein"
    )?.value || 0;
  
  const protein = (baseProtein * Number(quantity || 0)) / 100;

  const baseCarbs =
    food.foodNutrients?.find(
      (n:any) =>
        n.nutrientName === "Carbohydrate, by difference"
    )?.value || 0;
 
  const carbs = (baseCarbs * Number(quantity || 0)) / 100;

  const baseFat =
    food.foodNutrients?.find(
      (n:any) =>
        n.nutrientName === "Total lipid (fat)"
    )?.value || 0;
  
  const fat = (baseFat * Number(quantity || 0)) / 100;

  const handleAddFood = async () => {
    try {
      const token =
        localStorage.getItem("token");

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/meals`,
          {
            name: food.description,
            calories,
            protein,
            carbs,
            fat,
            mealType,
            quantity,
            baseCalories,
            baseProtein,
            baseCarbs,
            baseFat,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        onFoodAdded();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="p-4 mb-3 border rounded-2xl bg-zinc-800 border-zinc-700">

      <h3 className="font-semibold text-white"> {food.description} </h3>

      <div className="flex gap-4 mt-2 text-sm text-zinc-400">
        <span>{Math.round(calories)} kcal</span>
        <span>P: {protein}g</span>
        <span>C: {carbs}g</span>
        <span>F: {fat}g</span>
      </div>

      <button
        onClick={handleAddFood}
        className="mt-3 w-full py-2 rounded-xl bg-[#7999D9] text-white">
        Add
      </button>

    </div>
  );
}