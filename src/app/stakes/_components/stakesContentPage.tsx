"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";
import { getMyGroup } from "@/lib/api/groups";
import { getMyGroupStake } from "@/lib/api/stakes";
import { StakeDTO } from "@/lib/types/stake";
import { GroupDTO } from "@/lib/types/group";
import MyStake from "./myStake";
import StakeForm from "./stakeForm";
import JoinGroupActionCard from "@/components/shared/joinGroupActionCard";
import LoadFailRetryCard from "@/components/shared/loadFailRetryCard";

export default function StakesContent() {
  const [stake, setStake] = useState<StakeDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [group, setGroup] = useState<GroupDTO | null>(null);

  async function loadStake() {
    try {
      setIsLoading(true); //retry also shows the spinner
      setErrorMessage(null);
      const [myStake, myGroup] = await Promise.all([getMyGroupStake(), getMyGroup()]);
      setStake(myStake);
      setGroup(myGroup);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Could not load your group's stake.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Promise.all([getMyGroupStake(), getMyGroup()])
      .then(([myStake, myGroup]) => {
        setStake(myStake);
        setGroup(myGroup);
      })
      .catch((error: unknown) => {
        console.error(error);
        setErrorMessage(
          error instanceof Error && error.message
            ? error.message
            : "Could not load your group's stake.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading label="Loading stake" />;
  }

  if (errorMessage) {
    return <LoadFailRetryCard message={errorMessage} onRetry={loadStake} />;
  }

  if (stake?.description) {
    // group?.groupName → optional chain: returns undefined if group is null instead of throwing
    // ?? null → converts that undefined to null to match the expected string | null type
    return <MyStake stake={stake} groupName={group?.groupName ?? null} onSaved={setStake} />;
  }

  if (!group) {
    return <JoinGroupActionCard />;
  }

  return <StakeForm onSaved={setStake} />;
}
