"use client";

import { threadsCols } from "@/app/_components/Columns";
import DataTable from "@/app/_components/DataTable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/Tabs";
import { Thread } from "@/app/_schemas/Thread";
import { ExistingCharacter } from "../_schemas/Character";

type ThreadTabsProps = {
  ongoingThreads: Thread[];
  finishedThreads: Thread[];
  showActions?: boolean;
  characterId: ExistingCharacter["id"];
};

export default function ThreadTabs({
  ongoingThreads,
  finishedThreads,
  showActions,
  characterId,
}: ThreadTabsProps) {
  return (
    <div className="mt-12 flex justify-center max-w-[80%] gap-y-6 w-full">
      <Tabs defaultValue="ongoing" className="w-full min-w-[60%]">
        <TabsList className="grid max-w-[50%] m-auto grid-cols-2">
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
            characterId={characterId}
          />
        </TabsContent>
        <TabsContent value="finished">
          <DataTable
            columns={threadsCols}
            data={finishedThreads}
            showActions={showActions}
            characterId={characterId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
