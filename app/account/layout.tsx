import SideNavigation from "../_components/SideNavigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[5rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-12 ">{children}</div>
    </div>
  );
}
