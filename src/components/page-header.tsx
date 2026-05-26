import Link from "next/link";
import { cookies } from "next/headers";
import HeaderAuthActions from "./header-auth-actions";

const navigationLinks = [
  { href: "/groups", label: "Groups" },
  { href: "/goals", label: "Goals" },
  { href: "/stakes", label: "Stakes" },
  { href: "/profile", label: "Profile" },
];

export default async function PageHeader() {
  const isLoggedIn = (await cookies()).has("ACCESS");

  return (
    <header className="flex h-[74px] items-center justify-between border-b border-border bg-background px-6">
      <div className="flex min-w-0 flex-1">
        <Link href="/dashboard"> Super Cool TT Logo </Link>
      </div>

      <nav className="flex items-center justify-center gap-10">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex h-[74px] items-center border-b-2 border-transparent px-1"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-8">
        <HeaderAuthActions key={isLoggedIn ? "logged-in" : "logged-out"} isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
