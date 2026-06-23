import NutritionCards from "../../components/NutritionCards";
import HealthOverview from "../../components/HealthOverview";

export default function Home() {
  return(
    <section className="w-full">
      <NutritionCards/>
      <HealthOverview/>
    </section>
  );
}