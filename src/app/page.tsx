"use client";

import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { PokeStatDisplayTable } from "@/features/PokeStatDisplayTable";
import { LevelInput } from "@/containers/levelInput";
import { calcPokeStatusAllAsString } from "@/lib/calcPokeStatusAllAsString";

export type StatType = "HP" | "Atk" | "Def" | "SpA" | "SpD" | "Spe";

type FormState = {
  status: string;
  message: string;
  iconPath: string;
  baseStats: { [key in StatType]: string };
  baseTotal: string;
};

export default function Home() {
  // const [iconPath, setIconPath] = useState<string>("");
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
      baseTotal: "0",
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
    console.log("state.baseStats", state.baseStats);
    setBaseStats(state.baseStats);
    setBaseTotal(state.baseTotal);
  }, [state.baseStats, state.baseTotal]);

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
        <div>{`status: ${state.status},  message: ${state.message}`}</div>
        {state.iconPath && (
          <Image src={state.iconPath} alt="noimage" width={50} height={50} />
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
  console.log("formData", formData);
  console.log("name", name);
  const res = await fetch(`api/pokeinfo?name=${name}`);
  console.log(res);
  const json = await res.json();
  console.log("json", json.base);
  // const list = Object.values(json.base);
  const list = json.base;
  return {
    status: "success",
    message: `APIからの値: ${JSON.stringify(json)}`,
    iconPath: `/pokemon/${formData.get("name")}.png`,
    baseStats: list,
    baseTotal: json.baseTotal,
    // baseStats: [0, 0, 0, 0, 0, 0],
  };
};
