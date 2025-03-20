"use client";

import Link from "next/link";

interface Props {
  error: Error;
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-xl font-semibold">
        Something went wrong while trying to fetch threads.
      </h1>
      <Link
        href={"/account/characters"}
        className="underline underline-offset-4"
      >
        Return to character list
      </Link>
    </div>
  );
}
