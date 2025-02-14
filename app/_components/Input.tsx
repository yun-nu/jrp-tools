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

export default function Input({
  label,
  id,
  description,
  placeholder,
  required,
  pattern,
  type,
  value,
  minLength,
  min,
  max,
  errorMsg,
  autoFocus,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id}>
        {label}{" "}
        {required && <span className="text-sm text-red-500">(required)</span>}
        {type !== "checkbox" && description && (
          <span className="block text-sm">{description}</span>
        )}
      </label>
      <input
        className={`block w-[300px] px-3 py-1 bg-zinc-200 text-zinc-800 shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 ${
          type === "checkbox" &&
          "inline-block w-[48px] accent-green-500 scale-150"
        }`}
        name={id}
        type={type}
        value={value}
        id={id}
        required={required}
        pattern={pattern}
        minLength={minLength}
        max={max}
        min={min}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      {type === "checkbox" && (
        <span className="block text-sm">{description}</span>
      )}
    </div>
  );
}
