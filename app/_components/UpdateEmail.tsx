import { updateEmailAction } from "../settings/actions";
import { EmailAndConfirmationForm } from "./EmailAndConfirmationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";

export function UpdateEmail({ currentEmail }: { currentEmail: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update email</CardTitle>
        <CardDescription>
          Please note that you will have to visit the links sent to both new and
          old emails for the change to take effect.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        Current email: {currentEmail}
        <EmailAndConfirmationForm
          action={updateEmailAction}
          isUpdate
          btnDescription="Update email"
        />
      </CardContent>
    </Card>
  );
}
