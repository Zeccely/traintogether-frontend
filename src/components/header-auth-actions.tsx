"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth";

type HeaderAuthActionsProps = {
  isLoggedIn: boolean;
};

export default function HeaderAuthActions({ isLoggedIn }: HeaderAuthActionsProps) {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
    router.refresh();
  }

  if (isLoggedIn) {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1"
      >
        Logout
      </button>
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
