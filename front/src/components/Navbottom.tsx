"use client";

import Link from "next/link";
import {
  House,
  NotebookPen,
  Plus,
  ChartColumn,
  Ellipsis,
} from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-zinc-900 border-zinc-800">

      <div className="flex items-center justify-around px-2 py-3">

        {/* Panel */}
        <Link
          href="/"
          className="flex flex-col items-center gap-1 transition text-slate-50 hover:text-white"
        >
          <House size={22} />
          <span className="text-xs">Panel</span>
        </Link>

        {/* Diario */}
        <Link
          href="/diary"
          className="flex flex-col items-center gap-1 transition text-slate-50 hover:text-white"
        >
          <NotebookPen size={22} />
          <span className="text-xs">Diario</span>
        </Link>

        {/* Botón central */}
        <button
          className="flex items-center justify-center w-16 h-16 -mt-8 transition bg-[#6289D9] rounded-full shadow-lg text-slate-50 hover:scale-105"
        >
          <Plus size={32} />
        </button>

        {/* Progreso */}
        <Link
          href="/progress"
          className="flex flex-col items-center gap-1 transition text-slate-50 hover:text-white"
        >
          <ChartColumn size={22} />
          <span className="text-xs">Progreso</span>
        </Link>

        {/* Más */}
        <Link
          href="/more"
          className="flex flex-col items-center gap-1 transition text-slate-50 hover:text-white"
        >
          <Ellipsis size={22} />
          <span className="text-xs">Más</span>
        </Link>

      </div>

    </nav>
  );
}