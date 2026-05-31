"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal } from "@/lib/types/goal";
import { getMyGoal } from "@/lib/api/goals";
import { useEffect, useState } from "react";

export default function GoalsCard() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getGoal() {
      try {
        const goal = await getMyGoal();
        setGoal(goal);
      } catch (error) {
        console.error("Error fetching goal:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getGoal();
  }, []); //“Only do this once when the component first loads.”

  let goalContent;
  if (isLoading) {
    goalContent = null;
  } else if (goal) {
    goalContent = (
      <div>
        <p>{goal.title}</p>
        <p>Target: {goal.frequencyTarget} times per week</p>
        {goal.description && <p>{goal.description}</p>}{" "}
        {/*this works because jsx also returns a value while checking condition */}
      </div>
    );
  } else {
    goalContent = <p>No goal found.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
      </CardHeader>
      <CardContent>{goalContent}</CardContent>
    </Card>
  );
}
