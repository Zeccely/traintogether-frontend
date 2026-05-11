"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Username</p>
          <p className="">User info goes here.</p>
        </div>
      </CardContent>
    </Card>
  );
}
