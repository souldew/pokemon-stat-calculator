import React from "react";
import { StatusStatInput } from "../StatusStatInput";
import { StatType } from "@/types";
import { statTypes } from "@/constants";

type Props = {
  values: {
    [key in StatType]: string;
  };
  handleStatusChange: {
    [key in StatType]: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  statusError: {
    [key in StatType]: boolean;
  };
};

function StatusStatInputList({
  values,
  handleStatusChange,
  statusError,
}: Props) {
  return (
    <React.Fragment>
      {statTypes.map((statType) => (
        <StatusStatInput
          key={statType}
          value={values[statType]}
          onChange={handleStatusChange[statType]}
          isError={statusError[statType]}
        ></StatusStatInput>
      ))}
    </React.Fragment>
  );
}

export { StatusStatInputList };
