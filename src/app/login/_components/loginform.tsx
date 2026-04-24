"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
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
        <link></link>

        <Button type="submit"> Log in </Button>
      </form>
    </div>
  );
}
