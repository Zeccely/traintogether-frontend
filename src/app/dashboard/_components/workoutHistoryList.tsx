"use client";

import { GoalProgress } from "@/lib/types/goalProgress";

type WorkoutHistoryListProps = {
  progressEntries: GoalProgress[];
};

export default function WorkoutHistoryList({ progressEntries }: WorkoutHistoryListProps) {
  if (progressEntries.length === 0) {
    return <p className="text-sm text-muted-foreground">No workouts logged yet.</p>;
  }

  const sortedEntries = [...progressEntries].sort((first, second) =>
    second.dateRegistration.localeCompare(first.dateRegistration),
  );

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Workout days</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {sortedEntries.map((entry) => (
          <li key={entry.id}>{formatWorkoutDate(entry.dateRegistration)}</li>
        ))}
      </ul>
    </div>
  );
}

function formatWorkoutDate(dateRegistration: string): string {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateRegistration}T00:00:00`));
}
