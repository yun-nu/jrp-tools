import { ReactNode } from "react";

type HeadingProps = {
  number: string;
  date: string;
};

type ChangelogItem = {
  number: string;
  date: string;
  content: ReactNode;
};

type Props = {
  items: ChangelogItem[];
  className?: string;
};

function Heading({ number, date }: HeadingProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 sm:p-6 rounded rounded-b-none bg-card border-t border-x">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Update #{number}
      </h1>
      <h2 className="text-lg">{date}</h2>
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 p-4 sm:p-6 rounded rounded-t-none bg-card border text-sm">
      {children}
    </div>
  );
}

function UpdatesLayout({
  number,
  date,
  children,
}: HeadingProps & { children: ReactNode }) {
  return (
    <article className="max-w-screen-md h-full">
      <Heading number={number} date={date} />
      <Content>{children}</Content>
    </article>
  );
}

export default function Update({ items }: Props) {
  return (
    <>
      {items.map((item) => (
        <article key={item.number} className="max-w-screen-md h-full">
          <Heading number={item.number} date={item.date} />
          <Content>{item.content}</Content>
        </article>
      ))}
    </>
  );
}
