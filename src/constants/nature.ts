import { NatureType, StatType } from "@/types";

export const natureTypes = [
  "さみしがり",
  "いじっぱり",
  "やんちゃ",
  "ゆうかん",
  "ずぶとい",
  "わんぱく",
  "のうてんき",
  "のんき",
  "ひかえめ",
  "おっとり",
  "うっかりや",
  "れいせい",
  "おだやか",
  "おとなしい",
  "しんちょう",
  "なまいき",
  "おくびょう",
  "せっかち",
  "ようき",
  "むじゃき",
  "がんばりや",
  "すなお",
  "てれや",
  "きまぐれ",
  "まじめ",
] as const;

export const natureMap: {
  [key in NatureType]: { [key in StatType]: number };
} = {
  さみしがり: {
    HP: 1.0,
    Atk: 1.1,
    Def: 0.9,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.0,
  },
  いじっぱり: {
    HP: 1.0,
    Atk: 1.1,
    Def: 1.0,
    SpA: 0.9,
    SpD: 1.0,
    Spe: 1.0,
  },
  やんちゃ: {
    HP: 1.0,
    Atk: 1.1,
    Def: 1.0,
    SpA: 1.0,
    SpD: 0.9,
    Spe: 1.0,
  },
  ゆうかん: {
    HP: 1.0,
    Atk: 1.1,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 0.9,
  },
  ずぶとい: {
    HP: 1.0,
    Atk: 0.9,
    Def: 1.1,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.0,
  },
  わんぱく: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.1,
    SpA: 0.9,
    SpD: 1.0,
    Spe: 1.0,
  },
  のうてんき: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.1,
    SpD: 0.9,
    Spe: 1.0,
  },
  のんき: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.1,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 0.9,
  },
  ひかえめ: {
    HP: 1.0,
    Atk: 0.9,
    Def: 1.0,
    SpA: 1.1,
    SpD: 1.0,
    Spe: 1.0,
  },
  おっとり: {
    HP: 1.0,
    Atk: 1.0,
    Def: 0.9,
    SpA: 1.1,
    SpD: 1.0,
    Spe: 1.0,
  },
  うっかりや: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.1,
    SpD: 0.9,
    Spe: 1.0,
  },
  れいせい: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.1,
    SpD: 1.1,
    Spe: 0.9,
  },
  おだやか: {
    HP: 1.0,
    Atk: 0.9,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.1,
    Spe: 1.0,
  },
  おとなしい: {
    HP: 1.0,
    Atk: 1.0,
    Def: 0.9,
    SpA: 1.0,
    SpD: 1.1,
    Spe: 1.0,
  },
  しんちょう: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.1,
    Spe: 1.0,
  },
  なまいき: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.1,
    Spe: 0.9,
  },
  おくびょう: {
    HP: 1.0,
    Atk: 0.9,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.1,
  },
  せっかち: {
    HP: 1.0,
    Atk: 1.0,
    Def: 0.9,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.1,
  },
  ようき: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 0.9,
    SpD: 1.0,
    Spe: 1.1,
  },
  むじゃき: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.0,
    SpD: 0.9,
    Spe: 1.1,
  },
  がんばりや: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.0,
  },
  すなお: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.0,
  },
  てれや: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.0,
  },
  きまぐれ: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.0,
  },
  まじめ: {
    HP: 1.0,
    Atk: 1.0,
    Def: 1.0,
    SpA: 1.0,
    SpD: 1.0,
    Spe: 1.0,
  },
};

export const natureAlias: { [key in string]: NatureType } = {
  // A補正
  寂しがり: "さみしがり",
  さみしがり: "さみしがり",
  意地: "いじっぱり",
  意地っ張り: "いじっぱり",
  いじっぱり: "いじっぱり",
  やんちゃ: "やんちゃ",
  勇敢: "ゆうかん",
  ゆうかん: "ゆうかん",
  // B補正
  図太い: "ずぶとい",
  ずぶとい: "ずぶとい",
  腕白: "わんぱく",
  わんぱく: "わんぱく",
  能天気: "のうてんき",
  のうてんき: "のうてんき",
  呑気: "のんき",
  のんき: "のんき",
  // C補正
  控えめ: "ひかえめ",
  控え目: "ひかえめ",
  ひかえめ: "ひかえめ",
  おっとり: "おっとり",
  うっかりや: "うっかりや",
  冷静: "れいせい",
  れいせい: "れいせい",
  // D補正
  穏やか: "おだやか",
  おだやか: "おだやか",
  大人しい: "おとなしい",
  おとなしい: "おとなしい",
  慎重: "しんちょう",
  しんちょう: "しんちょう",
  生意気: "なまいき",
  なまいき: "なまいき",
  // S補正
  臆病: "おくびょう",
  おくびょう: "おくびょう",
  せっかち: "せっかち",
  陽気: "ようき",
  ようき: "ようき",
  無邪気: "むじゃき",
  むじゃき: "むじゃき",
  // 無補正
  頑張り屋: "がんばりや",
  がんばりや: "がんばりや",
  素直: "すなお",
  すなお: "すなお",
  照れ屋: "てれや",
  てれや: "てれや",
  気まぐれ: "きまぐれ",
  気紛れ: "きまぐれ",
  きまぐれ: "きまぐれ",
  真面目: "まじめ",
  まじめ: "まじめ",
};
