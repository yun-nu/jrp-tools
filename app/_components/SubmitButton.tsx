interface SubmitButtonProps {
  content: string;
  action?: () => void;
  onClick?: () => void;
  type: "button" | "reset" | "submit";
  icon?: React.ReactNode;
}

export default function SubmitButton({
  content,
  icon,
  type,
  action,
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      className="py-3 rounded-md px-5 bg-slate-800 hover:bg-slate-900 hover:text-zinc-100 transition-colors flex justify-center items-center gap-4 font-semibold text-zinc-200 m-auto w-[320px]"
      formAction={action}
      type={type}
      onClick={onClick}
    >
      {icon}
      {content}
    </button>
  );
}
