import { Character } from "../_schemas/Character";
import { Thread } from "../_schemas/Thread";
import { supabase } from "./supabase-client";

export async function getCharacters(userId: string) {
  const { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .eq("userId", userId);
  return characters as Character[];
}

export async function getOngoingThreads(characterId: number) {
  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId)
    .eq("isFinished", false);
  return threads as Thread[];
}

export async function getFinishedThreads(characterId: number) {
  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId)
    .eq("isFinished", true);
  return threads as Thread[];
}

export async function getCharacterData(displayName: string) {
  // check session

  //console.log(displayName);
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("displayName", displayName)
    .single();

  //console.log(data);
  if (error) {
    throw new Error(error.message);
    //notFound();
  }

  // check if profile is public

  return data as Character;
}
