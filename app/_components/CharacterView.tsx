import { Character, ExistingCharacter } from "../_schemas/Character";
import { ExistingThread } from "../_schemas/Thread";
import CharacterHeader from "./CharacterHeader";
import ThreadTabs from "./ThreadTabs";

interface CharacterViewProps {
  character: Character | ExistingCharacter;
  ongoingThreads: ExistingThread[];
  finishedThreads: ExistingThread[];
  isPublicPage?: boolean;
  showTableActions?: boolean;
  characterId?: number;
}

export default function CharacterView({
  character,
  ongoingThreads,
  finishedThreads,
  isPublicPage = false,
  showTableActions = false,
  characterId = undefined,
}: CharacterViewProps) {
  return (
    <section className="w-full h-full flex flex-col items-center">
      <CharacterHeader character={character} isPublicPage={isPublicPage} />

      <ThreadTabs
        ongoingThreads={ongoingThreads}
        finishedThreads={finishedThreads}
        showTableActions={showTableActions}
        characterId={characterId}
      />
    </section>
  );
}
