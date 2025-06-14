import { natureMap, natureTypes } from "@/constants/nature";
import { calcPokeIvEvStatus } from "@/lib/calcPokeIvEvStatus";
import { calcPokeStatusAsString } from "@/lib/calcPokeStatusAsString";
import { NatureType, StatType } from "@/types";
import { useEffect, useRef, useState } from "react";

type Props = {
  stat: StatType;
  level: number;
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
  handleIsErrorChange: (e: boolean) => void;
};

const useStatus = ({ stat, level, nature, actionState }: Props) => {
  const [status, setStatus] = useState<string>("");
  const [ev, setEv] = useState<string>("0");
  const [iv, setIv] = useState<string>("31");
  const [base, setBaseStats] = useState("0");
  const [isError, setIsError] = useState<boolean>(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  const handleEvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEv(e.target.value);
  };
  const handleIvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIv(e.target.value);
  };
  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseStats(e.target.value);
  };
  const handleIsErrorChange = (e: boolean) => {
    setIsError(e);
  };

  const statusRef = useRef<string>(status);
  const evRef = useRef<string>(ev);
  const ivRef = useRef<string>(iv);
  const baseRef = useRef<string>(base);

  useEffect(() => {
    setBaseStats(actionState);
  }, [actionState]);

  useEffect(() => {
    if (!natureTypes.includes(nature as NatureType)) return;
    if (statusRef.current !== status) {
      // 努力値、個体値の更新
      const {
        iv: newIv,
        ev: newEv,
        success,
      } = calcPokeIvEvStatus(
        level,
        Number(status),
        Number(base),
        natureMap[nature][stat],
        stat
      );
      if (!success) {
        // 努力値、個体値が計算できなかった場合はエラー状態にする
        handleIsErrorChange(true);
        statusRef.current = status;
        return;
      }
      handleIsErrorChange(false);
      setEv(newEv!.toString());
      setIv(newIv!.toString());
      statusRef.current = status;
      baseRef.current = base;
      evRef.current = newEv!.toString();
      ivRef.current = newIv!.toString();
    } else if (
      evRef.current !== ev ||
      ivRef.current !== iv ||
      baseRef.current !== base
    ) {
      const changedStatus = calcPokeStatusAsString(
        Number(base),
        Number(iv),
        Number(ev),
        Number(level),
        natureMap[nature][stat],
        stat
      );
      setStatus(changedStatus);
      statusRef.current = changedStatus;
      baseRef.current = base;
      evRef.current = ev;
      ivRef.current = iv;
    }
  }, [status, ev, iv, base, level, nature, stat]);

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
    handleIsErrorChange,
  };
};

export { useStatus };
