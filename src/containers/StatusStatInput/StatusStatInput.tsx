type Props = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isError: boolean;
};

function StatusStatInput({ value, onChange, isError, className }: Props) {
  if (isError) {
    className = `${className} bg-red-100 border-red-300`;
  }
  return (
    <input
      type="number"
      value={value}
      className={`border border-gray-300 rounded-md px-1 w-12 text-right no-spin ${className}`}
      placeholder="0"
      onChange={onChange}
      max={999}
      min={1}
      step={1}
    />
  );
}

export { StatusStatInput };
