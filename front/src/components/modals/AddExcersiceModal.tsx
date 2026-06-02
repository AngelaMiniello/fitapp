
interface ExerciseModalProps {
  onClose: () => void;
}

export default function ExerciseModal({ onClose,}: ExerciseModalProps) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-end pb-20 bg-black/50">

      <div onClick={(e) => e.stopPropagation()} className="w-full p-6 rounded-t-[32px] bg-zinc-900">

        <h2 className="mb-5 text-2xl font-bold text-white"> Agregar ejercicio </h2>

        <input
          placeholder="Ej: Caminata 30 min"
          className="w-full p-4 text-white border rounded-2xl bg-zinc-800 border-zinc-700"
        />

        <button
          onClick={onClose}
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
          Cerrar
        </button>

      </div>

    </div>
  );

}