"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/auth/auth";
import { Button } from "./ui/button";

type HeaderAuthActionsProps = {
  isLoggedIn: boolean;
};

export default function HeaderAuthActions({ isLoggedIn }: HeaderAuthActionsProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await logout();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout", error);
      setIsLoggingOut(false);
    }
  }

  if (isLoggedIn) {
    return (
      <Button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="h-auto cursor-pointer rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground md:text-base disabled:cursor-not-allowed disabled:opacity-60"
      >
        Logout
      </Button>
    );
  }

  return (
    <>
      <Link href="/signup" className="flex h-10 items-center px-1 text-sm md:h-12 md:text-base">
        Sign Up
      </Link>
      <Link
        href="/login"
        className="flex items-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground md:text-base"
      >
        Login
      </Link>
    </>
  );
}
