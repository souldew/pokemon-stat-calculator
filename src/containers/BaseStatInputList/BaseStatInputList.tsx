import React from "react";
import { BaseStatInput } from "../BaseStatInput";
import { StatType } from "@/app/page";

type Props = {
  values: {
    [key in StatType]: string;
  };
  onChange: (newStats: { [key in StatType]: string }) => void;
};

function BaseStatInputList({ values, onChange }: Props) {
  const handleChange = (k: StatType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStats = { ...values };
      newStats[k] = e.target.value;
      onChange(newStats);
    };
  };

  return (
    <React.Fragment>
      <BaseStatInput
        value={values["HP"]}
        onChange={handleChange("HP")}
      ></BaseStatInput>
      <BaseStatInput
        value={values["Atk"]}
        onChange={handleChange("Atk")}
      ></BaseStatInput>
      <BaseStatInput
        value={values["Def"]}
        onChange={handleChange("Def")}
      ></BaseStatInput>
      <BaseStatInput
        value={values["SpA"]}
        onChange={handleChange("SpA")}
      ></BaseStatInput>
      <BaseStatInput
        value={values["SpD"]}
        onChange={handleChange("SpD")}
      ></BaseStatInput>
      <BaseStatInput
        value={values["Spe"]}
        onChange={handleChange("Spe")}
      ></BaseStatInput>
    </React.Fragment>
  );
}

export { BaseStatInputList };
