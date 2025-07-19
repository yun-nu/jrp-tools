import { format } from "date-fns";
import { ExistingThread } from "../_schemas/Thread";

export function exportThreadsToCSV(
  threads: ExistingThread[],
  status: ExistingThread["status"],
  displayName: string
) {
  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const header = `Character: ${displayName} - ${capitalizedStatus} threads\n\n`;

  const threadData = threads
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((row) => {
      return [
        `Date: ${String(row.date).split("T")[0]}`,
        `Type: ${row.type}`,
        `Blurb: ${row.blurb}`,
        `Characters: ${row.threadPartner}`,
        `Comments: ${row.commentCount}`,
        `Used for AC: ${row.usedForAc ? "Yes" : "No"}`,
        `URL: ${row.url ? row.url : "N/A"}`,
        "",
        "----------------------------------------------------------------",
      ].join("\n");
    })
    .join("\n\n");

  const csvContent = "data:text/csv;charset=utf-8," + header + threadData;

  const fileName =
    displayName + `-${status}-threads-` + format(new Date(), "yyyy-MM-dd");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName + ".csv");

  document.body.appendChild(link);
  link.click();
}
