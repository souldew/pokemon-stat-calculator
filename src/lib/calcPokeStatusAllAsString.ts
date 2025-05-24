import { StatType } from "@/types";
import { calcPokeStatusAll } from "./calcPokeStatusAll";

type Props = {
  baseStats: { [key: string]: number | string };
  ivStats: { [key: string]: number | string };
  evStats: { [key: string]: number | string };
  level: number | string;
  nature: number;
};

type Returns = { [key in StatType]: string };

function calcPokeStatusAllAsString({
  baseStats,
  ivStats,
  evStats,
  level,
  nature,
}: Props): Returns {
  const baseStatsNums = Object.entries(baseStats).reduce((acc, [k, v]) => {
    acc[k] = typeof v === "number" ? v : Number(v);
    return acc;
  }, {} as { [key: string]: number });
  const ivStatsNums = Object.entries(ivStats).reduce((acc, [k, v]) => {
    acc[k] = Number(v);
    return acc;
  }, {} as { [key: string]: number });
  const evStatsNums = Object.entries(evStats).reduce((acc, [k, v]) => {
    acc[k] = Number(v);
    return acc;
  }, {} as { [key: string]: number });
  const levelNum = typeof level === "number" ? level : Number(level);

  const resultNums = calcPokeStatusAll({
    baseStats: baseStatsNums,
    ivStats: ivStatsNums,
    evStats: evStatsNums,
    level: levelNum,
    nature,
  });

  const result = Object.entries(resultNums).reduce((acc, [k, v]) => {
    acc[k] = typeof v === "number" ? String(v) : v;
    return acc;
  }, {} as { [key in string]: string });
  return result as { [key in StatType]: string };
}

export { calcPokeStatusAllAsString };
