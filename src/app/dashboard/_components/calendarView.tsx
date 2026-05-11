"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalendarView() {
  return (
    <Card className="min-h-80">
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-56 items-center justify-center rounded-md bg-muted">
          Calendar goes here.
        </div>
      </CardContent>
    </Card>
  );
}
