"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { useAuth } from "../_providers/AuthProvider";

export default function SignUpButton() {
  const { user, isLoading } = useAuth();

  if (user || isLoading) return null;

  return (
    <Button
      asChild
      variant="link"
      size="lg"
      className="border-2 border-foreground text-lg font-semibold"
    >
      <Link href="/signup" prefetch={false}>
        Sign up
      </Link>
    </Button>
  );
}
