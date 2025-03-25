"use client";

import StyledLink from "./_components/StyledLink";

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <StyledLink type="self" href="/">
        Return to main page
      </StyledLink>
    </div>
  );
}
