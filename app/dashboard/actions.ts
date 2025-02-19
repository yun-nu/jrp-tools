"use server";
import { revalidatePath } from "next/cache";
import { AuthActionHelper } from "../_lib/actions";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase-server";
import { Character, characterSchema } from "../_schemas/Character";

export async function addCharacterAction(characterData: Character) {
  const { user, supabase } = await AuthActionHelper();

  const newCharacter: Partial<Character> = {
    user_id: user,
    displayName: characterData.displayName.replaceAll(" ", ""),
    characterName: characterData.characterName,
    gameName: characterData.gameName,
    acLink: characterData.acLink,
    isPublic: characterData.isPublic,
    journalName: characterData.journalName.replaceAll(" ", ""),
    journalLink: characterData.journalLink,
  };

  const parsed = characterSchema.safeParse(newCharacter);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase
    .from("characters")
    .insert([newCharacter])
    .select();

  if (error?.code === "23505") {
    return { error: "This display name is already taken." };
  }

  if (error) return { error: "Could not add new character" };

  return {
    success: "Character created successfully",
    displayName: newCharacter.displayName,
  };
}

export async function deleteCharacterAction({
  user_id: userId,
  id: characterId,
}: Pick<Character, "user_id" | "id">) {
  const { user, supabase } = await AuthActionHelper();

  if (user === userId) {
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", characterId);

    if (error) {
      throw new Error("Could not delete character.");
    }
  }

  redirect(`/dashboard`);
}

export async function verifyDisplayNameAvailability(displayName: string) {
  // if (!displayName.length)
  //   return { taken: true, message: "Display name can't be empty." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("characters")
    .select("displayName")
    .eq("displayName", displayName);

  if (error) return { error: "Could not perform this action." };

  if (!data?.length) {
    return { taken: false };
  } else return { taken: true };
}
