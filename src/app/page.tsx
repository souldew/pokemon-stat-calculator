"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { PokeStatDisplayTable } from "@/features/PokeStatDisplayTable";
import { LevelInput } from "@/containers/levelInput";
import { NatureType, StatType } from "@/types";
import { NatureInput } from "@/containers/NatureInput";
import { PokeNameInput } from "@/containers/PokeNameInput";
import { Button } from "@/components/Button";
import { useStatus } from "@/hooks/useStatus";

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

  const status = {
    HP: useStatus({
      stat: "HP",
      level: level,
      nature,
      actionState: state.baseStats.HP,
    }),
    Atk: useStatus({
      stat: "Atk",
      level: level,
      nature,
      actionState: state.baseStats.Atk,
    }),
    Def: useStatus({
      stat: "Def",
      level: level,
      nature,
      actionState: state.baseStats.Def,
    }),
    SpA: useStatus({
      stat: "SpA",
      level: level,
      nature,
      actionState: state.baseStats.SpA,
    }),
    SpD: useStatus({
      stat: "SpD",
      level: level,
      nature,
      actionState: state.baseStats.SpD,
    }),
    Spe: useStatus({
      stat: "Spe",
      level: level,
      nature,
      actionState: state.baseStats.Spe,
    }),
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
      <PokeStatDisplayTable status={status} />
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
