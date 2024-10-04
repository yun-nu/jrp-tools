import Navbar from "./_components/Navbar";
import SideNavigation from "./_components/SideNavigation";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SideNavigation />
      </main>
    </>
  );
}
