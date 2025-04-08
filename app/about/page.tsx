import FAQ from "../_components/FAQ";
import { aboutFAQItems } from "./_lib/faq-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About JRP Tools",
  description: "The purpose and origin of JRP Tools",
};

export default async function Page() {
  return <FAQ items={aboutFAQItems} />;
}
