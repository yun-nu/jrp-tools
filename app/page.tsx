import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Text-based roleplay thread tracking made easy.</h1>
      <p>
        Store and share your threads with ease. Add, edit or delete your data
        anytime.
      </p>
      <Footer />
    </div>
  );
}
