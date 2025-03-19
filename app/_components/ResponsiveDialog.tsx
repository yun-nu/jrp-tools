import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/Drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Separator } from "./ui/Separator";

export interface DialogComponentProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  trigger?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}

export function DesktopDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: DialogComponentProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="lg:p-8 sm:max-w-[50dvw] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function MobileDrawer({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: DialogComponentProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DrawerContent className="max-h-[80vh]">
        <div className="p-4 overflow-y-auto">
          <DrawerHeader className="text-left px-0 py-6">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
