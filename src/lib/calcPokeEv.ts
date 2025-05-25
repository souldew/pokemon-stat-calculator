import { StatType } from "@/types";
import { calcPokeStatus } from "./calcPokeStatus";

function calcPokeEvStatus(
  level: number,
  status: number,
  base: number,
  natureMultiplier: number,
  statType: StatType
): { ev?: number; success: boolean } {
  const evCandidate = Array.from({ length: 64 }, (_, i) => i * 4);
  const evs = evCandidate.filter((ev) => {
    const calcStatus = calcPokeStatus(
      base,
      31,
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
