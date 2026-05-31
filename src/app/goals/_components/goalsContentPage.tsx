"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";
import GoalForm from "./goalform";
import MyGoal from "./myGoal";
import { getMyGoal } from "@/lib/api/goals";
import { Goal } from "@/lib/types/goal";

export default function GoalsContent() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadGoal() {
      try {
        const myGoal = await getMyGoal();
        setGoal(myGoal);
      } catch (error) {
        console.error(error);
        setErrorMessage("Could not load your goal.");
      } finally {
        setIsLoading(false);
      }
    }

    loadGoal();
  }, []);

  if (isLoading) {
    return <Loading label="Loading goal" />;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (goal) {
    return <MyGoal goal={goal} onDeleted={() => setGoal(null)} />;
  }

  return <GoalForm />;
}
