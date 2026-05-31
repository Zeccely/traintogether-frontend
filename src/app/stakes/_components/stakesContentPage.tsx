"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";
import { getMyGroup } from "@/lib/api/groups";
import { getMyGroupStake } from "@/lib/api/stakes";
import { StakeDTO } from "@/lib/types/stake";
import MyStake from "./myStake";
import StakeForm from "./stakeForm";

export default function StakesContent() {
  const [stake, setStake] = useState<StakeDTO | null>(null);
  const [groupName, setGroupName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStake() {
      try {
        const [myStake, myGroup] = await Promise.all([getMyGroupStake(), getMyGroup()]);
        setStake(myStake);
        setGroupName(myGroup?.groupName ?? null);
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

    loadStake();
  }, []);

  if (isLoading) {
    return <Loading label="Loading stake" />;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (stake?.description) {
    return <MyStake stake={stake} groupName={groupName} />;
  }

  return <StakeForm onAdded={setStake} />;
}
