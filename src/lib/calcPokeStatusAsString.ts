import { StatType } from "@/types";
import { calcPokeStatus } from "./calcPokeStatus";

function calcPokeStatusAsString(
  base: number,
  iv: number,
  ev: number,
  level: number,
  natureMultiplier: number,
  statType: StatType
): string {
  return calcPokeStatus(
    base,
    iv,
    ev,
    level,
    natureMultiplier,
    statType
  ).toString();
}

export { calcPokeStatusAsString };
