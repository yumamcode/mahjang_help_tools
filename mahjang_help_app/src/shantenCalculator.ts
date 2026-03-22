import type { Meld } from "@/components/MeldInput";
import {
  MAX_HAND_LENGTH_WITH_MELDS_AND_KANS,
  SHANTEN_DESCRIPTIONS,
} from "@/src/Constant";
import {
  joinSerializedParts,
  serializeKans,
  serializeMelds,
  serializeTiles,
} from "@/src/mahjongSerializer";

type ShantenCalculationInput = {
  hand: string[];
  melds: Meld[];
  kans: string[][];
};

type ShantenCalculationResult = {
  shanten: number;
  usefulTiles: string[];
};

type Recommend = {
  daopai: string;
  shanten: number;
  usefulTiles: string[];
};

// 手牌・副露・暗槓からシャンテン数と有効牌を計算する
const calculateShanten = ({
  hand,
  melds,
  kans,
}: ShantenCalculationInput): ShantenCalculationResult => {
  const Majiang = require("@kobalab/majiang-core");
  const shoupai = Majiang.Shoupai.fromString(
    serializeTiles({ hand, melds, kans }),
  );

  return {
    shanten: Majiang.Util.xiangting(shoupai),
    usefulTiles: Majiang.Util.tingpai(shoupai) ?? [],
  };
};

// 現在の 14 枚手牌から最も効率の良い打牌候補を 1 つ返す
const recommendDiscard = ({
  hand,
  melds,
  kans,
}: ShantenCalculationInput): string | undefined => {
  if (hand.length === 0) {
    return undefined;
  }

  const shantenResult = calculateShanten({ hand, melds, kans });

  if (shantenResult.shanten === SHANTEN_DESCRIPTIONS.HOLA) {
    return undefined;
  }

  const maxHandLengthArray = Array.from(
    MAX_HAND_LENGTH_WITH_MELDS_AND_KANS.values(),
  );

  if (!maxHandLengthArray.includes(hand.length)) {
    return undefined;
  }

  const Majiang = require("@kobalab/majiang-core");
  const meldTiles = serializeMelds(melds);
  const kanTiles = serializeKans(kans);
  const checkedTiles: string[] = [];
  const recommends: Recommend[] = [];

  for (const daopai of hand) {
    if (checkedTiles.includes(daopai)) {
      continue;
    }

    const firstIndexOfDaopai = hand.indexOf(daopai);
    const afterDaopai = hand.toSpliced(firstIndexOfDaopai, 1);
    const allTiles = joinSerializedParts(
      afterDaopai.join(""),
      meldTiles,
      kanTiles,
    );
    const shoupai = Majiang.Shoupai.fromString(allTiles);

    recommends.push({
      daopai,
      shanten: Majiang.Util.xiangting(shoupai),
      usefulTiles: Majiang.Util.tingpai(shoupai) ?? [],
    });
    checkedTiles.push(daopai);
  }

  recommends.sort((a, b) => {
    if (a.shanten !== b.shanten) {
      return a.shanten - b.shanten;
    }

    return b.usefulTiles.length - a.usefulTiles.length;
  });

  return recommends[0]?.daopai;
};

export { calculateShanten, recommendDiscard };
export type { ShantenCalculationInput, ShantenCalculationResult };
