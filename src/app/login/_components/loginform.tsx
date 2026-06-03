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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoginError(null);
      await login(data);
      router.replace("/dashboard");
      router.refresh();
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
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Input
              placeholder="Username"
              aria-invalid={Boolean(errors.username)}
              aria-describedby={errors.username ? "username-error" : undefined}
              {...register("username", { required: "Username is required." })}
            />
            {errors.username?.message ? (
              <p id="username-error" className="text-sm text-destructive">
                {errors.username.message}
              </p>
            ) : null}
            <Input
              placeholder="Password"
              type="password"
              aria-invalid={Boolean(errors.passwordInput)}
              aria-describedby={errors.passwordInput ? "password-error" : undefined}
              {...register("passwordInput", { required: "Password is required." })}
            />
            {errors.passwordInput?.message ? (
              <p id="password-error" className="text-sm text-destructive">
                {errors.passwordInput.message}
              </p>
            ) : null}

            {loginError && <p className="text-sm text-red-500">{loginError}</p>}

            <Button type="submit">Log in</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
