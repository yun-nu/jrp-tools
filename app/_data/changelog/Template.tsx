import { ReactNode } from "react";

type HeadingProps = {
  number: string;
  date: string;
};

function Heading({ number, date }: HeadingProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-6 rounded rounded-b-none bg-card border-t border-x">
      <h1 className="text-lg font-semibold leading-none tracking-tight">
        Update #{number}
      </h1>
      <h2 className="text-base">{date}</h2>
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 p-6 rounded rounded-t-none bg-card border text-sm">
      {children}
    </div>
  );
}

export default function Update({
  number,
  date,
  children,
}: HeadingProps & { children: ReactNode }) {
  return (
    <article className="max-w-screen-md">
      <Heading number={number} date={date} />
      <Content>{children}</Content>
    </article>
  );
}
