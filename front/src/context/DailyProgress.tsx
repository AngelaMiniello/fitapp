"use client";

import api from "../service/api";
import { createContext, useContext, useState, useEffect } from "react";

interface DailyProgress {
  caloriesConsumed: number;
  caloriesBurned:  number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

interface DailyProgressType {
    dailyProgress: DailyProgress | null;
    setDailyProgress: React.Dispatch<React.SetStateAction<DailyProgress | null>>;
    fetchDailyProgress: () => Promise<void>;
}

const DailyProgressContext = createContext<DailyProgressType | null>(null);

export function DailyProgressProvider({ children,}: { children: React.ReactNode;}) {
    const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);

    const fetchDailyProgress = async () => {
        try{
            const token = localStorage.getItem("token");

            const res = await api.get("/dailyprogress", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setDailyProgress(res.data);

        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
      fetchDailyProgress();
    }, []);
    
    return (
    <DailyProgressContext.Provider value={{ dailyProgress, setDailyProgress, fetchDailyProgress }}>
      {children}
    </DailyProgressContext.Provider>
  );
}

export function useDailyProgress() {
  const context = useContext(DailyProgressContext);

  if (!context) {
    throw new Error(
      "useGoals must be used inside DailyTotalsContext"
    );
  }

  return context;
}