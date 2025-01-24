interface SubmitButtonProps {
  children: string;
  action?: () => void;
}

export default function SubmitButton({ children, action }: SubmitButtonProps) {
  return (
    <button
      className="py-3 rounded-md px-5 bg-slate-800 hover:bg-slate-900 hover:text-zinc-100 transition-colors flex justify-center items-center gap-4 font-semibold text-zinc-200 m-auto w-[320px]"
      onClick={action}
    >
      {children}
    </button>
  );
}
