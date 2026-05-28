"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyGroupUsers } from "@/lib/api/groups";
import { GroupDTO, GroupUserDTO } from "@/lib/types/group";

type MyGroupCardProps = {
  group: GroupDTO;
};

export default function MyGroupCard({ group }: MyGroupCardProps) {
  const [teammates, setTeammates] = useState<GroupUserDTO[]>([]);
  const [loadingTeammates, setLoadingTeammates] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadTeammates();
  }, []);

  async function loadTeammates() {
    try {
      setLoadingTeammates(true);
      setErrorMessage(null);
      setTeammates(await getMyGroupUsers());
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Could not load teammates.",
      );
    } finally {
      setLoadingTeammates(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.groupName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Teammates</h3>

          {loadingTeammates ? (
            <p className="text-sm text-muted-foreground">Loading teammates...</p>
          ) : null}

          {!loadingTeammates && teammates.length === 0 ? (
            <p className="text-sm text-muted-foreground">No teammates yet.</p>
          ) : null}

          {teammates.map((teammate) => (
            <div
              key={teammate.username}
              className="rounded-md border border-border p-3"
            >
              <p className="font-medium">{teammate.name}</p>
              <p className="text-sm text-muted-foreground">{teammate.username}</p>
            </div>
          ))}
        </div>

        {errorMessage ? (
          <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
