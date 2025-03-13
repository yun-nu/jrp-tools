import Link from "next/link";
import React from "react";

export default function StyledLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="underline underline-offset-4 inline-flex gap-2 items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
