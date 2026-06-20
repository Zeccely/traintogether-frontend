"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loading } from "@/components/ui/loading";
import { useEffect, useState } from "react";
import { getCurrentUserDetails } from "@/lib/api/users";
import { UserDetails } from "@/lib/types/user";

export default function UserCard() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const user = await getCurrentUserDetails();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        {isLoading ? (
          <Loading label="Loading user" />
        ) : (
          user && (
            <div>
              <p className="font-medium">{user.username}</p>
              <p>{user.name}</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
