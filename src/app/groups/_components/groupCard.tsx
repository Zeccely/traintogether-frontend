"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { getMyGroup } from "@/lib/api/groups";
import { GroupDTO } from "@/lib/types/group";
import GroupCreateCard from "./groupCreateCard";
import GroupJoinCard from "./groupJoinCard";
import MyGroupCard from "./myGroupCard";
import { getMyGoal } from "@/lib/api/goals";
import { Goal } from "@/lib/types/goal";
import CreateGoalActionCard from "@/components/shared/createGoalActionCard";

export default function GroupCard() {
  const [loading, setLoading] = useState(true);
  const [myGroup, setMyGroup] = useState<GroupDTO | null>(null);
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  function handleGroupChanged(group: GroupDTO) {
    setMyGroup(group);
    setErrorMessage(null);
  }

  useEffect(() => {
    Promise.all([getMyGroup(), getMyGoal()])
      .then(([loadedGroup, loadedGoal]) => {
        setMyGroup(loadedGroup);
        setGoal(loadedGoal);
      })
      .catch((error: unknown) => {
        console.error(error);
        setLoadErrorMessage(
          error instanceof Error && error.message
            ? error.message
            : "Could not load your group. Please try again.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Bad pattern (kept here as an explanation):
  // async function checkMyGroup() {
  //   try {
  //     const [loadedGroup, loadedGoal] = await Promise.all([getMyGroup(), getMyGoal()]);
  //     setMyGroup(loadedGroup);
  //     setGoal(loadedGoal);
  //   } catch (error) {
  //     console.error(error);
  //     setLoadErrorMessage(
  //       error instanceof Error && error.message
  //         ? error.message
  //         : "Could not load your group. Please try again.",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  //
  // useEffect(() => {
  //   setLoading(true);
  //   setLoadErrorMessage(null);
  //   checkMyGroup();
  // }, []);
  //
  // State updates such as setLoading(true) run synchronously when the effect starts.
  // That creates another render immediately after the initial render, even though
  // loading is already true and the error is already null. This unnecessary
  // render cascade is why resetting state this way inside an effect is bad practice.
  // The state updates inside checkMyGroup happen after await and are reasonable at
  // runtime. However, calling this state-changing helper directly from the effect
  // hides that timing from static analysis, so the lint rule conservatively rejects
  // the whole call. The active version above places the updates visibly inside
  // Promise callbacks, making it clear they run only after the API promises settle.

  if (loading) {
    return <Loading label="Loading group" />;
  }

  if (loadErrorMessage) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Group</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{loadErrorMessage}</p>
        </CardContent>
      </Card>
    );
  }

  if (myGroup) {
    return <MyGroupCard group={myGroup} onLeft={() => setMyGroup(null)} hasGoal={goal !== null} />; //making the goal into true
  }

  if (!goal) {
    return <CreateGoalActionCard />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {errorMessage ? (
        <p className="md:col-span-2 text-sm text-destructive">{errorMessage}</p>
      ) : null}

      <GroupCreateCard onCreated={handleGroupChanged} onError={setErrorMessage} />
      <GroupJoinCard onJoined={handleGroupChanged} />
    </div>
  );
}
