import React from "react";
import { BaseStatInput } from "../BaseStatInput";
import { StatType } from "@/types";
import { statTypes } from "@/constants";

type Props = {
  values: {
    [key in StatType]: string;
  };
  handleBaseChange: {
    [key in StatType]: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

function BaseStatInputList({ values, handleBaseChange }: Props) {
  return (
    <React.Fragment>
      {statTypes.map((statType) => (
        <BaseStatInput
          key={statType}
          value={values[statType]}
          onChange={handleBaseChange[statType]}
        ></BaseStatInput>
      ))}
    </React.Fragment>
  );
}

export { BaseStatInputList };
