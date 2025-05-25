import { NatureType } from "@/types";
import { calcPokeStatus } from "./calcPokeStatus";
import { NatureMap } from "@/constants/nature";

type Props = {
  baseStats: { [key: string]: number };
  ivStats: { [key: string]: number };
  evStats: { [key: string]: number };
  level: number;
  nature: NatureType;
};

function calcPokeStatusAll({
  baseStats,
  ivStats,
  evStats,
  level,
  nature,
}: Props) {
  return {
    HP: calcPokeStatus(
      baseStats.HP,
      ivStats.HP,
      evStats.HP,
      level,
      NatureMap[nature].HP,
      "HP"
    ),
    Atk: calcPokeStatus(
      baseStats.Atk,
      ivStats.Atk,
      evStats.Atk,
      level,
      NatureMap[nature].Atk,
      "Atk"
    ),
    Def: calcPokeStatus(
      baseStats.Def,
      ivStats.Def,
      evStats.Def,
      level,
      NatureMap[nature].Def,
      "Def"
    ),
    SpA: calcPokeStatus(
      baseStats.SpA,
      ivStats.SpA,
      evStats.SpA,
      level,
      NatureMap[nature].SpA,
      "SpA"
    ),
    SpD: calcPokeStatus(
      baseStats.SpD,
      ivStats.SpD,
      evStats.SpD,
      level,
      NatureMap[nature].SpD,
      "SpD"
    ),
    Spe: calcPokeStatus(
      baseStats.Spe,
      ivStats.Spe,
      evStats.Spe,
      level,
      NatureMap[nature].Spe,
      "Spe"
    ),
  };
}

export { calcPokeStatusAll };
