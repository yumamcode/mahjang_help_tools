import type { Meld } from "@/components/MeldInput";
import {
  HOLA_TYPE,
  MELD_FROM_CODE,
  MIN_LENGTH_AKADORA,
  AKADORA_NUMBER_FOR_CONVINIENCE,
  NUMBER_5TH_TILES,
  SITUATIONALS,
} from "@/lib/constants/Constant";
import { replaceWithAkadora, toWindCode } from "@/lib/scoreCalculatorHelpers";
import { getMaxHandLength } from "@/lib/getMaxHandLength";
import {
  joinSerializedParts,
  serializeHand,
  serializeKans,
  serializeMelds,
} from "@/src/mahjongSerializer";

type Role = {
  name: string;
  fanshu: number;
};

type ScoreResult = {
  fu: number;
  fanshu: number;
  defen: number;
  hupai?: Role[];
};

type ScoreCalculationInput = {
  roundWind: string | undefined;
  seatWind: string | undefined;
  holaTile: string | undefined;
  holaType: string | undefined;
  hand: string[];
  melds: Meld[];
  kans: string[][];
  dispDoras: string[];
  dispUraDoras: string[];
  akaDoras: number;
  situational: string[];
};

type ScoreCalculationOutput = {
  result?: ScoreResult;
  msg: string;
};

// UI の入力値を検証・整形して、点数計算結果を返す
const calculateScore = ({
  roundWind,
  seatWind,
  holaTile,
  holaType,
  hand,
  melds,
  kans,
  dispDoras,
  dispUraDoras,
  akaDoras,
  situational,
}: ScoreCalculationInput): ScoreCalculationOutput => {
  if (!holaTile) {
    return { msg: "上がり牌を選択してください。" };
  }

  if (!holaType) {
    return { msg: "上がり方を選択してください。" };
  }

  const handLengthWithHola = hand.length + 1;

  if (handLengthWithHola < getMaxHandLength(melds.length + kans.length)) {
    return { msg: "手牌の枚数が不足しています。" };
  }

  try {
    let restOfAkadora = akaDoras;
    let handTiles = serializeHand(hand);

    // ツモ上がりなら手牌にツモ牌を加える。
    if (holaType === HOLA_TYPE.TSUMO) {
      handTiles += holaTile;
    }

    // 手牌中の数牌 5 を赤ドラ表現へ置き換える
    const handConversion = replaceWithAkadora(handTiles, restOfAkadora);
    handTiles = handConversion.convertedTiles;
    restOfAkadora = handConversion.restOfAkadora;

    // チー・ポンに 5 がある場合
    const meldConversion = replaceWithAkadora(
      serializeMelds(melds),
      restOfAkadora,
    );
    restOfAkadora = meldConversion.restOfAkadora;

    // カンに 5 がある場合
    const kanConversion = replaceWithAkadora(
      serializeKans(kans),
      restOfAkadora,
    );
    restOfAkadora = kanConversion.restOfAkadora;

    const allTiles = joinSerializedParts(
      handTiles,
      meldConversion.convertedTiles,
      kanConversion.convertedTiles,
    );

    const Majiang = require("@kobalab/majiang-core");
    const rule = Majiang.rule();

    //処理を簡略化するため、便宜的に各種3枚ずつの計9枚にしているが、最大値は3枚までにしている。
    rule.赤牌 = {
      m: 3,
      p: 3,
      s: 3,
    };

    const richi = situational.includes(SITUATIONALS.RICHI);
    const wRichi = situational.includes(SITUATIONALS.W_RICHI);
    const ippatsu = situational.includes(SITUATIONALS.IPPATSU);
    const chankan = situational.includes(SITUATIONALS.CHANKAN);
    const rinshan = situational.includes(SITUATIONALS.RINSHAN);
    const haitei = situational.includes(SITUATIONALS.HAITEI);
    const houtei = situational.includes(SITUATIONALS.HOTEI);

    const result: ScoreResult = Majiang.Util.hule(
      Majiang.Shoupai.fromString(allTiles),
      holaType === HOLA_TYPE.TSUMO
        ? null
        : restOfAkadora > MIN_LENGTH_AKADORA &&
            NUMBER_5TH_TILES.includes(holaTile)
          ? holaTile.replace(/5/, String(AKADORA_NUMBER_FOR_CONVINIENCE)) +
            MELD_FROM_CODE.LEFT
          : holaTile + MELD_FROM_CODE.LEFT,
      {
        rule,
        zhuangfeng: toWindCode(roundWind),
        menfeng: toWindCode(seatWind),
        hupai: {
          lizhi: wRichi ? 2 : richi ? 1 : 0,
          yifa: ippatsu,
          qianggang: chankan,
          lingshang: rinshan,
          haidi: houtei ? 2 : haitei ? 1 : 0,
          tianhu: 0,
        },
        baopai: dispDoras,
        fubaopai: richi || wRichi ? dispUraDoras : [],
        jicun: {
          changbang: 0,
          lizhibang: 0,
        },
      },
    );

    if (!result) {
      return { msg: "点数を計算するためのデータが不足しています。" };
    }

    return { result, msg: "" };
  } catch (error) {
    return { msg: "点数を計算するためのデータが不足しています。" };
  }
};

export { calculateScore };
export type { ScoreCalculationInput, ScoreResult };
