import { format } from "date-fns";
import { ExistingThread } from "../_schemas/Thread";

export function exportThreadsToCSV(
  threads: ExistingThread[],
  status: ExistingThread["status"],
  displayName: string
) {
  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    `Character: ${displayName} - ${capitalizedStatus} threads\n` +
    threads
      .map((row) => {
        return `
        Date: ${String(row.date).split("T")[0]}
        Type: ${row.type}
        Blurb: ${row.blurb}
        Characters: ${row.threadPartner}
        URL: ${row.url ? row.url : "N/A"} 
        Used for AC: ${row.usedForAc ? "Yes" : "No"}

        ----------------------------------------------------------------\n`;
      })
      .join("");

  const fileName =
    displayName + `-${status}-threads-` + format(new Date(), "yyyy-MM-dd");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName + ".csv");

  document.body.appendChild(link); // Required for max cross browser compatibility
  link.click();
}
