import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackToDashboardButton() {
  return (
    <Button asChild variant="outline" size="sm" className="self-start">
      <Link href="/dashboard">
        <ArrowLeft />
        Back to dashboard
      </Link>
    </Button>
  );
}
