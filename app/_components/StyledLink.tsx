import Link from "next/link";
import React from "react";

export default function StyledLink({
  href,
  children,
  className,
  type = "new-window",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  type?: "new-window" | "self";
}) {
  return (
    <Link
      href={href}
      className={`underline underline-offset-4 inline-flex gap-2 items-center w-fit ${className}`}
      target={type === "new-window" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      prefetch={false}
    >
      {children}
    </Link>
  );
}
