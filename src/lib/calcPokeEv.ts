import { StatType } from "@/types";
import { calcPokeStatus } from "./calcPokeStatus";

function calcPokeEvStatus(
  level: number,
  status: number,
  base: number,
  natureMultiplier: number,
  statType: StatType
): { ev?: number; success: boolean } {
  const evIncrement = 4; // 努力値は4の倍数で増加
  const candidateCnt = 64; // 努力値の候補数（0から252までの4の倍数）
  const maxIv = 31;

  const evCandidate = Array.from(
    { length: candidateCnt },
    (_, i) => i * evIncrement
  ); // 0から252までの努力値候補（4の倍数）
  const evs = evCandidate.filter((ev) => {
    const calcStatus = calcPokeStatus(
      base,
      maxIv,
      ev,
      level,
      natureMultiplier,
      statType
    );
    return calcStatus === status;
  });

  if (evs.length === 0) {
    return { success: false }; // 努力値が見つからない場合は0を返す
  } else {
    // TODO: フィルタ等の実装
    return { ev: evs[0], success: true }; // 最小の努力値を返す
  }
}

export { calcPokeEvStatus };
