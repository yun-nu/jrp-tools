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
    <TooltipProvider delayDuration={300} skipDelayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
