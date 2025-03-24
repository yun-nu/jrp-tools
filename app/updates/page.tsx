import { Metadata } from "next";
import { Update01 } from "../_data/changelog/Update01";

export const metadata: Metadata = {
  title: "Updates",
};

export default async function Page() {
  return <section className="h-full">{/* <Update01 /> */}</section>;
}
