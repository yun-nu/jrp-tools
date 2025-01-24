export default function SignInGoogle() {
  return (
    <button className="flex items-center gap-6 text-lg border border-primary-300 px-8 py-4 font-medium">
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      <span>Continue with Google</span>
    </button>
  );
}
