import { getUserId } from "../_lib/actions-user";
import {
  getCharacterData,
  getFinishedThreads,
  getOngoingThreads,
} from "../_lib/data-service";
import { Character, ExistingCharacter } from "../_schemas/Character";
import { ExistingThread } from "../_schemas/Thread";

interface CharacterPageData {
  character: ExistingCharacter;
  isOwner: boolean;
  ongoingThreads: ExistingThread[];
  finishedThreads: ExistingThread[];
}

type CharacterPageResult = CharacterPageData | { error: string } | null;

export async function getCharacterPageData(
  displayName: Character["displayName"]
): Promise<CharacterPageResult> {
  const { userId: currentUser } = await getUserId();
  const character = await getCharacterData(displayName);

  if (!character || "error" in character) {
    return null;
  }

  const isOwner = Boolean(currentUser) && currentUser === character.userId;

  const [ongoingThreads, finishedThreads] = await Promise.all([
    getOngoingThreads(character.id),
    getFinishedThreads(character.id),
  ]);

  if ("error" in ongoingThreads || "error" in finishedThreads) {
    return { error: "Could not load threads." };
  }

  return {
    character,
    isOwner,
    ongoingThreads,
    finishedThreads,
  };
}
