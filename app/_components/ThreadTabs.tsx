"use client";

import { threadsCols } from "@/app/_components/Columns";
import DataTable from "@/app/_components/DataTable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/Tabs";
import { ExistingThread } from "@/app/_schemas/Thread";
import { ExistingCharacter } from "../_schemas/Character";
import ThreadDialog from "./ThreadDialog";
import ThreadMenuOptions from "./ThreadMenuOptions";
import { Separator } from "./ui/Separator";

type ThreadTabsProps = {
  threads: ExistingThread[];
  characterId?: ExistingCharacter["id"];
  characterDisplayName: ExistingCharacter["displayName"];
  showTableActions: boolean;
  acLength: ExistingCharacter["acLength"];
};

const STATUS_LABELS = [
  { value: "ongoing", label: "Ongoing" },
  { value: "finished", label: "Finished" },
  { value: "dropped", label: "Dropped" },
  { value: "ooc", label: "OOC" },
];

export default function ThreadTabs({
  threads,
  characterId,
  characterDisplayName,
  showTableActions,
  acLength,
}: ThreadTabsProps) {
  const threadsByStatus = {
    ongoing: threads.filter((thread) => thread.status === "ongoing"),
    finished: threads.filter((thread) => thread.status === "finished"),
    dropped: threads.filter((thread) => thread.status === "dropped"),
    ooc: threads.filter((thread) => thread.status === "ooc"),
  };

  const columnsForTab = (tab: string) => {
    const columns = threadsCols(showTableActions);
    if (tab === "ooc") {
      return columns.filter(
        (col) =>
          "id" in col || // "actions" column uses id
          ("accessorKey" in col && col.accessorKey !== "usedForAc")
      );
    }

    return columns;
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center 2xl:max-w-[85%] gap-y-8 w-full">
      {showTableActions && characterId && (
        <div className="flex w-full xs:flex-row sm:w-fit items-center gap-4">
          <ThreadDialog characterId={characterId} mode="add" />
          <ThreadMenuOptions
            characterDisplayName={characterDisplayName}
            ongoingThreads={threadsByStatus.ongoing}
            finishedThreads={threadsByStatus.finished}
            droppedThreads={threadsByStatus.dropped}
            oocThreads={threadsByStatus.ooc}
          />
        </div>
      )}

      <Separator />

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="grid md:max-w-[70%] m-auto grid-cols-2 grid-rows-2 xs:grid-cols-4 xs:grid-rows-1 h-fit xs:h-10">
          {STATUS_LABELS.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              <h2>{label}</h2>
            </TabsTrigger>
          ))}
        </TabsList>

        {STATUS_LABELS.map(({ value }) => (
          <TabsContent value={value} key={value}>
            <DataTable
              columns={columnsForTab(value)}
              data={threadsByStatus[value as keyof typeof threadsByStatus]}
              showActions={showTableActions}
              acLength={acLength}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
