import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingProps = {
  className?: string;
  label?: string;
};

export function Loading({ className, label = "Loading" }: LoadingProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center justify-center py-8", className)}
    >
      <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
