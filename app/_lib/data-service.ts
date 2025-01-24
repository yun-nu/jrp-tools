import { revalidatePath } from "next/cache";
import { supabase } from "./supabase-client";

export async function getCharacters() {
  const { data: characters, error } = await supabase
    .from("characters")
    .select("*");

  // revalidatePath("/dashboard");
  return characters as Character[];
}

export async function getThreads(characterId: number) {
  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId);
  console.log(threads);
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
