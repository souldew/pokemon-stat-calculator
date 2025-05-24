import { calcPokeStatus } from "./calcPokeStatus";

type Props = {
  baseStats: { [key: string]: number };
  ivStats: { [key: string]: number };
  evStats: { [key: string]: number };
  level: number;
  nature: number;
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
      nature,
      "HP"
    ),
    Atk: calcPokeStatus(
      baseStats.Atk,
      ivStats.Atk,
      evStats.Atk,
      level,
      nature,
      "Atk"
    ),
    Def: calcPokeStatus(
      baseStats.Def,
      ivStats.Def,
      evStats.Def,
      level,
      nature,
      "Def"
    ),
    SpA: calcPokeStatus(
      baseStats.SpA,
      ivStats.SpA,
      evStats.SpA,
      level,
      nature,
      "SpA"
    ),
    SpD: calcPokeStatus(
      baseStats.SpD,
      ivStats.SpD,
      evStats.SpD,
      level,
      nature,
      "SpD"
    ),
    Spe: calcPokeStatus(
      baseStats.Spe,
      ivStats.Spe,
      evStats.Spe,
      level,
      nature,
      "Spe"
    ),
  };
}

export { calcPokeStatusAll };
