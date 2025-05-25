import React from "react";
import { StatusStatInput } from "../StatusStatInput";
import { StatType } from "@/types";

type Props = {
  values: {
    [key in StatType]: string;
  };
  handleStatusChange: (
    key: StatType
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function StatusStatInputList({ values, handleStatusChange }: Props) {
  return (
    <React.Fragment>
      <StatusStatInput
        value={values["HP"]}
        onChange={handleStatusChange("HP")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Atk"]}
        onChange={handleStatusChange("Atk")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Def"]}
        onChange={handleStatusChange("Def")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["SpA"]}
        onChange={handleStatusChange("SpA")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["SpD"]}
        onChange={handleStatusChange("SpD")}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Spe"]}
        onChange={handleStatusChange("Spe")}
      ></StatusStatInput>
    </React.Fragment>
  );
}

export { StatusStatInputList };
