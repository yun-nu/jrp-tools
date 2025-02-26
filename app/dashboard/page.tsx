import { ContactForm } from "../_components/ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/Accordion";
import { Update01 } from "../_data/updates/Update01";

export const revalidate = 60;

export default async function Page() {
  return (
    <div className="max-w-[80%]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Update 01: th ??</AccordionTrigger>
          <AccordionContent>
            <Update01 />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ContactForm />
    </div>
  );
}
