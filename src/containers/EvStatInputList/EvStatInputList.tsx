import React from "react";

import { StatType } from "@/types";
import { EvStatInput } from "../EvStatInput/EvStatInput";
import { statTypes } from "@/constants";

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
      {statTypes.map((statType) => (
        <EvStatInput
          key={statType}
          value={values[statType]}
          onChange={handleChange(statType)}
        ></EvStatInput>
      ))}
    </React.Fragment>
  );
}

export { EvStatInputList };
