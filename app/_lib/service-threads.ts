import { toDate } from "date-fns";
import { ExistingCharacter } from "../_schemas/Character";
import {
  ExistingThread,
  existingThreadSchema,
  NewThread,
  newThreadSchema,
} from "../_schemas/Thread";
import { RequestResult } from "../_utils/return";
import { createClient } from "./supabase-client";

export async function getThreads(
  characterId: ExistingCharacter["id"]
): Promise<ExistingThread[] | Error> {
  const supabase = createClient();

  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId);

  if (error) throw new Error("Could not fetch threads.");

  return threads;
}

export async function addThread(threadData: NewThread): Promise<RequestResult> {
  const parsed = newThreadSchema.safeParse(threadData);

  if (!parsed.success) {
    throw new Error("Invalid input data");
  }

  const { data: parsedThreadData } = parsed;
  const supabase = createClient();

  const { error } = await supabase
    .from("threads")
    .insert(parsedThreadData)
    .select();

  if (error) throw new Error("Could not add new thread");

  return {
    success: "Thread added successfully",
  };
}

export async function editThread(
  thread: ExistingThread
): Promise<RequestResult> {
  const parsed = existingThreadSchema.safeParse(thread);

  if (!parsed.success) {
    throw new Error("Invalid input data");
  }

  const { data: parsedThreadData } = parsed;

  const supabase = await createClient();

  const { error } = await supabase
    .from("threads")
    .update(parsedThreadData)
    .eq("id", parsedThreadData.id);

  if (error) throw new Error("Could not edit thread");

  return {
    success: "Thread edited successfully",
  };
}

export async function deleteThread(
  threadId: ExistingThread["id"]
): Promise<RequestResult> {
  const supabase = createClient();

  const { error } = await supabase.from("threads").delete().eq("id", threadId);

  if (error) throw new Error("Could not delete thread");

  return {
    success: "Thread deleted successfully",
  };
}

export async function toggleThreadFinished(
  thread: ExistingThread
): Promise<RequestResult> {
  const statusToggledThread = {
    ...thread,
    isFinished: !thread.isFinished,
  };

  const supabase = createClient();

  const { error } = await supabase
    .from("threads")
    .update(statusToggledThread)
    .eq("id", thread.id);
  if (error) throw new Error("Could not change thread status");

  return {
    success: "Thread status changed successfully",
  };
}

export async function duplicateThread(
  thread: ExistingThread
): Promise<RequestResult> {
  const duplicatedThread = {
    ...thread,
    id: undefined,
    date: toDate(thread.date),
  };

  const result = await addThread(duplicatedThread);
  if ("success" in result)
    return {
      success: "Thread duplicated successfully",
    };

  throw new Error("Could not duplicate thread");
}

export async function updateCommentCount(
  threadId: ExistingThread["id"],
  updatedCount: ExistingThread["commentCount"]
): Promise<RequestResult> {
  if (updatedCount < 0) throw new Error("Comment count cannot be negative");

  const supabase = createClient();

  const { error } = await supabase
    .from("threads")
    .update({ commentCount: updatedCount })
    .eq("id", threadId);

  if (error) throw new Error("Could not update comment count");

  return {
    success: "Comment count updated successfully",
  };
}
