import { ExistingCharacter } from "../_schemas/Character";
import { ExistingThread } from "../_schemas/Thread";
import { createClient } from "./supabase-client";

export async function getThreads(
  characterId: ExistingCharacter["id"]
): Promise<ExistingThread[] | Error> {
  const supabase = createClient();

  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId);

  if (error) throw Error("Could not fetch threads.");

  return threads;
}

export async function updateCommentCount(
  threadId: ExistingThread["id"],
  updatedCount: ExistingThread["commentCount"]
): Promise<{ success: string | Error }> {
  if (updatedCount < 0) throw Error("Comment count cannot be negative");

  const supabase = createClient();

  const { error } = await supabase
    .from("threads")
    .update({ commentCount: updatedCount })
    .eq("id", threadId);

  if (error) throw Error("Could not update comment count");

  return {
    success: "Comment count updated successfully",
  };
}
