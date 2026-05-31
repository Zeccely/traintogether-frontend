"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { getMyGroup } from "@/lib/api/groups";
import { GroupDTO } from "@/lib/types/group";
import GroupCreateCard from "./groupCreateCard";
import GroupJoinCard from "./groupJoinCard";
import MyGroupCard from "./myGroupCard";

export default function GroupCard() {
  const [loading, setLoading] = useState(true);
  const [myGroup, setMyGroup] = useState<GroupDTO | null>(null);
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    checkMyGroup();
  }, []);

  async function checkMyGroup() {
    try {
      setLoading(true);
      setLoadErrorMessage(null);
      setErrorMessage(null);
      setMyGroup(await getMyGroup());
    } catch (error) {
      console.error(error);
      setLoadErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Could not load your group. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleGroupChanged(group: GroupDTO) {
    setMyGroup(group);
    setErrorMessage(null);
  }

  if (loading) {
    return <Loading label="Loading group" />;
  }

  if (myGroup) {
    return <MyGroupCard group={myGroup} />;
  }

  if (loadErrorMessage) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Group</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-400">{loadErrorMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {errorMessage ? <p className="md:col-span-2 text-sm text-red-400">{errorMessage}</p> : null}

      <GroupCreateCard onCreated={handleGroupChanged} onError={setErrorMessage} />
      <GroupJoinCard onJoined={handleGroupChanged} />
    </div>
  );
}
