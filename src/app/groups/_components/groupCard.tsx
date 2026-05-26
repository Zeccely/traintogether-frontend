"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createGroup, getMyGroup } from "@/lib/api/groups";
import { GroupCreation, GroupDTO } from "@/lib/types/group";

export default function GroupCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupCreation>();
  const [loading, setLoading] = useState(true);
  const [myGroup, setMyGroup] = useState<GroupDTO | null>(null);

  useEffect(() => {
    checkMyGroup();
  }, []);

  async function checkMyGroup() {
    try {
      setLoading(true);
      setMyGroup(await getMyGroup());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: GroupCreation) {
    try {
      const createdGroup = await createGroup(data);
      setMyGroup(createdGroup);
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <div>Loading group...</div>;
  }

  if (myGroup) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{myGroup.groupName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Group ID: {myGroup.id}</p>
        </CardContent>
      </Card>
    );
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
