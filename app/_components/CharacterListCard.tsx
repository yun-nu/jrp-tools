import Image from "next/image";
import Link from "next/link";
import { MdOutlineContactPage } from "react-icons/md";
import { RiHomeHeartLine } from "react-icons/ri";
import { ExistingCharacter } from "../_schemas/Character";
import CharacterDialog from "./CharacterDialog";
import DeleteCharacter from "./DeleteCharacter";
import { Badge } from "./ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";

export function CharacterListCard({
  character,
}: {
  character: ExistingCharacter;
}) {
  const { displayName, characterName, gameName, isPublic, journalName, icon } =
    character || {};

  return (
    <Card
      className={
        "xs:w-[380px] min-h-[210px] xs:min-h-[236px] flex flex-col w-full"
      }
    >
      <CardHeader className="p-4 xs:p-6 flex flex-row gap-3 space-y-0 items-center">
        {icon && (
          <Image
            width={50}
            height={50}
            src={icon}
            alt="Icon"
            className="rounded max-w-[50px] max-h-[50px] border border-muted-foreground"
          />
        )}
        <div className="flex justify-between flex-1 items-center">
          <div className="flex flex-col gap-1">
            <CardTitle className="break-words">{characterName}</CardTitle>
            <CardDescription>@ {displayName}</CardDescription>
          </div>
          {isPublic ? (
            <Link
              href={`/characters/${displayName}`}
              title={`${characterName}'s public page`}
              target="_blank"
              prefetch={false}
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
      <CardContent className="p-4 pt-0 xs:p-6 xs:pt-0 grid gap-4 flex-1">
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
      <CardFooter className="p-4 pt-0 xs:p-6 xs:pt-0 justify-between gap-4">
        <Link
          href={`/account/characters/${displayName}`}
          className="px-4 py-2 text-sm border border-secondary-foreground bg-secondary rounded hover:bg-secondary/50 font-semibold xs:w-[50%] text-center"
          title={`${characterName}'s threads page`}
          prefetch={false}
        >
          Thread tracker
        </Link>

        <div className="flex gap-2">
          <CharacterDialog character={character} mode="edit" />
          <DeleteCharacter character={character} />
        </div>
      </CardFooter>
    </Card>
  );
}
