import "@/app/globals.css";
import { BaseStatInputList } from "@/containers/BaseStatInputList";
import { IvStatInputList } from "@/containers/IvStatInputList";
import { EvStatInputList } from "@/containers/EvStatInputList";
import { StatusStatInputList } from "@/containers/StatusStatInputList";
import { StatType } from "@/types";
import { statTypes } from "@/constants";
import { StatusHook } from "@/hooks/useStatus";

type Props = {
  status: { [key in StatType]: StatusHook };
};

function PokeStatDisplayTable({ status }: Props) {
  const baseTotal = Object.values(status).reduce(
    (acc, cur) => acc + Number(cur.base),
    0
  );
  const evTotal = Object.values(status).reduce(
    (acc, cur) => acc + Number(cur.ev),
    0
  );

  const statusList = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.status,
    }),
    {}
  ) as { [key in StatType]: string };
  const evList = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.ev,
    }),
    {}
  ) as { [key in StatType]: string };
  const ivList = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.iv,
    }),
    {}
  ) as { [key in StatType]: string };
  const baseList = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.base,
    }),
    {}
  ) as { [key in StatType]: string };
  const handleStatusList = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.handleStatusChange,
    }),
    {}
  ) as { [key in StatType]: (e: React.ChangeEvent<HTMLInputElement>) => void };
  const handleEvList = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.handleEvChange,
    }),
    {}
  ) as { [key in StatType]: (e: React.ChangeEvent<HTMLInputElement>) => void };
  const handleIvList = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.handleIvChange,
    }),
    {}
  ) as { [key in StatType]: (e: React.ChangeEvent<HTMLInputElement>) => void };
  const handleBaseList = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.handleBaseChange,
    }),
    {}
  ) as { [key in StatType]: (e: React.ChangeEvent<HTMLInputElement>) => void };
  const statusError = Object.values(status).reduce(
    (acc, cur) => ({
      ...acc,
      [cur.stat]: cur.isError,
    }),
    {}
  ) as { [key in StatType]: boolean };

  return (
    <div className="grid grid-rows-8 gap-4 grid-flow-col w-[370px]">
      <div></div>
      {statTypes.map((v) => (
        <div key={v}>{v}</div>
      ))}
      <div>合計</div>
      <div>実数値</div>
      <StatusStatInputList
        values={statusList}
        handleStatusChange={handleStatusList}
        statusError={statusError}
      />
      <div></div>
      <div>努力値</div>
      <EvStatInputList values={evList} handleEvChange={handleEvList} />
      <div>{evTotal}</div>
      <div>個体値</div>
      <IvStatInputList values={ivList} handleIvChange={handleIvList} />
      <div></div>
      <div>種族値</div>
      <BaseStatInputList values={baseList} handleBaseChange={handleBaseList} />
      <div>{baseTotal}</div>
    </div>
  );
}

export { PokeStatDisplayTable };
