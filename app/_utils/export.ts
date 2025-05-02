import { format } from "date-fns";
import { ExistingThread } from "../_schemas/Thread";

export function exportThreadsToCSV(
  threads: ExistingThread[],
  displayName: string
) {
  // Character: ${displayName}\n
  const csvContent =
    "data:text/csv;charset=utf-8," +
    //threads.map((row) => Object.values(row).join(",")).join("\n");
    threads
      .filter((row) => !row.isFinished)
      .map((row) => {
        return `
        Date: ${String(row.date).split("T")[0]}
        Type: ${row.type}
        Blurb: ${row.blurb}
        Characters: ${row.threadPartner}
        URL:${row.url} 
        Used for AC: ${row.usedForAc ? "Yes" : "No"}\n`;
      });

  const fileName =
    displayName + "-" + format(new Date(), "yyyy-MM-dd") + "-threads.csv";

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);

  document.body.appendChild(link); // Required for Firefox
  link.click();

  //console.log(csvContent);
  console.log(encodedUri);
  console.log(fileName);
}
