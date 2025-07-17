"use client";

import { useThreads } from "../_hooks/threads/useThreads";
import { CharacterProvider } from "../_providers/CharacterProvider";
import { ExistingCharacter } from "../_schemas/Character";
import CharacterHeader from "./CharacterHeader";
import LoadingDots from "./LoadingDots";
import MessageBox from "./MessageBox";
import ThreadTabs from "./ThreadTabs";

interface CharacterViewProps {
  character: ExistingCharacter;
  isPublicPage?: boolean;
  showTableActions?: boolean;
}

export default function CharacterView({
  character,
  isPublicPage = false,
  showTableActions = false,
}: CharacterViewProps) {
  const { threads, isLoading, error } = useThreads(character.id);

  if (isLoading) return <LoadingDots text="Loading threads" />;
  if (error || !threads || !Array.isArray(threads))
    return <MessageBox>{error?.message}</MessageBox>;

  return (
    <section className="w-full h-full flex flex-col items-center">
      <CharacterHeader character={character} isPublicPage={isPublicPage} />

      <CharacterProvider
        character={character}
        isPublicPage={isPublicPage}
        showTableActions={showTableActions}
      >
        <ThreadTabs threads={threads} showTableActions={showTableActions} />
      </CharacterProvider>
    </section>
  );
}
