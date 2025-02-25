import { ContactForm } from "../_components/ContactForm";
import Updates from "../_components/Updates";

export const revalidate = 60;

export default async function Page() {
  return (
    <div>
      <Updates />
      <ContactForm />
    </div>
  );
}
