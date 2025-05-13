import { Book, BookCheck, Droplet, PersonStanding } from "lucide-react";
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
  droppedThreads: ExistingThread[];
  oocThreads: ExistingThread[];
  characterDisplayName: ExistingCharacter["displayName"];
};

export default function ThreadMenuOptions({
  ongoingThreads,
  finishedThreads,
  droppedThreads,
  oocThreads,
  characterDisplayName,
}: ThreadMenuOptionsProps) {
  const actions = [
    {
      label: "Ongoing threads",
      icon: <Book />,
      onClick: () =>
        exportThreadsToCSV(ongoingThreads, "ongoing", characterDisplayName),
    },
    {
      label: "Finished threads",
      icon: <BookCheck />,
      onClick: () =>
        exportThreadsToCSV(finishedThreads, "finished", characterDisplayName),
    },
    {
      label: "Dropped threads",
      icon: <Droplet />,
      onClick: () =>
        exportThreadsToCSV(droppedThreads, "dropped", characterDisplayName),
    },
    {
      label: "OOC threads",
      icon: <PersonStanding />,
      onClick: () =>
        exportThreadsToCSV(oocThreads, "ooc", characterDisplayName),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Export</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {actions.map(({ label, icon, onClick }) => (
          <DropdownMenuItem key={label} onClick={onClick}>
            <button className="flex gap-2">
              {icon} {label}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
