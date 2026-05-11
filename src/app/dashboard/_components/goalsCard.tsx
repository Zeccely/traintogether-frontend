"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GoalsCard() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your goals will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
