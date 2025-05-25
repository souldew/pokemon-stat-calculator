import React from "react";
import { IvStatInput } from "../IvStatInput/IvStatInput";
import { StatType } from "@/types";
import { statTypes } from "@/constants";

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
      {statTypes.map((statType) => (
        <IvStatInput
          key={statType}
          value={values[statType]}
          onChange={handleChange(statType)}
        ></IvStatInput>
      ))}
    </React.Fragment>
  );
}

export { IvStatInputList };
