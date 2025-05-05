import { Book, BookCheck } from "lucide-react";
import { ExistingCharacter } from "../_schemas/Character";
import { ExistingThread } from "../_schemas/Thread";
import { exportThreadsToCSV } from "../_utils/export";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

type ThreadMenuOptionsProps = {
  ongoingThreads: ExistingThread[];
  finishedThreads: ExistingThread[];
  characterDisplayName: ExistingCharacter["displayName"];
};

export default function ThreadMenuOptions({
  ongoingThreads,
  finishedThreads,
  characterDisplayName,
}: ThreadMenuOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Export</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() =>
            exportThreadsToCSV(
              [...ongoingThreads, ...finishedThreads],
              "ongoing",
              characterDisplayName
            )
          }
        >
          <button className="flex gap-2">
            <Book /> Ongoing threads
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            exportThreadsToCSV(
              [...ongoingThreads, ...finishedThreads],
              "finished",
              characterDisplayName
            )
          }
        >
          <button className="flex gap-2">
            <BookCheck /> Finished threads
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
