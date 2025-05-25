import { StatType } from "@/types";
import { calcPokeStatus } from "./calcPokeStatus";

function calcPokeIvStatus(
  level: number,
  status: number,
  base: number,
  natureMultiplier: number,
  statType: StatType
): { iv?: number; success: boolean } {
  const ivCandidate = [...Array(32).keys()]; // 0-31の個体値候補
  const ivs = ivCandidate.filter((iv) => {
    const calcStatus = calcPokeStatus(
      base,
      iv,
      0,
      level,
      natureMultiplier,
      statType
    );
    return calcStatus === status;
  });

  if (ivs.length === 0) {
    return { success: false }; // 個体値が見つからない場合
  } else {
    // TODO: フィルタ等の実装
    return { iv: ivs[ivs.length - 1], success: true }; // 最大の個体値を返す
  }
}

export { calcPokeIvStatus };
