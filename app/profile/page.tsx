import DeleteAccount from "../_components/DeleteAccount";
import { Button } from "../_components/ui/Button";
import { UpdateEmail } from "../_components/UpdateEmail";
import { getUserId } from "../_lib/data-service";

export default async function Page() {
  const userId = await getUserId();

  return (
    <div className="grid h-full gap-2">
      <h1>Change your email address</h1>
      <span>Currently logged in as: </span>
      <UpdateEmail />

      <DeleteAccount />
    </div>
  );
}
