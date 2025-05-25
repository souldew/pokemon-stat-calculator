import "@/app/globals.css";
import { BaseStatInputList } from "@/containers/BaseStatInputList";
import { IvStatInputList } from "@/containers/IvStatInputList";
import { EvStatInputList } from "@/containers/EvStatInputList";
import { StatusStatInputList } from "@/containers/StatusStatInputList";
import { StatType } from "@/types";
import { statTypes } from "@/constants";

type Props = {
  baseStats: {
    [key in StatType]: string;
  };
  baseTotal: string;
  ivStats: {
    [key in StatType]: string;
  };
  evStats: {
    [key in StatType]: string;
  };
  statusStat: {
    [key in StatType]: string;
  };
  handleStatusChange: (
    key: StatType
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEvChange: (
    key: StatType
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIvChange: (
    key: StatType
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBaseChange: (
    key: StatType
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PokeStatDisplayTable({
  baseStats,
  baseTotal,
  ivStats,
  evStats,
  statusStat,
  handleStatusChange,
  handleEvChange,
  handleIvChange,
  handleBaseChange,
}: Props) {
  return (
    <div className="grid grid-rows-8 gap-4 grid-flow-col w-[370px]">
      <div></div>
      {statTypes.map((v) => (
        <div key={v}>{v}</div>
      ))}
      <div>合計</div>
      <div>実数値</div>
      <StatusStatInputList
        values={statusStat}
        handleStatusChange={handleStatusChange}
      />
      <div></div>
      <div>努力値</div>
      <EvStatInputList values={evStats} handleEvChange={handleEvChange} />
      <div></div>
      <div>個体値</div>
      <IvStatInputList values={ivStats} handleIvChange={handleIvChange} />
      <div></div>
      <div>種族値</div>
      <BaseStatInputList
        values={baseStats}
        handleBaseChange={handleBaseChange}
      />
      <div>{baseTotal}</div>
    </div>
  );
}

export { PokeStatDisplayTable };
