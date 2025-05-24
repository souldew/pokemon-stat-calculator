import React from "react";
import { IvStatInput } from "../IvStatInput/IvStatInput";
import { StatType } from "@/app/page";

type Props = {
  values: {
    [key in StatType]: string;
  };
  onChange: (newStats: { [key in StatType]: string }) => void;
};

function IvStatInputList({ values, onChange }: Props) {
  const handleChange = (k: StatType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStats = { ...values };
      newStats[k] = e.target.value;
      onChange(newStats);
    };
  };

  return (
    <React.Fragment>
      <IvStatInput
        value={values["HP"]}
        onChange={handleChange("HP")}
      ></IvStatInput>
      <IvStatInput
        value={values["Atk"]}
        onChange={handleChange("Atk")}
      ></IvStatInput>
      <IvStatInput
        value={values["Def"]}
        onChange={handleChange("Def")}
      ></IvStatInput>
      <IvStatInput
        value={values["SpA"]}
        onChange={handleChange("SpA")}
      ></IvStatInput>
      <IvStatInput
        value={values["SpD"]}
        onChange={handleChange("SpD")}
      ></IvStatInput>
      <IvStatInput
        value={values["Spe"]}
        onChange={handleChange("Spe")}
      ></IvStatInput>
    </React.Fragment>
  );
}

export { IvStatInputList };
