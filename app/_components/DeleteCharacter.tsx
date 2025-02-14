"use client";
import { BsFillPersonDashFill } from "react-icons/bs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import SubmitButton from "./SubmitButton";
import { deleteCharacterAction } from "../dashboard/actions";

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export default function DeleteCharacter({
  character,
}: {
  character: Character;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
          <BsFillPersonDashFill />
          <span>Delete this character</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete character</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this character? This action cannot
            be undone!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <SubmitButton
            type="button"
            onClick={() => deleteCharacterAction(character)}
            content="Delete character"
          ></SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
