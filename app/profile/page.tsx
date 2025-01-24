export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <div className="">
        <h1>User Profile</h1>
      </div>
    </div>
  );
}
