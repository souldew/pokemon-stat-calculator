import React from "react";
import { IvStatInput } from "../IvStatInput/IvStatInput";
import { StatType } from "@/types";
import { statTypes } from "@/constants";

type Props = {
  values: {
    [key in StatType]: string;
  };
  handleIvChange: (
    key: StatType
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function IvStatInputList({ values, handleIvChange }: Props) {
  return (
    <React.Fragment>
      {statTypes.map((statType) => (
        <IvStatInput
          key={statType}
          value={values[statType]}
          onChange={handleIvChange(statType)}
        ></IvStatInput>
      ))}
    </React.Fragment>
  );
}

export { IvStatInputList };
