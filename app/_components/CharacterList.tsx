"use client";

import { User } from "@supabase/supabase-js";
import { useCharacters } from "../_hooks/characters/useCharacters";
import { CharacterListCard } from "./CharacterListCard";
import MessageBox from "./MessageBox";
import LoadingCards from "./LoadingCards";

export default function CharacterList({ userId }: { userId: User["id"] }) {
  const { characters, error, isLoading } = useCharacters(userId);

  if (isLoading) return <LoadingCards />;

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
