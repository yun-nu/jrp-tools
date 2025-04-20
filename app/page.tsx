import Footer from "./_components/Footer";
import SignUpButton from "./_components/SignUpButton";

export default async function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-between sm:pt-6 px-4 text-center">
      <div className="custom-underline">
        <h1 className="text-5xl text-primary mb-10 tracking-tight font-normal">
          Thread tracking made simple
        </h1>
      </div>
      <p>
        Lightweight thread tracker for journal-based roleplay. Store and share
        your threads with just a few clicks.
      </p>
      <SignUpButton />
      <Footer />
    </div>
  );
}
