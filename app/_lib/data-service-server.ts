import { Character, ExistingCharacter } from "../_schemas/Character";
import { getUserId } from "./auth";
import { createClient } from "./supabase-server";

interface CharacterPageData {
  character: ExistingCharacter;
  isOwner: boolean;
}

type CharacterPageResult = CharacterPageData | { error: string } | null;

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

export async function getCharacterMetadata(
  displayName: string
): Promise<
  { displayName: ExistingCharacter["displayName"] } | { error: string }
> {
  const supabase = await createClient();
  const { data: characterMetadata, error } = await supabase
    .from("characters")
    .select("displayName")
    .eq("displayName", displayName)
    .single();

  if (error) return { error: "Character not found" };

  return characterMetadata;
}

export async function getCharacterPageData(
  displayName: Character["displayName"],
  pageType: "management" | "public"
): Promise<CharacterPageResult> {
  let currentUser;

  if (pageType === "management") {
    currentUser = await getUserId();
  } else {
    currentUser = null;
  }

  const character = await getCharacterData(displayName);
  if (!character || "error" in character) {
    return null;
  }
  const isOwner = Boolean(currentUser) && currentUser === character.userId;

  return {
    character,
    isOwner,
  };
}
