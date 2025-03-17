import SideNavigation from "../_components/SideNavigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[5rem_1fr] w-full h-full gap-12">
      <SideNavigation />
      <div className="py-12 flex-1 overflow-auto flex justify-center pr-12">
        {children}
      </div>
    </div>
  );
}
