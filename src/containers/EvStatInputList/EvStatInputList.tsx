import React from "react";

import { StatType } from "@/types";
import { EvStatInput } from "../EvStatInput/EvStatInput";

type Props = {
  values: {
    [key in StatType]: string;
  };
  onChange: (newStats: { [key in StatType]: string }) => void;
};

function EvStatInputList({ values, onChange }: Props) {
  const handleChange = (k: StatType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStats = { ...values };
      newStats[k] = e.target.value;
      onChange(newStats);
    };
  };

  return (
    <React.Fragment>
      <EvStatInput
        value={values["HP"]}
        onChange={handleChange("HP")}
      ></EvStatInput>
      <EvStatInput
        value={values["Atk"]}
        onChange={handleChange("Atk")}
      ></EvStatInput>
      <EvStatInput
        value={values["Def"]}
        onChange={handleChange("Def")}
      ></EvStatInput>
      <EvStatInput
        value={values["SpA"]}
        onChange={handleChange("SpA")}
      ></EvStatInput>
      <EvStatInput
        value={values["SpD"]}
        onChange={handleChange("SpD")}
      ></EvStatInput>
      <EvStatInput
        value={values["Spe"]}
        onChange={handleChange("Spe")}
      ></EvStatInput>
    </React.Fragment>
  );
}

export { EvStatInputList };
