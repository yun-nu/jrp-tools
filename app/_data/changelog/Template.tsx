import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/Card";
import { ReactNode } from "react";

type HeadingProps = {
  number: string;
  title: string;
};

function Heading({ number, title }: HeadingProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-6 rounded rounded-b-none bg-card border-t border-x">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Update #{number}
      </h1>
      <h2 className="text-lg">{title}</h2>
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 p-6 rounded rounded-t-none bg-card border">
      {children}
    </div>
  );
}

export default function Update({
  number,
  title,
  children,
}: HeadingProps & { children: ReactNode }) {
  return (
    <article className="max-w-screen-md">
      <Heading number={number} title={title} />
      <Content>{children}</Content>
    </article>
  );
}
