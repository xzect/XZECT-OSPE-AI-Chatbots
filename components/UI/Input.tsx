interface InputProps {
  label?: string;
  inputId?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  inputType?: React.HTMLInputTypeAttribute;
  value?: string;
  onChangeValue?: (e: any) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  inputId,
  name,
  required,
  inputType,
  placeholder,
  value,
  onChangeValue,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 p-2 text-slate-900 font-semibold text-lg">
      <label htmlFor={inputId}>{label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        required={required}
        name={name}
        className="bg-slate-400 px-3 py-1 rounded outline-none border-spacing-0 placeholder:text-slate-500"
        value={value}
        onChange={onChangeValue}
      />
    </div>
  );
};

export default Input;
