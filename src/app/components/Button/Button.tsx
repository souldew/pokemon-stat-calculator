type VariantType = "default" | "primary";
type ButtonType = "solid" | "outline";
type SizeType = "sm" | "md" | "lg";

type Props = {
  type?: ButtonType;
  variant?: VariantType;
  size?: SizeType;
  children?: React.ReactNode;
};

function Button({
  type = "solid",
  variant = "default",
  size = "md",
  children,
}: Props) {
  const { textColor, backgroundColor, borderColor } = getColorCombination(
    variant,
    type
  );
  const { textSize, paddingSize } = getSizeCombination(size);

  return (
    <button
      className={`${backgroundColor} ${textColor} ${borderColor} ${textSize} ${paddingSize} rounded-md box-border`}
    >
      {children}
    </button>
  );
}

export { Button };

type GetColorCombinationType = (
  variant: VariantType,
  type: ButtonType
) => {
  textColor: string | undefined;
  backgroundColor: string | undefined;
  borderColor: string | undefined;
};

const getColorCombination: GetColorCombinationType = (variant, type) => {
  console.log(`${variant}-${type} not found`);
  switch (`${variant}-${type}`) {
    case "primary-solid":
      return {
        textColor: "text-white",
        backgroundColor: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
        borderColor:
          "border border-blue-500  hover:border-blue-600 active:border-blue-700",
      };
    case "default-solid":
      return {
        textColor: "text-gray-900",
        backgroundColor: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400",
        borderColor:
          "border border-gray-200 hover:border-gray-300 active:border-gray-400",
      };
    case "primary-outline":
      return {
        textColor: "text-blue-500",
        backgroundColor: "bg-transparent hover:bg-blue-50 active:bg-blue-100",
        borderColor: "border border-blue-500",
      };
    case "default-outline":
      return {
        textColor: "text-gray-900",
        backgroundColor: "bg-transparent hover:bg-gray-200 active:bg-gray-300",
        borderColor: "border border-gray-500",
      };
    default:
      new Error(`getColorCombination: ${variant}-${type} not found`);
  }
  return {
    textColor: undefined,
    backgroundColor: undefined,
    borderColor: undefined,
  };
};

type GetSizeCombinationType = (size: SizeType) => {
  textSize: string | undefined;
  paddingSize: string | undefined;
};

const getSizeCombination: GetSizeCombinationType = (size) => {
  switch (size) {
    case "md":
      return {
        textSize: "text-base",
        paddingSize: "px-3 py-2",
      };
    default:
      new Error(`getSizeCombination: ${size} not found`);
  }
  return { textSize: undefined, paddingSize: undefined };
};
