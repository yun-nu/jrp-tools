import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/Tooltip";

export default function TooltipWrapper({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={700}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
