export type ActionResult =
  | { error: string }
  | { message: string; errors: Record<string, string[]> }
  | { success: string; displayName?: string };

export function RequestError(result: ActionResult): result is {
  error: string;
  errors: string;
  message: string;
} {
  return "error" in result;
}

export function RequestSuccess(result: ActionResult): result is {
  success: string;
  displayName?: string;
} {
  return "success" in result;
}
