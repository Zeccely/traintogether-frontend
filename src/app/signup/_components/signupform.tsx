"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <h2 className="text-center">Log In</h2>
        <Input placeholder="Username" {...register("username")} />
        <Input placeholder="Password" {...register("passwordinput")} />
        <Input placeholder="What do you want to be called?" {...register("desiredName")} />

        <Button type="submit"> Sign Up </Button>
      </form>
    </div>
  );
}
