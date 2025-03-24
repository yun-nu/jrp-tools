import { clientAndUserHelper } from "../_lib/action-auth-helpers";
import {
  getCharacterData,
  getFinishedThreads,
  getOngoingThreads,
} from "../_lib/data-service";
import {
  Character,
  ExistingCharacter,
  isExistingCharacter,
} from "../_schemas/Character";
import { Thread } from "../_schemas/Thread";

interface CharacterPageData {
  character: ExistingCharacter;
  ongoingThreads: Thread[];
  finishedThreads: Thread[];
  isOwner: boolean;
}

export type CharacterPageResult = CharacterPageData | { error: string } | null;

export async function getCharacterPageData(
  displayName: Character["displayName"]
): Promise<CharacterPageResult> {
  const { userId: currentUser } = await clientAndUserHelper();
  const character = await getCharacterData(displayName);

  if (!character || "error" in character || !isExistingCharacter(character)) {
    return { error: "Character not found." };
  }

  const isOwner = Boolean(currentUser) && currentUser === character.userId;

  if (!isOwner || (!isOwner && !character.isPublic)) {
    return { error: "Unauthorized." };
  }

  const [ongoingThreads, finishedThreads] = await Promise.all([
    getOngoingThreads(character.id),
    getFinishedThreads(character.id),
  ]);

  if ("error" in ongoingThreads || "error" in finishedThreads) {
    return { error: "Failed to load character data" };
  }

  return {
    isOwner,
    character,
    ongoingThreads,
    finishedThreads,
  };
}
