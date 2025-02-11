import Link from "next/link";
import { MdOutlineOpenInNew } from "react-icons/md";

export default function Character({ character }: { character: Character }) {
  if (!character) return null;
  const { name, acLink, game, journalName, journalLink } = character;

  return (
    <div className="space-y-4 max-w-[80%]">
      <span className="block text-3xl font-semibold">{name}</span>
      <div className="text-base">
        {journalLink && (
          <Link href={journalLink} className="flex items-center gap-2">
            {journalName} <MdOutlineOpenInNew />
          </Link>
        )}
        <div className="flex gap-4">
          {game && <span className="block">Game: {game}</span>}
          {acLink && (
            <Link href={acLink} className="flex items-center gap-2">
              Link to AC
              <MdOutlineOpenInNew />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
