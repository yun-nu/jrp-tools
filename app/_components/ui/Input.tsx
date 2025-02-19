interface InputProps {
  label: string;
  id: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  type: string;
  value?: string;
  minLength?: number;
  min?: number;
  max?: number;
  errorMsg?: string;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

// export default function Input({
//   label,
//   id,
//   description,
//   placeholder,
//   required,
//   pattern,
//   type,
//   value,
//   minLength,
//   min,
//   max,
//   errorMsg,
//   autoFocus,
//   onChange,
//   onBlur,
// }: InputProps) {
//   return (
//     <div className="space-y-2">
//       <label htmlFor={id}>
//         {label}{" "}
//         {required && <span className="text-sm text-red-500">(required)</span>}
//         {type !== "checkbox" && description && (
//           <span className="block text-sm">{description}</span>
//         )}
//       </label>
//       <input
//         className={`block w-[300px] px-3 py-1 bg-zinc-200 text-zinc-800 shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 ${
//           type === "checkbox" &&
//           "inline-block w-[48px] accent-green-500 scale-150"
//         }`}
//         name={id}
//         type={type}
//         value={value}
//         id={id}
//         required={required}
//         pattern={pattern}
//         minLength={minLength}
//         max={max}
//         min={min}
//         placeholder={placeholder}
//         autoFocus={autoFocus}
//         onChange={onChange}
//         onBlur={onBlur}
//       />
//       {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
//       {type === "checkbox" && (
//         <span className="block text-sm">{description}</span>
//       )}
//     </div>
//   );
// }
