import { ReactNode } from "react";

type HeadingProps = {
  number: string;
  title: string;
};

function Heading({ number, title }: HeadingProps) {
  return (
    <div className="flex items-center gap-4">
      <h1 className="text-2xl">Update #{number}</h1>
      <h2 className="text-lg">{title}</h2>
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

export default function Update({
  number,
  title,
  children,
}: HeadingProps & { children: ReactNode }) {
  return (
    <article className="max-w-[600px]">
      <Heading number={number} title={title} />
      <Content>{children}</Content>
    </article>
  );
}
