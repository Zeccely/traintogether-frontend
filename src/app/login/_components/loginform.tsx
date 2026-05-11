"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api/auth";
import { LoginInput } from "@/lib/types/user";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const router = useRouter();
  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      console.log("Logged in!");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Log In</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Input placeholder="Username" {...register("username")} />
            <Input placeholder="Password" type="password" {...register("passwordInput")} />

            <Button type="submit">Log in</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
