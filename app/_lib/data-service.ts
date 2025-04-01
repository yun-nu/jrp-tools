import { User } from "@supabase/supabase-js";
import { ExistingCharacter } from "../_schemas/Character";
import { ExistingThread } from "../_schemas/Thread";
import { createClient } from "./supabase-server";

export async function getCharacters(
  userId: User["id"]
): Promise<ExistingCharacter[] | { error: string }> {
  const supabase = await createClient();

  const { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .eq("userId", userId);

  if (error) return { error: "Could not fetch character list." };

  return characters;
}

export async function getOngoingThreads(
  characterId: ExistingCharacter["id"]
): Promise<ExistingThread[] | { error: string }> {
  const supabase = await createClient();

  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId)
    .eq("isFinished", false);

  if (error) return { error: "Could not fetch ongoing threads." };

  return threads;
}

export async function getFinishedThreads(
  characterId: ExistingCharacter["id"]
): Promise<ExistingThread[] | { error: string }> {
  const supabase = await createClient();

  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId)
    .eq("isFinished", true);
  if (error) return { error: "Could not fetch finished threads." };

  return threads;
}

export async function getCharacterData(
  displayName: ExistingCharacter["displayName"]
): Promise<ExistingCharacter | { error: string }> {
  const supabase = await createClient();

  const { data: character, error } = await supabase
    .from("characters")
    .select("*")
    .eq("displayName", displayName)
    .single();

  if (error) {
    return { error: "Could not fetch character data." };
  }

  return character;
}
