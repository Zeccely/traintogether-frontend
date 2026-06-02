"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StakeDTO } from "@/lib/types/stake";
import { PencilLine } from "lucide-react";
import StakeForm from "./stakeForm";

type MyStakeProps = {
  stake: StakeDTO;
  groupName: string | null;
  onSaved: (stake: StakeDTO) => void;
};

export default function MyStake({ stake, groupName, onSaved }: MyStakeProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{groupName ? `${groupName}'s Stake` : "Group Stake"}</CardTitle>
          <CardAction>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Edit stake"
              onClick={() => setIsEditing(true)}
            >
              <PencilLine />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{stake.description}</p>
        </CardContent>
      </Card>
      {isEditing ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit stake"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="w-full max-w-sm">
            <StakeForm
              initialDescription={stake.description ?? ""}
              onCancel={() => setIsEditing(false)}
              onSaved={(updatedStake) => {
                onSaved(updatedStake);
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
