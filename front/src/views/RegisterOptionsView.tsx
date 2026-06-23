"use client"

import { useRouter } from "next/navigation";

export default function RegisterOptionsView() {
    const router = useRouter();

    const handleGoogleLogin = async () => {
      console.log("Google Login");
    };

    const handleRegister = () => {
      router.push("/register");
    };

    return (
      <main 
        className="h-[90vh] bg-[#98BDED] flex flex-col justify-between py-8 bg-cover bg-center" 
        style={{
          backgroundImage: "url('/bgo.png')",
        }}>

        <div className="absolute inset-0 pointer-events-none bg-black/10" />

        {/* Contenido */}
        <div className="flex flex-col gap-2 px-8 pb-8 mt-auto">

          <div className="flex flex-col gap-2">
            <button className="w-full py-4 text-lg font-medium text-white bg-black rounded-full">
              Continue with Google
            </button>

            <button
              className="w-full py-4 text-lg font-medium text-black bg-transparent border-2 border-black rounded-full"
              onClick={() => router.push("/register")}
            >
              Create Account
            </button>
          </div>

          <p className="mt-4 font-semibold text-center text-black/70">
            Already have an account?
            <button className="ml-2 font-bold" onClick={() => router.push("/login")}>
              Sign In
            </button>
          </p>

        </div>
    </main>
  );
}