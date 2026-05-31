"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateMyGroupStake } from "@/lib/api/stakes";
import { StakeAdding, StakeDTO } from "@/lib/types/stake";

type StakeFormProps = {
  onAdded: (stake: StakeDTO) => void;
};

export default function StakeForm({ onAdded }: StakeFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StakeAdding>();

  async function onSubmit(data: StakeAdding) {
    try {
      setSubmitting(true);
      setErrorMessage(null);
      onAdded(await updateMyGroupStake(data));
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Could not update your group's stake.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group stake</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Raise the stakes and stick to your goals!</p>
          <Input
            placeholder="Stake description"
            aria-invalid={Boolean(errors.description)}
            {...register("description", { required: true })}
          />
          <Button type="submit" disabled={submitting}>
            Save stake
          </Button>
        </form>

        {errorMessage ? <p className="mt-3 text-sm text-red-400">{errorMessage}</p> : null}
      </CardContent>
    </Card>
  );
}
