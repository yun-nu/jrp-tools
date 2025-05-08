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
import { da } from "date-fns/locale";

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

export async function toggleThreadStatus(
  thread: ExistingThread,
  drop: boolean
): Promise<RequestResult> {
  let statusToggledThread = thread;

  if (drop) {
    statusToggledThread = {
      ...thread,
      status: thread.status === "dropped" ? "ongoing" : "dropped",
    };
  } else {
    statusToggledThread = {
      ...thread,
      status: thread.status === "ongoing" ? "finished" : "ongoing",
    };
  }

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

export async function toggleThreadDropped(
  thread: ExistingThread
): Promise<RequestResult> {
  const statusToggledThread = {
    ...thread,
    status: thread.status === "dropped" ? "ongoing" : "dropped",
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

export async function updateCurrentCommentCount(
  threadId: ExistingThread["id"],
  updatedCount: ExistingThread["commentCount"]
): Promise<RequestResult> {
  if (updatedCount < 0) throw new Error("Comment count cannot be negative");

  const supabase = createClient();

  const { error } = await supabase.rpc("update_comment_counts", {
    thread_id: threadId,
    new_comment_count: updatedCount,
  });

  if (error) throw new Error("Could not update comment count");

  return {
    success: "Current month comment count updated successfully",
  };
}

export async function updateTotalCommentCount(
  threadId: ExistingThread["id"],
  updatedCount: ExistingThread["commentCount"]
): Promise<RequestResult> {
  if (updatedCount < 0) throw new Error("Comment count cannot be negative");

  const supabase = createClient();

  const { error } = await supabase
    .from("threads")
    .update({ totalCommentCount: updatedCount })
    .eq("id", threadId);

  if (error) throw new Error("Could not update comment count");

  return {
    success: "Total comment count updated successfully",
  };
}

export async function toggleUsedForAc(
  threadId: ExistingThread["id"],
  updatedState: boolean
): Promise<RequestResult> {
  const supabase = createClient();

  const { error } = await supabase
    .from("threads")
    .update({ usedForAc: updatedState })
    .eq("id", threadId);

  if (error) throw new Error("Could not toggle thread state");

  return {
    success: "Thread checked as used for AC",
  };
}
