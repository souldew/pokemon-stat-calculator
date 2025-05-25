import "@/app/globals.css";
import { BaseStatInputList } from "@/containers/BaseStatInputList";
import { IvStatInputList } from "@/containers/IvStatInputList";
import { EvStatInputList } from "@/containers/EvStatInputList";
import { StatusStatInputList } from "@/containers/StatusStatInputList";
import { Dispatch, SetStateAction } from "react";
import { StatType } from "@/types";

type Props = {
  baseStats: {
    [key in StatType]: string;
  };
  handleBaseStats: (newStats: { [key in StatType]: string }) => void;
  baseTotal: string;
  ivStats: {
    [key in StatType]: string;
  };
  handleIvStats: (newStats: { [key in StatType]: string }) => void;
  evStats: {
    [key in StatType]: string;
  };
  handleEvStats: (newStats: { [key in StatType]: string }) => void;
  statusStat: {
    [key in StatType]: string;
  };
  handleStatusStat: Dispatch<
    SetStateAction<{
      HP: string;
      Atk: string;
      Def: string;
      SpA: string;
      SpD: string;
      Spe: string;
    }>
  >;
};

const StatLabelList = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"] as const;

function PokeStatDisplayTable({
  baseStats,
  handleBaseStats,
  baseTotal,
  ivStats,
  handleIvStats,
  evStats,
  handleEvStats,
  statusStat,
  handleStatusStat,
}: Props) {
  return (
    <div className="grid grid-rows-8 gap-4 grid-flow-col w-[390px]">
      <div></div>
      {StatLabelList.map((v) => (
        <div key={v}>{v}</div>
      ))}
      <div>合計</div>
      <div>実数値</div>
      <StatusStatInputList values={statusStat} onChange={handleStatusStat} />
      <div></div>
      <div>努力値</div>
      <EvStatInputList values={evStats} onChange={handleEvStats} />
      <div></div>
      <div>個体値</div>
      <IvStatInputList values={ivStats} onChange={handleIvStats} />
      <div></div>
      <div>種族値</div>
      <BaseStatInputList values={baseStats} onChange={handleBaseStats} />
      <div>{baseTotal}</div>
    </div>
  );
}

export { PokeStatDisplayTable };
