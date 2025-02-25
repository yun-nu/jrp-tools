import { updateEmailAction } from "../profile/actions";
import { EmailAndConfirmationForm } from "./EmailAndConfirmationForm";

export function UpdateEmail() {
  return (
    <div>
      <h1></h1>
      Please note that you will have to visit the links sent to both new and old
      emails for the change to take effect.
      <EmailAndConfirmationForm
        action={updateEmailAction}
        isUpdate
        btnDescription="Update email"
      />
    </div>
  );
}
