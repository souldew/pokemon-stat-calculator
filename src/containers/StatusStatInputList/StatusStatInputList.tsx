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
      <StatusStatInput
        value={values["HP"]}
        onChange={handleStatusChange("HP")}
        isError={statusError["HP"]}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Atk"]}
        onChange={handleStatusChange("Atk")}
        isError={statusError["Atk"]}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Def"]}
        onChange={handleStatusChange("Def")}
        isError={statusError["Def"]}
      ></StatusStatInput>
      <StatusStatInput
        value={values["SpA"]}
        onChange={handleStatusChange("SpA")}
        isError={statusError["SpA"]}
      ></StatusStatInput>
      <StatusStatInput
        value={values["SpD"]}
        onChange={handleStatusChange("SpD")}
        isError={statusError["SpD"]}
      ></StatusStatInput>
      <StatusStatInput
        value={values["Spe"]}
        onChange={handleStatusChange("Spe")}
        isError={statusError["Spe"]}
      ></StatusStatInput>
    </React.Fragment>
  );
}

export { StatusStatInputList };
