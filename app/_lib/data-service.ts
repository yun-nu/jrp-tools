import { User } from "@supabase/supabase-js";
import { Character, ExistingCharacter } from "../_schemas/Character";
import { ExistingThread } from "../_schemas/Thread";
import { createClient } from "./supabase-server";
import { getUserId } from "./actions-user";

interface CharacterPageData {
  character: ExistingCharacter;
  isOwner: boolean;
  ongoingThreads: ExistingThread[];
  finishedThreads: ExistingThread[];
}

type CharacterPageResult = CharacterPageData | { error: string } | null;

export async function getCharacters(
  userId: User["id"]
): Promise<ExistingCharacter[] | { error: string }> {
  const supabase = await createClient();

  const { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .eq("userId", userId);

  if (error) return { error: "Could not fetch character list." };

  return characters;
}

export async function getThreads(
  characterId: ExistingCharacter["id"]
): Promise<ExistingThread[] | { error: string }> {
  const supabase = await createClient();

  const { data: threads, error } = await supabase
    .from("threads")
    .select("*")
    .eq("characterId", characterId);

  if (error) return { error: "Could not fetch threads." };

  return threads;
}

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

export async function getCharacterPageData(
  displayName: Character["displayName"]
): Promise<CharacterPageResult> {
  const { userId: currentUser } = await getUserId();
  const character = await getCharacterData(displayName);

  if (!character || "error" in character) {
    return null;
  }

  const isOwner = Boolean(currentUser) && currentUser === character.userId;

  const threads = await getThreads(character.id);

  if ("error" in threads) {
    return { error: "Could not load threads." };
  }

  const ongoingThreads = threads.filter((thread) => !thread.isFinished);
  const finishedThreads = threads.filter((thread) => thread.isFinished);

  return {
    character,
    isOwner,
    ongoingThreads,
    finishedThreads,
  };
}
