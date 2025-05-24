import { StatType } from "@/app/page";

/**
 * ポケモンのステータス計算関数
 * @param base 種族値
 * @param iv 個体値（0-31）
 * @param ev 努力値（0-252）
 * @param level レベル（1-100）
 * @param natureMultiplier 性格補正（1.1, 1.0, 0.9）
 * @param statType ステータスの種類
 */
function calcPokeStatus(
  base: number,
  iv: number,
  ev: number,
  level: number,
  natureMultiplier: number = 1.0,
  statType: StatType
): number {
  // 努力値は4で割って小数点切り捨て
  const evEff = Math.floor(ev / 4);

  if (statType === "HP") {
    if (base === 1) {
      // HPが1のポケモンは特別な計算式を使用
      return 1;
    }
    // HPの計算式
    const baseCalc = Math.floor(((base * 2 + iv + evEff) * level) / 100);
    return baseCalc + level + 10;
  } else {
    // 攻撃・防御・特攻・特防・素早さの計算式
    const baseCalc = Math.floor(((base * 2 + iv + evEff) * level) / 100);
    const statValue = Math.floor((baseCalc + 5) * natureMultiplier);
    return statValue;
  }
}

export { calcPokeStatus };
