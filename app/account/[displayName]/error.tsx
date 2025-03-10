"use client";

import Link from "next/link";

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  return (
    <>
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <Link
        href={"/account"}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Return to user area
      </Link>
    </>
  );
}
