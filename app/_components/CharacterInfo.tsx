import Image from "next/image";
import { Character } from "../_schemas/Character";

import { FaAt } from "react-icons/fa6";
import { LuGoal } from "react-icons/lu";
import { MdPublic } from "react-icons/md";
import { RiHomeHeartLine } from "react-icons/ri";
import StyledLink from "./StyledLink";

export default function CharacterInfo({
  character,
  isPublicPage,
}: {
  character: Character;
  isPublicPage: boolean;
}) {
  const {
    displayName,
    characterName,
    blurb,
    acLink,
    gameName,
    journalName,
    journalLink,
    isPublic,
    icon,
  } = character || {};

  return (
    <div className="space-y-4 flex-1 border rounded p-4 xs:p-6 bg-muted/70">
      <div className="flex gap-4 text-sm">
        {icon && (
          <Image
            src={icon}
            width={100}
            height={100}
            className="rounded max-w-[100px] max-h-[100px] border border-muted-foreground"
            alt="Character Icon"
          />
        )}
        <div className="flex flex-col gap-2 justify-center">
          <span className="block text-3xl font-semibold">{characterName}</span>
          {journalLink && (
            <StyledLink
              href={journalLink}
              className="flex items-center gap-2 underline underline-offset-4"
            >
              <FaAt /> {journalName || "Journal"}
            </StyledLink>
          )}
          {isPublic && !isPublicPage && (
            <>
              <StyledLink type="new-window" href={`/characters/${displayName}`}>
                <MdPublic /> {characterName}&apos;s public page
              </StyledLink>
            </>
          )}
        </div>
      </div>

      {blurb && (
        <div className="text-sm rounded px-4 py-6 border border-muted-foreground whitespace-pre-wrap">
          {blurb}
        </div>
      )}

      <div className="text-sm">
        <div className="flex flex-col gap-2">
          {gameName && (
            <div className="flex gap-2 items-center">
              <RiHomeHeartLine /> Played at: {gameName}
            </div>
          )}

          {!isPublicPage && acLink && (
            <a
              href={acLink ? acLink : "#"}
              className="flex items-center gap-2 underline underline-offset-4"
            >
              <LuGoal /> AC page
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
