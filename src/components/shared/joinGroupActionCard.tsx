import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export default function JoinGroupActionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Not in a Group!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You need to be in a group to have a stake</p>
        <Button asChild className="mt-3">
          <Link href="/groups">Join a group</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
