"use client";
import { useState } from "react";
import { Character } from "../_schemas/Character";
import CharacterInfo from "./CharacterInfo";
import { Button } from "./ui/Button";

export default function CharacterHeader({
  character,
}: {
  character: Character;
}) {
  const [showHeader, setShowHeader] = useState(true);

  if (!character) return null;

  return (
    <div className="flex flex-col max-w-[80%]">
      <Button
        size="sm"
        variant="secondary"
        className={`text-xs ml-auto h-6 ${showHeader ? "rounded-b-none" : ""}`}
        onClick={() => setShowHeader(!showHeader)}
      >
        {showHeader ? "Close character info" : "Expand character info"}
      </Button>
      {showHeader && <CharacterInfo character={character} />}
    </div>
  );
}
