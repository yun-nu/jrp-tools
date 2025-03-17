import Image from "next/image";
import Link from "next/link";
import { MdOutlineContactPage } from "react-icons/md";
import { RiHomeHeartLine } from "react-icons/ri";
import { Character } from "../_schemas/Character";
import DeleteCharacter from "./DeleteCharacter";
import EditCharacter from "./EditCharacter";
import { Badge } from "./ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";

export function CharacterListCard({ character }: { character: Character }) {
  const { displayName, characterName, gameName, isPublic, journalName, icon } =
    character || {};

  return (
    <Card className={"sm:w-[380px] min-h-[235px] flex flex-col"}>
      <CardHeader className="flex flex-row gap-3 space-y-0">
        {icon && (
          <Image
            width={50}
            height={50}
            src={icon}
            alt="Icon"
            className="rounded max-w-[50px] max-h-[50px] border"
          />
        )}
        <div className="flex justify-between flex-1 items-center">
          <div className="flex flex-col">
            <CardTitle>{characterName}</CardTitle>
            <CardDescription>@ {displayName}</CardDescription>
          </div>
          {isPublic ? (
            <Link
              href={`/characters/${displayName}`}
              title={`${characterName}'s public page`}
              target="_blank"
            >
              <Badge className="h-[22px]" variant={"default"}>
                Public
              </Badge>
            </Link>
          ) : (
            <Badge variant={"secondary"}>Private</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 flex-1">
        <div className="text-sm flex flex-col gap-2">
          {journalName ? (
            <div className="flex gap-2 items-center">
              {" "}
              <MdOutlineContactPage /> Journal: {journalName}{" "}
            </div>
          ) : null}
          {gameName ? (
            <div className="flex gap-2 items-center">
              <RiHomeHeartLine /> Played at: {gameName}
            </div>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Link
          href={`/account/characters/${displayName}`}
          className="px-4 py-2 text-sm border border-secondary-foreground bg-secondary rounded hover:bg-secondary/50 font-semibold w-[50%] text-center"
          title={`${characterName}'s threads page`}
        >
          Thread tracker
        </Link>

        <div className="flex gap-2">
          <EditCharacter character={character} />
          <DeleteCharacter character={character} />
        </div>
      </CardFooter>
    </Card>
  );
}
