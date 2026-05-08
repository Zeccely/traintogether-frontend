"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser } from "./../../../lib/api/users";
import { UserCreation } from "@/lib/types/user";

//const [name, setName] = useState("");

// useEffect(() => {
//    code here
//    }, []);

export default function SignUpForm() {
  const [submittedUser, setSubmittedUser] = useState<UserCreation | null>(null);
  const { register, handleSubmit } = useForm<UserCreation>();
  const onSubmit = (data: UserCreation) => {
    setSubmittedUser(data);
  };

  useEffect(() => {
    if (submittedUser === null) {
      return;
    }
    const userToSubmit = submittedUser;
    async function submitUser() {
      try {
        const createdUser = await createUser(userToSubmit); //this created user becomes the object the backend sent back!
      } catch (error) {
        console.log(error);
      }
    }

    submitUser();
  }, [submittedUser]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <h2 className="text-center">Log In</h2>
        <Input placeholder="Username" {...register("username")} />
        <Input placeholder="Password" type="password" {...register("passwordInput")} />
        <Input placeholder="What do you want to be called?" {...register("desiredName")} />

        <Button type="submit"> Sign Up </Button>
      </form>
    </div>
  );
}
