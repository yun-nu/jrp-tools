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
import { Separator } from "./ui/Separator";

type ThreadTabsProps = {
  ongoingThreads: ExistingThread[];
  finishedThreads: ExistingThread[];
  characterId?: ExistingCharacter["id"];
  showTableActions?: boolean;
};

export default function ThreadTabs({
  ongoingThreads,
  finishedThreads,
  characterId,
  showTableActions: showActions,
}: ThreadTabsProps) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center lg:max-w-[80%] gap-y-8 w-full">
      {showActions && characterId && (
        <ThreadDialog characterId={characterId} mode="add" />
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
            columns={threadsCols}
            data={ongoingThreads}
            showActions={showActions}
          />
        </TabsContent>
        <TabsContent value="finished">
          <DataTable
            columns={threadsCols}
            data={finishedThreads}
            showActions={showActions}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
