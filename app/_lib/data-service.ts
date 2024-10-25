import { supabase } from "./supabase-client";

export async function getCharacters() {
  const { data: characters, error } = await supabase
    .from("characters")
    .select("*");

  console.log(characters);
  return characters;
}
