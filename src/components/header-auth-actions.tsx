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
        className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </Button>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1"
      >
        Sign Up
      </Link>
    </>
  );
}
