import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type WeekdayProgressProps = {
  isTodayLogged: boolean;
};

const weekdays = [
  { label: "M", day: 1 },
  { label: "T", day: 2 },
  { label: "W", day: 3 },
  { label: "T", day: 4 },
  { label: "F", day: 5 },
  { label: "S", day: 6 },
  { label: "S", day: 0 },
];

export default function WeekdayProgress({ isTodayLogged }: WeekdayProgressProps) {
  const today = new Date().getDay();

  return (
    <div className="flex flex-wrap gap-2" aria-label="Workout progress for this week">
      {weekdays.map((weekday, index) => {
        const isToday = weekday.day === today;
        const isCompleted = isToday && isTodayLogged;

        return (
          <div
            key={`${weekday.label}-${index}`}
            aria-label={`${weekday.label}${isCompleted ? ", workout logged" : ""}`}
            className={cn(
              "flex size-8 items-center justify-center rounded-full border text-xs",
              isCompleted
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted/40 text-muted-foreground",
              isToday && !isCompleted ? "border-primary text-foreground" : null,
            )}
          >
            {isCompleted ? <Check className="size-4" /> : weekday.label}
          </div>
        );
      })}
    </div>
  );
}
