"use client";

import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { PokeStatDisplayTable } from "@/features/PokeStatDisplayTable";
import { LevelInput } from "@/containers/levelInput";
import { calcPokeStatusAllAsString } from "@/lib/calcPokeStatusAllAsString";
import { StatType } from "@/types";

type FormState = {
  status: string;
  message: string;
  iconPath: string;
  baseStats: { [key in StatType]: string };
};

export default function Home() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    action,
    {
      status: "",
      message: "",
      iconPath: "",
      baseStats: {
        HP: "0",
        Atk: "0",
        Def: "0",
        SpA: "0",
        SpD: "0",
        Spe: "0",
      },
    }
  );
  const [level, setLevel] = useState<string>("50");

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

  useEffect(() => {
    if (state.baseStats === undefined) return;
    setBaseStats(state.baseStats);
  }, [state.baseStats]);

  useEffect(() => {
    const next = calcPokeStatusAllAsString({
      baseStats,
      ivStats,
      evStats,
      level,
      nature: 1.0,
    });
    setStatusStat(next);
  }, [baseStats, ivStats, evStats, level]);

  useEffect(() => {
    const baseSum = Object.values(baseStats).reduce(
      (acc, v) => acc + Number(v),
      0
    );
    setBaseTotal(String(baseSum));
  }, [baseStats]);

  return (
    <div>
      <form action={formAction}>
        <input name="name" />
        <button disabled={isPending}>Send</button>
        {state.iconPath && (
          <Image src={state.iconPath} alt="noimage" width={40} height={40} />
        )}
      </form>
      <div>
        Lv. <LevelInput value={level} onChange={setLevel} />
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
  };
};
