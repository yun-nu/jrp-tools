import { ReactNode } from "react";

export default function MessageBox({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 border rounded border-muted-foreground/80">
      <p className="text-xl text-center">{children}</p>
    </div>
  );
}
