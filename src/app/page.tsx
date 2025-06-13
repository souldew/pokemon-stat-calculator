"use client";

import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { PokeStatDisplayTable } from "@/features/PokeStatDisplayTable";
import { LevelInput } from "@/containers/levelInput";
import { calcPokeStatusAllAsString } from "@/lib/calcPokeStatusAllAsString";
import { NatureType, StatType } from "@/types";
import { NatureInput } from "@/containers/NatureInput";
import { natureMap, natureTypes } from "@/constants/nature";
import { calcPokeIvEvStatus } from "@/lib/calcPokeIvEvStatus";
import { calcPokeStatusAsString } from "@/lib/calcPokeStatusAsString";
import { PokeNameInput } from "@/containers/PokeNameInput";
import { Button } from "@/components/Button";

type FormState = {
  status: string;
  message?: string;
  iconPath: string;
  baseStats: { [key in StatType]: string };
  pokeName: string;
};

export default function Home() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    action,
    {
      status: "",
      message: "",
      iconPath: "/default.png",
      baseStats: {
        HP: "0",
        Atk: "0",
        Def: "0",
        SpA: "0",
        SpD: "0",
        Spe: "0",
      },
      pokeName: "",
    }
  );
  const [level, setLevel] = useState<string>("50");
  const [nature, setNature] = useState<NatureType>("がんばりや");

  const [baseStats, setBaseStats] = useState<{ [key in StatType]: string }>({
    HP: "0",
    Atk: "0",
    Def: "0",
    SpA: "0",
    SpD: "0",
    Spe: "0",
  });

  const [ivStats, setIvStats] = useState<{ [key in StatType]: string }>({
    HP: "31",
    Atk: "31",
    Def: "31",
    SpA: "31",
    SpD: "31",
    Spe: "31",
  });

  const [evStats, setEvStats] = useState<{ [key in StatType]: string }>({
    HP: "0",
    Atk: "0",
    Def: "0",
    SpA: "0",
    SpD: "0",
    Spe: "0",
  });

  const [statusStat, setStatusStat] = useState<{
    [key in StatType]: string;
  }>({
    HP: "0",
    Atk: "0",
    Def: "0",
    SpA: "0",
    SpD: "0",
    Spe: "0",
  });

  const [statusError, setStatusError] = useState<{
    [key in StatType]: boolean;
  }>({
    HP: false,
    Atk: false,
    Def: false,
    SpA: false,
    SpD: false,
    Spe: false,
  });

  // form受け取り時
  useEffect(() => {
    setBaseStats(state.baseStats);
  }, [state.baseStats]);

  useEffect(() => {
    if (level === "") return;
    if (!natureTypes.includes(nature as NatureType)) return;

    const next = calcPokeStatusAllAsString({
      baseStats,
      ivStats,
      evStats,
      level: Number(level),
      nature,
    });
    setStatusStat(next);
  }, [baseStats, ivStats, evStats, level, nature]);

  const handleBaseChange =
    (key: StatType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newBaseStats = { ...baseStats, [key]: e.target.value };
      setBaseStats(newBaseStats);
      const changedStatus = calcPokeStatusAsString(
        Number(e.target.value),
        Number(ivStats[key]),
        Number(evStats[key]),
        Number(level),
        Number(natureMap[nature][key]),
        key
      );
      setStatusStat({ ...statusStat, [key]: changedStatus });
    };

  const handleIvChange = (key: StatType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setIvStats({ ...ivStats, [key]: e.target.value });
      const changedStatus = calcPokeStatusAsString(
        Number(baseStats[key]),
        Number(e.target.value),
        Number(evStats[key]),
        Number(level),
        Number(natureMap[nature][key]),
        key
      );
      setStatusStat({ ...statusStat, [key]: changedStatus });
    };
  };

  const handleEvChange = (key: StatType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setEvStats({ ...evStats, [key]: e.target.value });
      const changedStatus = calcPokeStatusAsString(
        Number(baseStats[key]),
        Number(ivStats[key]),
        Number(e.target.value),
        Number(level),
        Number(natureMap[nature][key]),
        key
      );
      setStatusStat({ ...statusStat, [key]: changedStatus });
    };
  };

  const handleStatusChange = (key: StatType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStatus = { ...statusStat, [key]: e.target.value };
      setStatusStat({ ...newStatus });
      const { iv, ev, success } = calcPokeIvEvStatus(
        Number(level),
        Number(e.target.value),
        Number(baseStats[key]),
        natureMap[nature][key],
        key
      );
      setStatusError({ ...statusError, [key]: !success });
      if (!success) {
        return;
      }
      // 変化したステータスだけ逆算して更新
      const newIvStats = { ...ivStats, [key]: String(iv) };
      const newEvStats = { ...evStats, [key]: String(ev) };
      setIvStats(newIvStats);
      setEvStats(newEvStats);
    };
  };

  return (
    <div className="m-4">
      <div className="flex flex-col gap-2 mb-4">
        <form action={formAction} className="flex flex-col gap-2">
          <Image
            src={state.iconPath}
            alt="noimage"
            width={40}
            height={40}
            className="h-[40px] object-contain"
          />
          <div className="flex gap-2">
            <PokeNameInput name="name" />
            <Button disabled={isPending} variant="default" size="sm">
              Send
            </Button>
          </div>
        </form>
        <div className="flex gap-4">
          <label>
            Lv. <LevelInput value={level} onChange={setLevel} />
          </label>
          <label>
            性格 <NatureInput value={nature} onChange={setNature} />
          </label>
        </div>
      </div>
      <PokeStatDisplayTable
        baseStats={baseStats}
        ivStats={ivStats}
        evStats={evStats}
        statusStat={statusStat}
        statusError={statusError}
        handleStatusChange={handleStatusChange}
        handleEvChange={handleEvChange}
        handleIvChange={handleIvChange}
        handleBaseChange={handleBaseChange}
      />
    </div>
  );
}

type Action = (_prevState: FormState, formData: FormData) => Promise<FormState>;
const action: Action = async (prevState, formData) => {
  const name = formData.get("name");
  const res = await fetch(`/api/pokeinfo?name=${name}`);
  if (!res.ok) {
    return {
      ...prevState,
      status: "error",
    };
  }
  const json = await res.json();
  const list = json.base;
  const formatedId = json.id.toString().padStart(4, "0");
  const path = `/pokemon/${formatedId}_${json.ja}.png`;
  return {
    status: "success",
    message: `APIからの値: ${JSON.stringify(json)}`,
    iconPath: path,
    baseStats: list,
    pokeName: String(name),
  };
};
