"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading label="Loading goal" />
        ) : goal ? (
          <div>
            <p>{goal.title}</p>
            <p>Target: {goal.frequencyTarget} times per week</p>
            {goal.description && <p>{goal.description}</p>}
          </div>
        ) : (
          <p>No goal found.</p>
        )}
      </CardContent>
    </Card>
  );
}
