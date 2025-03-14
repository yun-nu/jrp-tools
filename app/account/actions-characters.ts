"use server";

import { clientAndUserHelper } from "../_lib/action-auth-helpers";
import { createClient } from "../_lib/supabase-server";
import { Character, characterSchema } from "../_schemas/Character";
import { ActionResult } from "../_utils/action-return";

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
  const { userId, supabase } = await clientAndUserHelper();

  const newCharacter: Character = {
    userId: userId,
    ...characterData,
  };

  const parsed = characterSchema.safeParse(newCharacter);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { data: parsedCharacterData } = parsed;

  const { error } = await supabase
    .from("characters")
    .insert(parsedCharacterData)
    .select();

  if (error?.code === "23505") {
    return { error: "This display name is already taken." };
  }

  if (error) return { error: "Could not add new character" };

  return {
    success: "Character created successfully",
    displayName: parsedCharacterData.displayName,
  };
}

export async function editCharacterAction(
  characterData: Character,
  characterId: number
) {
  const parsed = characterSchema.safeParse(characterData);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { data: parsedCharacterData } = parsed;
  const { userId, supabase } = await clientAndUserHelper();

  if (userId === parsedCharacterData.userId) {
    const { error } = await supabase
      .from("characters")
      .update(parsedCharacterData)
      .eq("id", characterId);

    if (error) return { error: "Could not edit character" };

    return {
      success: "Character edited successfully",
      displayName: parsedCharacterData.displayName,
    };
  }

  return { error: "Unauthorized" };
}

export async function deleteCharacterAction({
  userId: characterUserId,
  id: characterId,
}: Pick<Character, "userId" | "id">) {
  const { userId, supabase } = await clientAndUserHelper();

  if (userId === characterUserId) {
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", characterId);
    if (error) {
      return { error: "Could not delete character." };
    }

    return {
      success: "Character deleted successfully",
    };
  }

  return { error: "Unauthorized" };
}
