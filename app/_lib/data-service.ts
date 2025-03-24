import { Character, ExistingCharacter } from "../_schemas/Character";
import { Thread } from "../_schemas/Thread";
import { supabase } from "./supabase-client";

export async function getCharacters(userId: string) {
  const { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .eq("userId", userId);

  if (error) return { error: "Could not fetch character list." };

  return characters as Character[];
}

export async function getOngoingThreads(
  characterId: number
): Promise<Thread[] | { error: string }> {
  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId)
    .eq("isFinished", false);

  if (error) return { error: "Could not fetch ongoing threads." };

  return threads as Thread[];
}

export async function getFinishedThreads(
  characterId: number
): Promise<Thread[] | { error: string }> {
  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId)
    .eq("isFinished", true);
  if (error) return { error: "Could not fetch finished threads." };

  return threads as Thread[];
}

export async function getCharacterData(
  displayName: string
): Promise<ExistingCharacter | { error: string }> {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("displayName", displayName)
    .single();

  if (error) {
    return { error: "Could not fetch character data." };
  }

  return data as ExistingCharacter;
}
