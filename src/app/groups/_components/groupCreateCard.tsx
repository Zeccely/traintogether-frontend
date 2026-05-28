"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createGroup } from "@/lib/api/groups";
import { GroupCreation, GroupDTO } from "@/lib/types/group";

type GroupCreateCardProps = {
  onCreated: (group: GroupDTO) => void;
  onError: (message: string) => void;
};

export default function GroupCreateCard({
  onCreated,
  onError,
}: GroupCreateCardProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupCreation>();

  async function onSubmit(data: GroupCreation) {
    try {
      const createdGroup = await createGroup(data);
      onCreated(createdGroup);
      reset();
    } catch (error) {
      console.error(error);
      onError(
        error instanceof Error && error.message
          ? error.message
          : "Could not create the group. Please try again.",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a group</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            placeholder="Group name"
            aria-invalid={Boolean(errors.groupName)}
            {...register("groupName", { required: true })}
          />
          <Button type="submit">Create group</Button>
        </form>
      </CardContent>
    </Card>
  );
}
