"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGroups, joinGroup } from "@/lib/api/groups";
import { GroupDTO } from "@/lib/types/group";

type GroupJoinCardProps = {
  onJoined: (group: GroupDTO) => void;
};

export default function GroupJoinCard({ onJoined }: GroupJoinCardProps) {
  const [groups, setGroups] = useState<GroupDTO[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    try {
      setLoadingGroups(true);
      setErrorMessage(null);
      setGroups(await getGroups());
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Could not load groups.",
      );
    } finally {
      setLoadingGroups(false);
    }
  }

  async function handleJoin(groupId: number) {
    try {
      setErrorMessage(null);
      const joinedGroup = await joinGroup(groupId);
      onJoined(joinedGroup);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Could not join group.",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a group</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {loadingGroups ? <p className="text-sm text-muted-foreground">Loading groups...</p> : null}

          {!loadingGroups && groups.length === 0 ? (
            <p className="text-sm text-muted-foreground">No groups available.</p>
          ) : null}

          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{group.groupName}</p>
              </div>
              <Button type="button" onClick={() => handleJoin(group.id)}>
                Join
              </Button>
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
