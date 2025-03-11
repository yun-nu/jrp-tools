import { PiSignOutBold } from "react-icons/pi";
import { signOutAction } from "../login/actions";
import { Button } from "./ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/Tooltip";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              className="w-full font-semibold text-base border border-destructive"
            >
              <PiSignOutBold />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Sign out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
