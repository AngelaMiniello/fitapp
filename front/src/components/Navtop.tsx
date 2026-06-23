"use client";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { Chat } from "lucide-react";
import chillax from "../fonts/fonts"

export default function Navtop() {
    const { userData } = useAuth();

    const initial = userData?.user?.email?.[0]?.toUpperCase() || "?";

    return (
      <nav className="w-full px-3 py-2 bg-zinc-900">
        <div className="flex items-center justify-between">
          <h1 className={`${chillax.className} text-base text-center text-slate-50`}>FitTuus</h1> 
          
          <Link href="/"></Link>
          <Link href="/dashboard">
            <div className="flex items-center justify-center font-semibold text-white transition bg-[#88B6F2] rounded-full w-9 h-9 hover:scale-105">
              {initial}
            </div>
          </Link>
        </div>
      </nav>
    )
}