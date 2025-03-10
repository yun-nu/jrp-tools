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

type ThreadTabsProps = {
  ongoingThreads: Thread[];
  finishedThreads: Thread[];
  showActions?: boolean;
};

export default function ThreadTabs({
  ongoingThreads,
  finishedThreads,
  showActions,
}: ThreadTabsProps) {
  return (
    <Tabs defaultValue="ongoing" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ongoing" className="bg-slate-100">
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
  );
}
