import React from "react";

import { StatType } from "@/types";
import { EvStatInput } from "../EvStatInput/EvStatInput";
import { statTypes } from "@/constants";

type Props = {
  values: {
    [key in StatType]: string;
  };
  handleEvChange: (
    key: StatType
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function EvStatInputList({ values, handleEvChange }: Props) {
  return (
    <React.Fragment>
      {statTypes.map((statType) => (
        <EvStatInput
          key={statType}
          value={values[statType]}
          onChange={handleEvChange(statType)}
        ></EvStatInput>
      ))}
    </React.Fragment>
  );
}

export { EvStatInputList };
