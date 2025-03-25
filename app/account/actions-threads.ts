"use server";

import { toDate } from "date-fns";
import { createClient } from "../_lib/supabase-server";
import {
  ExistingThread,
  existingThreadSchema,
  NewThread,
  newThreadSchema,
} from "../_schemas/Thread";
import { ActionResult } from "../_utils/action-return";

export async function addThreadAction(
  threadData: NewThread
): Promise<ActionResult> {
  const parsed = newThreadSchema.safeParse(threadData);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { data: parsedThreadData } = parsed;
  const supabase = await createClient();

  const { error } = await supabase
    .from("threads")
    .insert(parsedThreadData)
    .select();

  if (error) return { error: "Could not add new thread" };

  return {
    success: "Thread added successfully",
  };
}

export async function editThreadAction(
  threadData: ExistingThread,
  threadId: ExistingThread["id"]
): Promise<ActionResult> {
  const parsed = existingThreadSchema.safeParse(threadData);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { data: parsedThreadData } = parsed;

  const supabase = await createClient();

  const { error } = await supabase
    .from("threads")
    .update(parsedThreadData)
    .eq("id", threadId);

  if (error) return { error: "Could not edit thread" };

  return {
    success: "Thread edited successfully",
  };
}

export async function deleteThreadAction(
  threadId: ExistingThread["id"]
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("threads").delete().eq("id", threadId);

  if (error) return { error: "Could not delete thread" };

  return {
    success: "Thread deleted successfully",
  };
}

export async function toggleIsFinishedAction(
  thread: ExistingThread
): Promise<ActionResult> {
  const statusToggledThread = {
    ...thread,
    isFinished: !thread.isFinished,
  };

  const supabase = await createClient();

  const { error } = await supabase
    .from("threads")
    .update(statusToggledThread)
    .eq("id", thread.id);
  if (error) return { error: "Could not change thread status" };

  return {
    success: "Thread status changed successfully",
  };
}

export async function duplicateThreadAction(
  thread: ExistingThread
): Promise<ActionResult> {
  const duplicatedThread = {
    ...thread,
    id: undefined,
    date: toDate(thread.date),
  };

  const result = await addThreadAction(duplicatedThread);
  if ("success" in result)
    return {
      success: "Thread duplicated successfully",
    };

  return { error: "Could not duplicate thread" };
}
