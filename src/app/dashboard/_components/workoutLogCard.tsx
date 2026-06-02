"use client";

import { useEffect, useState } from "react";
import { Check, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isTodaysWorkoutLogged, logTodaysWorkout } from "@/lib/api/goalProgress";
import WeekdayProgress from "./weekdayProgress";

export default function WorkoutLogCard() {
  const [isCheckingLoggedState, setIsCheckingLoggedState] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function checkLoggedState() {
      try {
        setIsLogged(await isTodaysWorkoutLogged());
      } catch (error) {
        console.error(error);
        setErrorMessage(
          error instanceof Error && error.message
            ? error.message
            : "Could not check today's workout.",
        );
      } finally {
        setIsCheckingLoggedState(false);
      }
    }

    checkLoggedState();
  }, []);

  async function handleLogWorkout() {
    try {
      setErrorMessage(null);
      await logTodaysWorkout();
      setIsLogged(true);
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

        <WeekdayProgress isTodayLogged={isLogged} />

        <Button
          type="button"
          disabled={isCheckingLoggedState || isLogged}
          onClick={handleLogWorkout}
        >
          {isLogged ? <Check /> : <Dumbbell />}
          {isLogged
            ? "Workout logged"
            : isCheckingLoggedState
              ? "Checking today's workout..."
              : "Log today's workout"}
        </Button>

        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
      </CardContent>
    </Card>
  );
}
