type Props = {
  className?: string;
  name?: string;
};

function PokeNameInput({ name, className }: Props) {
  return (
    <input
      type="text"
      name={name}
      className={`border border-gray-300 rounded-md px-1 text-right w-32 ${className}`}
      placeholder="ポケモン名"
    />
  );
}

export { PokeNameInput };
