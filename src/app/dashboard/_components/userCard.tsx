"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getCurrentUserDetails } from "@/lib/api/users";
import { UserDetails } from "@/lib/types/user";

export default function UserCard() {
  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const user = await getCurrentUserDetails();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    getUser();
  }, []);

  let userContent;

  if (user) {
    userContent = (
      <div>
        <p className="font-medium">{user.username}</p>
        <p>{user.name}</p>
      </div>
    );
  } else {
    userContent = null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        {userContent}
      </CardContent>
    </Card>
  );
}
