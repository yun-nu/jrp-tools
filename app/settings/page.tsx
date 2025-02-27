import DeleteAccount from "../_components/DeleteAccount";
import { UpdateEmail } from "../_components/UpdateEmail";
import { getUserEmail } from "../_lib/action-auth-helpers";

export default async function Page() {
  const email = await getUserEmail();

  return (
    <div className="grid h-full gap-2">
      <UpdateEmail currentEmail={email} />

      <DeleteAccount />
    </div>
  );
}
