"use client";

import SubmitButton from "../_components/SubmitButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Login error</h2>
      <p>{error.message}</p>
      <SubmitButton
        type="button"
        onClick={() => reset()}
        content="Refresh page"
      />
    </main>
  );
}
