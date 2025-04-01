import { ExistingCharacter } from "../_schemas/Character";
import { ExistingThread } from "../_schemas/Thread";
import CharacterHeader from "./CharacterHeader";
import ThreadTabs from "./ThreadTabs";

interface CharacterViewProps {
  character: ExistingCharacter;
  ongoingThreads: ExistingThread[];
  finishedThreads: ExistingThread[];
  isPublicPage?: boolean;
  showTableActions?: boolean;
}

export default function CharacterView({
  character,
  ongoingThreads,
  finishedThreads,
  isPublicPage = false,
  showTableActions = false,
}: CharacterViewProps) {
  return (
    <section className="w-full h-full flex flex-col items-center">
      <CharacterHeader character={character} isPublicPage={isPublicPage} />

      <ThreadTabs
        ongoingThreads={ongoingThreads}
        finishedThreads={finishedThreads}
        showTableActions={showTableActions}
        characterId={character.id}
      />
    </section>
  );
}
