"use client";

import { useCharacters } from "../_hooks/characters/useCharacters";
import { useAuth } from "../_providers/AuthProvider";
import { CharacterListCard } from "./CharacterListCard";
import LoadingCards from "./LoadingCards";
import MessageBox from "./MessageBox";

export default function CharacterList() {
  const { user, isLoading: userLoading } = useAuth();

  const {
    characters,
    error,
    isLoading: charactersLoading,
  } = useCharacters(user?.id ?? "");

  if (charactersLoading || userLoading) return <LoadingCards />;

  if (!user) return;

  if (!Array.isArray(characters) || error)
    return <MessageBox>{error?.message}</MessageBox>;

  if (!characters.length)
    return (
      <p className="text-center">
        It feels lonely with no muses around... why don&apos;t you start by
        adding your first character?
      </p>
    );

  return (
    <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
      {characters
        ?.sort((a, b) => b.id! - a.id!)
        .map((character) => (
          <CharacterListCard
            key={character.displayName}
            character={character}
          />
        ))}
    </div>
  );
}
