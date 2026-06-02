import api from "../../service/api";

interface WaterModalProps {
  onClose: () => void;
  onWaterAdded: () => void;
}

export default function WaterModal({ onClose, onWaterAdded}: WaterModalProps) {
  //post water
  const handleAddWater = async ( amount: number) => {
    try {

      const token = localStorage.getItem("token");
      await api.post( "/water",
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onWaterAdded()
      onClose();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end pb-20 bg-black/50"
    >

      <div
        className="w-full
          p-6
          rounded-t-[32px]
          bg-zinc-900
        "
      >

        <h2 className="mb-6 text-2xl font-bold text-white">
          Agregar agua
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {[250, 500, 1000].map((amount) => (
            <button
               key={amount}
               onClick={() => handleAddWater(amount)}
               className="py-4 text-white rounded-2xl bg-zinc-800"
            >
              +{amount}ml
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-4
            mt-6
            font-medium
            text-white
            rounded-2xl
            bg-[#7999D9]
          "
        >
          Cerrar
        </button>

      </div>

    </div>
  );

}