"use client";
import { useState } from "react";
import { Character as SCharacter } from "../_schemas/Character";
import CharacterInfo from "./CharacterInfo";
import { Button } from "./ui/Button";

export default function CharacterHeader({
  character,
}: {
  character: SCharacter;
}) {
  const [showHeader, setShowHeader] = useState(true);

  if (!character) return null;

  return (
    <div className="flex flex-col">
      <Button
        size="sm"
        variant="link"
        className="text-xs ml-auto h-6"
        onClick={() => setShowHeader(!showHeader)}
      >
        {showHeader ? "Close character info" : "Expand character info"}
      </Button>
      {showHeader && <CharacterInfo character={character} />}
    </div>
  );
}
