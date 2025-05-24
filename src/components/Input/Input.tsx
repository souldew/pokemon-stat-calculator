type Props = {
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

function Input({
  type = "number",
  value,
  placeholder = "Enter text",
  onChange,
}: Props) {
  return (
    <input
      type={type}
      value={value}
      className="border border-gray-300 rounded-md p-2 w-16 no-spin"
      placeholder={placeholder}
      onChange={onChange}
      size={10}
    />
  );
}

export { Input };
