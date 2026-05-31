"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalCreation } from "@/lib/types/goal";
import { createGoal } from "@/lib/api/goals";
import { useRouter } from "next/navigation";

export default function GoalForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalCreation>();
  const onSubmit = async (data: GoalCreation) => {
    try {
      setErrorMessage(null);
      await createGoal(data);
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error creating goal:", error);
      setErrorMessage(
        error instanceof Error && error.message ? error.message : "Could not create your goal.",
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Make a Goal to Achieve!</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Input
              placeholder="Title"
              aria-invalid={Boolean(errors.title)}
              {...register("title", { required: true })}
            />
            <Input
              placeholder="Description"
              aria-invalid={Boolean(errors.description)}
              {...register("description", { required: true })}
            />
            <Input
              placeholder="Frequency Target"
              type="number"
              min={1}
              aria-invalid={Boolean(errors.frequencyTarget)}
              {...register("frequencyTarget", {
                required: "Frequency target is required.",
                min: { value: 1, message: "Frequency target must be at least 1." },
                valueAsNumber: true,
              })}
            />
            {errors.frequencyTarget?.message ? (
              <p className="text-sm text-destructive">{errors.frequencyTarget.message}</p>
            ) : null}
            {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
            <Button type="submit"> Create Goal </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
