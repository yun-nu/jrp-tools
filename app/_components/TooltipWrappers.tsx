import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/Tooltip";

type TooltipWrapperProps = {
  text: string;
  children?: ReactNode;
  side?: "bottom" | "top";
};

type TooltipWrapperButtonProps = TooltipWrapperProps & {
  icon: LucideIcon;
  onClick: () => void;
};

export function TooltipWrapper({
  text,
  children,
  side = "bottom",
}: TooltipWrapperProps) {
  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={700}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function TooltipWrapperButton({
  icon: Icon,
  onClick,
  text,
  side,
}: TooltipWrapperButtonProps) {
  return (
    <TooltipWrapper text={text} side={side}>
      <Button onClick={onClick} variant={"outline"} className="w-fit">
        <Icon className="cursor-pointer hover:text-muted-foreground transition-colors" />
      </Button>
    </TooltipWrapper>
  );
}
