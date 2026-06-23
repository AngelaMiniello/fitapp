"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ValidateFormRegister } from "../lib/validate";
import { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { register } from "../service/authService";
import { Eye, EyeOff } from "lucide-react";
import { UserCircle2, ChevronRight } from "lucide-react";

export default function RegisterView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [googleData, setGoogleData] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (token && token !== "null") {
      try {
        const decoded: any = jwtDecode(token);
        setGoogleData(decoded);
        localStorage.setItem("googleRegisterData", JSON.stringify(decoded));
      } catch (error) {
        console.error("Token inválido:", error);
      }
      return;
    }
    const stored = localStorage.getItem("googleRegisterData");
    if (stored) setGoogleData(JSON.parse(stored));
  }, [token]);

  return (
    <main className="min-h-screen px-6 py-10 bg-black">

      {/* Icon */}
      <div className="mb-10">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-900/30">
          <UserCircle2
            size={56}
            className="text-emerald-400"
          />
        </div>
      </div>

      {/* Google button */}
      <div>
        <button type="button" className="btn-google">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Regístrate con Google
        </button>
      </div>

      {/* Header */}
      <h1 className="mb-4 text-5xl font-light leading-tight text-white"> Completa tu perfil </h1>

      <p className="mb-12 text-xl leading-relaxed text-zinc-500">
        Esta información nos ayuda a calcular métricas personalizadas
        como calorías, hidratación y objetivos diarios.
      </p>

      {/* Section */}
      <h2 className="mb-5 text-2xl text-zinc-300"> Información personal </h2>

      {/* Card */}
      <div className="overflow-hidden border bg-zinc-950 rounded-3xl border-zinc-800">

        <button className="flex items-center justify-between w-full px-6 py-6 border-b border-zinc-800">
          <span className="text-2xl text-zinc-300"> Peso </span>

          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#A0CCF2]"> 70 kg</span>

            <ChevronRight className="text-zinc-500" />
          </div>
        </button>

<button
      className="flex items-center justify-between w-full px-6 py-6 border-b border-zinc-800"
    >
      <span className="text-2xl text-zinc-300">
        Altura
      </span>

      <div className="flex items-center gap-3">
        <span className="text-2xl text-[#A0CCF2]">
          170 cm
        </span>

        <ChevronRight
          className="text-zinc-500"
        />
      </div>
    </button>

 <button
      className="flex items-center justify-between w-full px-6 py-6 "
    >
      <span className="text-2xl text-zinc-300">
        Género
      </span>

      <div className="flex items-center gap-3">
        <span className="text-2xl text-[#A0CCF2]">
          Mujer
        </span>

        <ChevronRight
          className="text-zinc-500"
        />
      </div>
    </button>
      </div>

                      

            
  {/* Footer */}
  <div className="flex justify-end mt-12">

    <button
      className="
        px-8
        py-4
        rounded-full
        bg-[#7999D9]
        text-white
        font-semibold
      "
    >
      Continuar
    </button>

      </div>
    </main>
  );
}