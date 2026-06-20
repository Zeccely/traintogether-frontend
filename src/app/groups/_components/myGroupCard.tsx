"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import ConfirmationWindow from "@/components/shared/confirmation-window";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyGroupUsers, leaveGroup, subscribeToGroupChanges } from "@/lib/api/groups";
import { playJoinSound } from "@/lib/audio/play-join-sound";
import { GroupDTO, GroupUserDTO } from "@/lib/types/group";

type MyGroupCardProps = {
  group: GroupDTO;
  onLeft: () => void;
};

export default function MyGroupCard({ group, onLeft }: MyGroupCardProps) {
  const [teammates, setTeammates] = useState<GroupUserDTO[]>([]);
  const [loadingTeammates, setLoadingTeammates] = useState(true);
  const [isConfirmingLeave, setIsConfirmingLeave] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getMyGroupUsers()
      .then(setTeammates)
      .catch((error: unknown) => {
        console.error(error);
        setErrorMessage(
          error instanceof Error && error.message ? error.message : "Could not load teammates.",
        );
      })
      .finally(() => {
        setLoadingTeammates(false);
      });

    return subscribeToGroupChanges((event) => {
      if (event.groupId === group.id) {
        if (event.type === "JOINED") {
          void playJoinSound();
        }

        setLoadingTeammates(true);
        setErrorMessage(null);
        getMyGroupUsers()
          .then(setTeammates)
          .catch((error: unknown) => {
            console.error(error);
            setErrorMessage(
              error instanceof Error && error.message
                ? error.message
                : "Could not load teammates.",
            );
          })
          .finally(() => {
            setLoadingTeammates(false);
          });
      }
    });
  }, [group.id]);

  async function handleLeave() {
    try {
      setIsLeaving(true);
      setErrorMessage(null);
      await leaveGroup();
      onLeft();
    } catch (error) {
      console.error(error);
      setIsConfirmingLeave(false);
      setErrorMessage(
        error instanceof Error && error.message ? error.message : "Could not leave the group.",
      );
    } finally {
      setIsLeaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.groupName}</CardTitle>
        <CardAction>
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            aria-label="Leave group"
            onClick={() => setIsConfirmingLeave(true)}
          >
            <LogOut />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Teammates</h3>

          {!loadingTeammates && teammates.length === 0 ? (
            <p className="text-sm text-muted-foreground">No teammates yet.</p>
          ) : null}

          {teammates.map((teammate) => (
            <div key={teammate.username} className="rounded-md border border-border p-3">
              <p className="font-medium">{teammate.name}</p>
              <p className="text-sm text-muted-foreground">{teammate.username}</p>
            </div>
          ))}
        </div>

        {errorMessage ? <p className="mt-3 text-sm text-destructive">{errorMessage}</p> : null}
      </CardContent>
      <ConfirmationWindow
        isOpen={isConfirmingLeave}
        title="Leave group?"
        message={`Are you sure you want to leave ${group.groupName}?`}
        isPending={isLeaving}
        confirmLabel="Leave"
        onCancel={() => setIsConfirmingLeave(false)}
        onConfirm={handleLeave}
      />
    </Card>
  );
}
