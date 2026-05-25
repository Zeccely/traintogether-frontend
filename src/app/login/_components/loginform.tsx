"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth/auth";
import { LoginInput } from "@/lib/types/user";
import { useState } from "react";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoginError(null);
      await login(data);
      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      setLoginError("Login failed. Check your username and password.");
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

            {loginError && <p className="text-sm text-red-500">{loginError}</p>}

            <Button type="submit">Log in</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
