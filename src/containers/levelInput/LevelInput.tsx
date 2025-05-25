import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

function LevelInput({ value, onChange, className }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="number"
      value={value}
      className={`border border-gray-300 rounded-md px-1 w-12 text-right no-spin ${className}`}
      placeholder="0"
      onChange={handleChange}
      max={100}
      min={1}
      step={1}
    />
  );
}

export { LevelInput };
