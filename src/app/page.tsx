"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PokeStatDisplayTable } from "@/features/PokeStatDisplayTable";
import { LevelInput } from "@/containers/levelInput";
import { calcPokeStatusAllAsString } from "@/lib/calcPokeStatusAllAsString";
import { NatureType, StatType } from "@/types";
import { NatureInput } from "@/containers/NatureInput";
import { natureMap, natureTypes } from "@/constants/nature";
import { calcPokeIvEvStatus } from "@/lib/calcPokeIvEvStatus";
import { statTypes } from "@/constants";
import { calcPokeStatusAsString } from "@/lib/calcPokeStatusAsString";
import { PokeNameInput } from "@/containers/PokeNameInput";
import { Button } from "@/components/Button";

type FormState = {
  status: string;
  message: string;
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
  const [baseTotal, setBaseTotal] = useState<string>("0");

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

  const levelRef = useRef(level);
  const natureRef = useRef(nature);
  const baseStatsRef = useRef(baseStats);
  const statusRef = useRef(statusStat);
  const ivStatusRef = useRef(ivStats);
  const evStatusRef = useRef(evStats);

  // form受け取り時
  useEffect(() => {
    setBaseStats(state.baseStats);
  }, [state.baseStats]);

  // 種族値合計を計算する
  useEffect(() => {
    const baseSum = Object.values(baseStats).reduce(
      (acc, v) => acc + Number(v),
      0
    );
    setBaseTotal(String(baseSum));
  }, [baseStats]);

  // レベル変更時
  useEffect(() => {
    if (level === "") return;
    if (!natureTypes.includes(nature as NatureType)) return;

    const next = calcPokeStatusAllAsString({
      baseStats,
      ivStats: ivStatusRef.current,
      evStats: evStatusRef.current,
      level: Number(level),
      nature,
    });
    statusRef.current = next;
    natureRef.current = nature;
    baseStatsRef.current = { ...baseStats };
    levelRef.current = level;
    setStatusStat(next);
  }, [level, nature, baseStats]);

  // 努力値・個体値
  useEffect(() => {
    const key = statTypes.find((stat) => {
      return (
        ivStats[stat] !== ivStatusRef.current[stat] ||
        evStats[stat] !== evStatusRef.current[stat]
      );
    });

    if (key === undefined) return;

    const changedStatus = calcPokeStatusAsString(
      Number(baseStatsRef.current[key]),
      Number(ivStats[key]),
      Number(evStats[key]),
      Number(levelRef.current),
      Number(natureMap[natureRef.current][key]),
      key
    );
    setStatusStat({ ...statusRef.current, [key]: changedStatus });
    ivStatusRef.current = { ...ivStats };
    evStatusRef.current = { ...evStats };
  }, [ivStats, evStats]);

  // 実数値
  useEffect(() => {
    // どのステータスが変わったかを判定
    const key = statTypes.find(
      (stat) => statusStat[stat] !== statusRef.current[stat]
    );

    if (key === undefined) return;

    const { iv, ev, success } = calcPokeIvEvStatus(
      Number(levelRef.current),
      Number(statusStat[key]),
      Number(baseStatsRef.current[key]),
      natureMap[natureRef.current][key],
      key
    );
    if (!success) {
      return;
    }

    // 変化したステータスだけ逆算して更新
    const newIvStats = { ...ivStatusRef.current, [key]: String(iv) };
    const newEvStats = { ...evStatusRef.current, [key]: String(ev) };
    setIvStats(newIvStats);
    setEvStats(newEvStats);
    // 現在値をrefに保存
    statusRef.current = statusStat;
    ivStatusRef.current = newIvStats;
    evStatusRef.current = newEvStats;
  }, [statusStat]);

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
        handleBaseStats={setBaseStats}
        baseTotal={baseTotal}
        ivStats={ivStats}
        handleIvStats={setIvStats}
        evStats={evStats}
        handleEvStats={setEvStats}
        statusStat={statusStat}
        handleStatusStat={setStatusStat}
      />
    </div>
  );
}

type Action = (_prevState: FormState, formData: FormData) => Promise<FormState>;
const action: Action = async (_prevState, formData) => {
  const name = formData.get("name");
  const res = await fetch(`/api/pokeinfo?name=${name}`);
  const json = await res.json();
  const list = json.base;
  return {
    status: "success",
    message: `APIからの値: ${JSON.stringify(json)}`,
    iconPath: `/pokemon/${formData.get("name")}.png`,
    baseStats: list,
    pokeName: String(name),
  };
};
