import React from "react";
import { Character } from "../_schemas/Character";
import Image from "next/image";

import { FaAt } from "react-icons/fa6";
import { LuGoal } from "react-icons/lu";
import { MdPublic } from "react-icons/md";
import { RiHomeHeartLine } from "react-icons/ri";
import Link from "next/link";
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
    <div className="space-y-4 flex-1 border rounded p-6">
      <div className="flex gap-4 text-sm">
        {icon && (
          <Image
            src={icon}
            width={100}
            height={100}
            className="rounded max-w-[100px] max-h-[100px] border"
            alt="Character Icon"
          />
        )}
        <div className="flex flex-col gap-2 justify-center">
          <span className="block text-3xl font-semibold">{characterName}</span>
          {journalLink && (
            <Link
              href={journalLink}
              className="flex items-center gap-2 underline underline-offset-4"
            >
              <FaAt /> {journalName || "Journal"}
            </Link>
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

      {blurb && <div className="text-sm rounded px-4 py-6 border">{blurb}</div>}

      <div className="text-sm">
        <div className="flex flex-col gap-2">
          {gameName && (
            <div className="flex gap-2 items-center">
              <RiHomeHeartLine /> Played at: {gameName}
            </div>
          )}
          {acLink && (
            <Link
              href={acLink ? acLink : "#"}
              className="flex items-center gap-2 underline underline-offset-4"
            >
              <LuGoal /> AC page
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
