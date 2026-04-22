"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GoalForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <h2 className="text-center">Make a Goal!</h2>
        <Input placeholder="Title" {...register("title")} />
        <Input placeholder="Description" {...register("description")} />
        <Input placeholder="Frequency Target" {...register("frequencyTarget")} />
        <Button type="submit"> Create Goal </Button>
      </form>
    </div>
  );
}
