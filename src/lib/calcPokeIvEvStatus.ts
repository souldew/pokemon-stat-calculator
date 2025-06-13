import { StatType } from "@/types";
import { calcPokeStatus } from "./calcPokeStatus";
import { calcPokeIvStatus } from "./calcPokeIv";
import { calcPokeEvStatus } from "./calcPokeEv";

function calcPokeIvEvStatus(
  level: number,
  status: number,
  base: number,
  natureMultiplier: number,
  statType: StatType
): { iv?: number; ev?: number; success: boolean } {
  const maxIv = 31;
  const minEv = 0;

  // 個体値31を計算して個体値を減らすか、努力値を増やすかを確認する
  const statusEv0 = calcPokeStatus(
    base,
    maxIv,
    minEv,
    level,
    natureMultiplier,
    statType
  );

  // 努力値0のよりも能力値が小さい場合は個体値を調整する
  if (statusEv0 >= status) {
    const { iv, success } = calcPokeIvStatus(
      level,
      status,
      base,
      natureMultiplier,
      statType
    );
    return success ? { iv, ev: minEv, success } : { iv, success };
  } else {
    // 努力値を調整する
    const { ev, success } = calcPokeEvStatus(
      level,
      status,
      base,
      natureMultiplier,
      statType
    );

    return success ? { iv: maxIv, ev, success } : { success: false };
  }
}

export { calcPokeIvEvStatus };
