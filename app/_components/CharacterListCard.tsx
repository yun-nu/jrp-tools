import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineContactPage } from "react-icons/md";
import { Character } from "../_schemas/Character";
import { Badge } from "./ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { RiHomeHeartLine } from "react-icons/ri";

export function CharacterListCard({ character }: { character: Character }) {
  const { displayName, characterName, gameName, isPublic, journalName, icon } =
    character || {};

  return (
    <Link href={`/account/${displayName}`}>
      <Card className={cn("w-[380px]")}>
        <CardHeader className="flex flex-row gap-2 space-y-0">
          {icon && (
            <Image
              width={50}
              height={50}
              src={icon}
              alt="Icon"
              className="rounded max-w-[50px] max-h-[50px]"
            />
          )}
          <div className="flex justify-between flex-1 items-center">
            <div className="flex flex-col">
              <CardTitle>{characterName}</CardTitle>
              <CardDescription>@ {displayName}</CardDescription>
            </div>
            {isPublic ? (
              <Badge className="h-[22px]" variant={"default"}>
                Public
              </Badge>
            ) : (
              <Badge variant={"gray"}>Private</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
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
      </Card>
    </Link>
  );
}
