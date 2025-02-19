import { revalidatePath } from "next/cache";
import { supabase } from "./supabase-client";
import { createClient } from "./supabase-server";
import { Character } from "../_schemas/Character";

export async function getUserId() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return error;

  return user?.id;
}

export async function getCharacters(userId: string) {
  const { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .eq("user_id", userId);
  // revalidatePath("/dashboard");
  return characters as Character[];
}

export async function getThreads(characterId: number) {
  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId);
  return threads as Threads[];
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
