"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { joinGroup } from "@/lib/api/groups";
import { GroupDTO, GroupJoin } from "@/lib/types/group";

type GroupJoinCardProps = {
  onJoined: (group: GroupDTO) => void;
};

export default function GroupJoinCard({ onJoined }: GroupJoinCardProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupJoin>();

  async function onSubmit(data: GroupJoin) {
    try {
      const joinedGroup = await joinGroup(data.groupId);
      onJoined(joinedGroup);
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a group</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            placeholder="Group ID"
            type="number"
            aria-invalid={Boolean(errors.groupId)}
            {...register("groupId", { required: true, valueAsNumber: true })}
          />
          <Button type="submit">Join group</Button>
        </form>
      </CardContent>
    </Card>
  );
}
