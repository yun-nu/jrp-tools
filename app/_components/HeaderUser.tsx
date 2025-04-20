"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { useAuth } from "../_providers/AuthProvider";
import { Button } from "./ui/Button";
import { Skeleton } from "./ui/Skeleton";

export default function HeaderUser() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Skeleton className="ml-auto h-4 w-36" />;

  if (!user)
    return (
      <Button asChild size="sm" className="font-semibold md:ml-auto">
        <Link href="/login" prefetch={false}>
          <PiSignInBold /> Log in
        </Link>
      </Button>
    );

  return (
    <div className="md:ml-auto flex md:flex-1 sm:justify-between items-center">
      <Link
        href="/account/characters"
        className="flex flex-col text-xs sm:flex-row sm:text-sm ml-auto gap-2 items-center hover:text-primary/80 transition-colors font-semibold"
        title="Your account"
        prefetch={false}
      >
        <User className="w-5 h-5 sm:w-6 sm:h-6" /> {user.email}
      </Link>
    </div>
  );
}
