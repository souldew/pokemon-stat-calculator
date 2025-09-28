import { natureMap, natureTypes } from "@/constants/nature";
import { calcPokeIvEvStatus } from "@/lib/calcPokeIvEvStatus";
import { calcPokeStatusAsString } from "@/lib/calcPokeStatusAsString";
import { NatureType, StatType } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  stat: StatType;
  level: string;
  nature: NatureType;
  actionState: string;
};

export type StatusHook = {
  stat: StatType;
  status: string;
  ev: string;
  iv: string;
  base: string;
  isError: boolean;
  handleStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEvChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIvChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBaseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleIsErrorChange: (e: boolean) => void;
};

const useStatus = ({ stat, level, nature, actionState }: Props) => {
  const [status, setStatus] = useState<string>("");
  const [ev, setEv] = useState<string>("0");
  const [iv, setIv] = useState<string>("31");
  const [base, setBaseStats] = useState("0");
  const [isError, setIsError] = useState<boolean>(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
    const { iv, ev, success } = calcPokeIvEvStatus(
      Number(level),
      Number(e.target.value),
      Number(base),
      natureMap[nature][stat],
      stat
    );
    setIsError(!success);
    if (!success) {
      return;
    }
    setEv(ev!.toString());
    setIv(iv!.toString());
  };

  const handleEvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEv(e.target.value);
    const changedStatus = calcPokeStatusAsString(
      Number(base),
      Number(iv),
      Number(e.target.value),
      Number(level),
      natureMap[nature][stat],
      stat
    );
    setStatus(changedStatus);
  };

  const handleIvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIv(e.target.value);
    const changedStatus = calcPokeStatusAsString(
      Number(base),
      Number(e.target.value),
      Number(ev),
      Number(level),
      natureMap[nature][stat],
      stat
    );
    setStatus(changedStatus);
  };

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseStats(e.target.value);
    const changedStatus = calcPokeStatusAsString(
      Number(e.target.value),
      Number(iv),
      Number(ev),
      Number(level),
      natureMap[nature][stat],
      stat
    );
    setStatus(changedStatus);
  };

  useEffect(() => {
    if (level === "") return;
    if (!natureTypes.includes(nature as NatureType)) return;

    const next = calcPokeStatusAsString(
      Number(base),
      Number(iv),
      Number(ev),
      Number(level),
      natureMap[nature][stat],
      stat
    );
    setStatus(next);
  }, [base, iv, ev, level, nature, stat]);

  useEffect(() => {
    setBaseStats(actionState);
  }, [actionState]);

  return {
    stat,
    status,
    ev,
    iv,
    base,
    isError,
    handleStatusChange,
    handleEvChange,
    handleIvChange,
    handleBaseChange,
  };
};

export { useStatus };
