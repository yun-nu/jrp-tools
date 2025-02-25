"use server";

import { AuthActionHelper } from "../_lib/actions";
import { createClient } from "../_lib/supabase-server";
import { Character, characterSchema } from "../_schemas/Character";
import { ActionResult } from "../_utils/actionReturn";

export async function verifyDisplayNameAvailability(
  displayName: string,
  prevDisplayName: string | undefined
) {
  if (displayName === prevDisplayName) return { taken: false };

  if (!displayName.length)
    return { taken: true, error: "Display name can't be empty." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("characters")
    .select("displayName")
    .eq("displayName", displayName);

  if (error) return { error: "Could not perform this action." };

  if (!data?.length) {
    return { taken: false };
  } else return { taken: true, error: "This display name is already taken." };
}

export async function addCharacterAction(
  characterData: Character
): Promise<ActionResult> {
  const { user, supabase } = await AuthActionHelper();

  const newCharacter: Partial<Character> = {
    userId: user,
    displayName: characterData.displayName.replaceAll(" ", ""),
    characterName: characterData.characterName,
    characterBlurb: characterData.characterBlurb,
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

export async function editCharacterAction(
  characterData: Character,
  characterId: number
) {
  const { user, supabase } = await AuthActionHelper();

  const parsed = characterSchema.safeParse(characterData);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (user === characterData.userId) {
    const { error } = await supabase
      .from("characters")
      .update(characterData)
      .eq("id", characterId);

    if (error) return { error: "Could not edit character" };

    return {
      success: "Character edited successfully",
      displayName: characterData.displayName,
    };
  }

  return { error: "An unknown error occurred" };
}

export async function deleteCharacterAction({
  userId: userId,
  id: characterId,
}: Pick<Character, "userId" | "id">) {
  const { user, supabase } = await AuthActionHelper();

  if (user === userId) {
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", characterId);
    console.log(error);
    if (error) {
      return { error: "Could not delete character." };
    }

    return {
      success: "Character deleted successfully",
    };
  }

  return { error: "An unknown error occurred" };
}
