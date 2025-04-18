import { User } from "@supabase/supabase-js";
import {
  ExistingCharacter,
  existingCharacterSchema,
  NewCharacter,
  newCharacterSchema,
} from "../_schemas/Character";
import { ActionResult } from "../_utils/action-return";
import { createClient } from "./supabase-client";

export async function getCharacters(
  userId: User["id"]
): Promise<ExistingCharacter[] | Error> {
  const supabase = createClient();

  const { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .eq("userId", userId);

  if (error) throw Error("Could not fetch character list.");

  return characters;
}

export async function getCharacter(
  displayName: ExistingCharacter["displayName"]
): Promise<ExistingCharacter | Error> {
  const supabase = createClient();

  const { data: character, error } = await supabase
    .from("characters")
    .select("*")
    .eq("displayName", displayName)
    .single();

  if (error) throw new Error("Could not fetch character data.");

  return character;
}

export async function addCharacter(
  characterData: Omit<NewCharacter, "userId">
): Promise<ActionResult> {
  const supabase = createClient();

  const userId = await supabase.auth
    .getUser()
    .then(({ data }) => data.user?.id);

  const newCharacter = {
    ...characterData,
    userId,
  };

  const parsed = newCharacterSchema.safeParse(newCharacter);

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
    throw new Error("This display name is already taken.");
  }

  if (error) throw new Error("Could not add new character.");

  return {
    success: "Character created successfully.",
  };
}

export async function editCharacter(
  characterData: ExistingCharacter
): Promise<ActionResult> {
  const parsed = existingCharacterSchema.safeParse(characterData);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { data: parsedCharacterData } = parsed;

  const supabase = await createClient();

  const { error } = await supabase
    .from("characters")
    .update(parsedCharacterData)
    .eq("id", parsedCharacterData.id);

  if (error?.code === "23505") {
    throw new Error("This display name is already taken.");
  }

  if (error) throw new Error("Could not edit character.");

  return {
    success: "Character edited successfully.",
  };
}

export async function deleteCharacter(characterId: ExistingCharacter["id"]) {
  const supabase = createClient();

  const { error } = await supabase
    .from("characters")
    .delete()
    .eq("id", characterId);

  if (error) throw new Error("Could not delete character.");

  return {
    success: "Character deleted successfully.",
  };
}
