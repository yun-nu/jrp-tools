import React from "react";
import { Character } from "../_schemas/Character";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import { CharacterListCard } from "./CharacterListCard";

export default function CharacterList({
  characters,
}: {
  characters: Character[];
}) {
  return (
    <div className="grid gap-6">
      {characters?.map((character) => (
        <CharacterListCard key={character.displayName} character={character} />
      ))}
    </div>
  );
}
