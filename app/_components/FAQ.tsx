import { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";

type FAQItem = {
  id: string;
  icon: ReactNode;
  title: string;
  content: ReactNode;
};

type Props = {
  items: FAQItem[];
  className?: string;
};

export default function FAQ({
  items,
  className = "w-full h-full max-w-screen-md",
}: Props) {
  return (
    <Accordion type="single" collapsible className={className}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              {item.icon} {item.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
