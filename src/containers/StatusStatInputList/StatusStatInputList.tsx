import React from "react";
import { StatusStatInput } from "../StatusStatInput";
import { StatType } from "@/types";

type Props = {
  values: {
    [key in StatType]: string;
  };
  onChange: (newStats: { [key in StatType]: string }) => void;
};

function StatusStatInputList({ values, onChange }: Props) {
  const handleChange = (k: StatType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStats = { ...values };
      newStats[k] = e.target.value;
      onChange(newStats);
    };
  };

  return (
    <React.Fragment>
      <StatusStatInput
        value={values["HP"]}
        onChange={handleChange("HP")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Atk"]}
        onChange={handleChange("Atk")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Def"]}
        onChange={handleChange("Def")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["SpA"]}
        onChange={handleChange("SpA")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["SpD"]}
        onChange={handleChange("SpD")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Spe"]}
        onChange={handleChange("Spe")}
      ></StatusStatInput>
    </React.Fragment>
  );
}

export { StatusStatInputList };
