import DeleteAccount from "../_components/DeleteAccount";
import { UpdateEmail } from "../_components/UpdateEmail";
import { AuthActionHelper } from "../_lib/actionsAuth";

export default async function Page() {
  //const { user } = await AuthActionHelper();

  return (
    <div className="grid h-full gap-2">
      <h1>Change your email address</h1>
      <span>Currently logged in as: </span>
      <UpdateEmail />

      <DeleteAccount />
    </div>
  );
}
