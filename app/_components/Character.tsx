import Link from "next/link";
import { MdOutlineOpenInNew, MdPublic } from "react-icons/md";
import { Character as SCharacter } from "../_schemas/Character";

export default function Character({ character }: { character: SCharacter }) {
  if (!character) return null;
  const {
    displayName,
    characterName,
    acLink,
    gameName,
    journalName,
    journalLink,
    isPublic,
  } = character;

  return (
    <div className="space-y-4 max-w-[80%]">
      <span className="block text-3xl font-semibold">{characterName}</span>{" "}
      {isPublic && (
        <Link href={`/${displayName}`}>
          <MdPublic />
          {characterName}&apos;s public page
        </Link>
      )}
      <div className="text-base">
        {journalLink && (
          <Link href={journalLink} className="flex items-center gap-2">
            {journalName || "Journal"} <MdOutlineOpenInNew />
          </Link>
        )}
        <div className="flex gap-4">
          {gameName && <span className="block">Game: {gameName}</span>}
          {/*  /// This is glitching fsr */}
          {acLink && (
            <Link href={acLink} className="flex items-center gap-2">
              {"AC page"} <MdOutlineOpenInNew />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
