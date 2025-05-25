import { natureAlias } from "@/constants/nature";
import { NatureType } from "@/types";

type Props = {
  value: string;
  onChange: (value: NatureType) => void;
  className?: string;
};

function NatureInput({ value, onChange, className }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue as NatureType);
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (natureAlias[newValue]) {
      onChange(natureAlias[newValue]);
    } else {
      onChange("がんばりや");
    }
  };

  return (
    <input
      type="text"
      value={value}
      className={`border border-gray-300 rounded-md px-1 text-right w-32 ${className}`}
      placeholder="性格"
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
}

export { NatureInput };
