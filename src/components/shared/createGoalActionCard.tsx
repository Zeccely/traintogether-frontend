import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CreateGoalActionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No Goal Created!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You need a goal before joining a group.</p>
        <Button asChild className="mt-3">
          <Link href="/goals">Create a goal</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
