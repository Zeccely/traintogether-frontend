"use client";

import { useEffect, useState } from "react";
import { Check, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyGoalProgress, isTodaysWorkoutLogged, logTodaysWorkout } from "@/lib/api/goalProgress";
import { GoalProgress } from "@/lib/types/goalProgress";
import WorkoutHistoryList from "./workoutHistoryList";
import WeekdayProgress from "./weekdayProgress";

export default function WorkoutLogCard() {
  const [isLogged, setIsLogged] = useState(false);
  const [progressEntries, setProgressEntries] = useState<GoalProgress[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadWorkoutState() {
      try {
        const [isTodayLogged, loadedProgressEntries] = await Promise.all([
          isTodaysWorkoutLogged(),
          getMyGoalProgress(),
        ]);

        setIsLogged(isTodayLogged);
        setProgressEntries(loadedProgressEntries);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          error instanceof Error && error.message
            ? error.message
            : "Could not load your workout progress.",
        );
      }
    }

    loadWorkoutState();
  }, []);

  async function handleLogWorkout() {
    try {
      setErrorMessage(null);
      await logTodaysWorkout();
      const loadedProgressEntries = await getMyGoalProgress();
      setIsLogged(true);
      setProgressEntries(loadedProgressEntries);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error && error.message ? error.message : "Could not log today's workout.",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Workout</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          Log your workout when you have completed today&apos;s goal.
        </p>

        <WeekdayProgress progressEntries={progressEntries} />
        <WorkoutHistoryList progressEntries={progressEntries} />

        <Button type="button" disabled={isLogged} onClick={handleLogWorkout}>
          {isLogged ? <Check /> : <Dumbbell />}
          {isLogged ? "Workout logged" : "Log today's workout"}
        </Button>

        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
      </CardContent>
    </Card>
  );
}
