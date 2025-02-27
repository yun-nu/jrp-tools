"use client";
import { useRouter } from "next/navigation";
import { BsFillPersonDashFill } from "react-icons/bs";
import { toast } from "../_hooks/useToast";
import { deleteUserAction } from "../settings/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/AlertDialog";
import { Button } from "./ui/Button";

export default function DeleteAccount() {
  const router = useRouter();

  const handleDeleteCharacter = async () => {
    const result = await deleteUserAction();
    if (result.error) {
      toast({
        description: result.error,
        variant: "destructive",
      });
      return;
    } else {
      toast({ description: result.success });
      router.push(`/dashboard`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <BsFillPersonDashFill />
          <span>Delete account</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account</AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              Are you absolutely sure you want to delete your account? All your
              data will be permanently erased.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            type="button"
            onClick={handleDeleteCharacter}
            className="bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
