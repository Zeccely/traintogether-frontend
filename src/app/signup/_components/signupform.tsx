"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createUser } from "./../../../lib/api/users";
import { UserCreation } from "@/lib/types/user";

//const [name, setName] = useState("");

// useEffect(() => {
//    code here
//    }, []);

export default function SignUpForm() {
  const [submittedUser, setSubmittedUser] = useState<UserCreation | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreation>();
  const onSubmit = (data: UserCreation) => {
    setMessage(null);
    setSubmittedUser(data);
  };

  useEffect(() => {
    if (submittedUser === null) {
      return;
    }
    const userToSubmit = submittedUser;
    async function submitUser() {
      try {
        await createUser(userToSubmit);
        setMessage("User created!");
      } catch (error) {
        console.log(error);
        setMessage("Could not create user");
      }
    }

    submitUser();
  }, [submittedUser]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Input
              placeholder="Username"
              aria-invalid={Boolean(errors.username)}
              {...register("username", { required: true })}
            />
            <Input
              placeholder="Password"
              type="password"
              aria-invalid={Boolean(errors.passwordInput)}
              {...register("passwordInput", { required: true })}
            />
            <Input
              placeholder="What do you want to be called?"
              aria-invalid={Boolean(errors.desiredName)}
              {...register("desiredName", { required: true })}
            />

            {message && <p className="text-sm">{message}</p>}

            <Button type="submit"> Sign Up </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
