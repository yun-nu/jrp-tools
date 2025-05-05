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
  ongoingThreads: ExistingThread[];
  finishedThreads: ExistingThread[];
  characterId?: ExistingCharacter["id"];
  characterDisplayName: ExistingCharacter["displayName"];
  showTableActions: boolean;
  acLength: ExistingCharacter["acLength"];
};

export default function ThreadTabs({
  ongoingThreads,
  finishedThreads,
  characterId,
  characterDisplayName,
  showTableActions,
  acLength,
}: ThreadTabsProps) {
  const columns = threadsCols(showTableActions);

  return (
    <div className="mt-8 flex flex-col items-center justify-center 2xl:max-w-[85%]  gap-y-8 w-full">
      {showTableActions && characterId && (
        <div className="flex w-full xs:flex-row sm:w-fit items-center gap-4">
          <ThreadDialog characterId={characterId} mode="add" />
          <ThreadMenuOptions
            characterDisplayName={characterDisplayName}
            ongoingThreads={ongoingThreads}
            finishedThreads={finishedThreads}
          />
        </div>
      )}

      <Separator />

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="grid md:max-w-[50%] m-auto grid-cols-2">
          <TabsTrigger value="ongoing">
            <h2>Ongoing</h2>
          </TabsTrigger>
          <TabsTrigger value="finished">
            <h2>Finished</h2>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <DataTable
            columns={columns}
            data={ongoingThreads}
            showActions={showTableActions}
            acLength={acLength}
          />
        </TabsContent>
        <TabsContent value="finished">
          <DataTable
            columns={columns}
            data={finishedThreads}
            showActions={showTableActions}
            acLength={acLength}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
