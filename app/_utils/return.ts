export type RequestResult =
  | { error: string }
  | { message: string; errors: Record<string, string[]> }
  | { success: string; displayName?: string }
  | Error;

export function RequestError(
  result: RequestResult
): result is { error: string } | Error {
  return (
    (typeof result === "object" && result !== null && "error" in result) ||
    result instanceof Error
  );
}

export function RequestSuccess(
  result: RequestResult
): result is { success: string } {
  return typeof result === "object" && result !== null && "success" in result;
}
