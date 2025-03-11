import DeleteAccount from "@/app/_components/DeleteAccount";
import { EmailAndConfirmationForm } from "@/app/_components/EmailAndConfirmationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/Card";
import { updateEmailAction } from "./actions";

export default async function Page() {
  return (
    <div className="grid w-full max-w-screen-md gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Update email</CardTitle>
          <CardDescription>
            Please note that you will have to visit the links sent to both new
            and old emails for the change to take effect.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <EmailAndConfirmationForm
            action={updateEmailAction}
            isUpdate
            btnDescription="Update email"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete account</CardTitle>
          <CardDescription>
            If you&apos;d like to permanently close your account, you can do so
            by clicking the button below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <DeleteAccount />
        </CardContent>
      </Card>
    </div>
  );
}
