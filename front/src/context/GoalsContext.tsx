"use client";

import api from "../service/api";
import { createContext, useContext, useState, useEffect } from "react";

interface Goals {
  dailyCalories: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  waterGoal: number;
  stepsGoal: number;
  workoutsPerWeekGoal: number;
  sleepGoal: number;
}

interface GoalsContextType {
  goals: Goals | null;
  setGoals: React.Dispatch<React.SetStateAction<Goals | null>>;
  fetchGoals: () => Promise<void>;
}

const GoalsContext = createContext<GoalsContextType | null>(null);

export function GoalsProvider({ children,}: { children: React.ReactNode;}) {
  
  const [goals, setGoals] = useState<Goals | null>(null);
  
  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/goals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });

      setGoals(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <GoalsContext.Provider value={{ goals, setGoals, fetchGoals }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);

  if (!context) {
    throw new Error(
      "useGoals must be used inside GoalsProvider"
    );
  }

  return context;
}