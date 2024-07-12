import { Meld } from "@/components/MeldInput";
import {
  AKADORA_NUMBER_FOR_CONVINIENCE,
  AKADORA_NUMBER_IN_FACT,
  HOLA_TYPE,
  MELD_FROM_CODE,
  MIN_LENGTH_AKADORA,
  NUMBER_5TH_TILES,
  SITUATIONALS,
  SUITS,
  WINDS,
} from "@/src/Constant";
import { getMaxHandLength } from "@/src/getMaxHandLength";
import { TileUtil } from "@/src/TileUtil";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ScoreResult = {
  fu: number;
  fanshu: number;
  defen: number;
  hupai?: Role[];
};

type Role = {
  name: string;
  fanshu: number;
};

const useScoreDisplay = ({
  roundWind,
  seatWind,
  holaTile,
  holaType,
  hand,
  setHand,
  melds,
  setMelds,
  kans,
  setKans,
  dispDoras,
  dispUraDoras,
  akaDoras,
  situational,
}: {
  roundWind: string | undefined;
  seatWind: string | undefined;
  holaTile: string | undefined;
  holaType: string | undefined;
  hand: string[];
  setHand: Dispatch<SetStateAction<string[]>>;
  melds: Meld[];
  setMelds: Dispatch<SetStateAction<Meld[]>>;
  kans: string[][];
  setKans: Dispatch<SetStateAction<string[][]>>;
  dispDoras: string[];
  dispUraDoras: string[];
  akaDoras: number;
  situational: string[];
}) => {
  const [result, setResult] = useState<ScoreResult | undefined>(undefined);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setResult(undefined);
  }, [
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
  ]);

  useEffect(() => {
    setMsg("");
  }, [holaTile, holaType, hand]);

  const calculateScore = (): void => {
    if (!holaTile) {
      setMsg("上がり牌を選択してください。");
      return;
    }

    if (!holaType) {
      setMsg("上がり方を選択してください。");
      return;
    }

    let sumOfHandAndHolaTile = 0;

    sumOfHandAndHolaTile = hand.length;

    if (holaTile) {
      sumOfHandAndHolaTile++;
    }

    if (sumOfHandAndHolaTile < getMaxHandLength(melds.length + kans.length)) {
      setMsg("手牌の枚数が不足しています。");
      return;
    }
    try {
      let restOfAkadora = akaDoras;
      let handTiles = hand.join("");
      if (holaType === HOLA_TYPE.TSUMO) {
        handTiles += holaTile;
      }

      handTiles = handTiles.replace(
        // "m5","p5","s5"が置換対象
        /([mps])5/g,
        (tile: string) => {
          if (restOfAkadora <= 0) {
            return TileUtil.getSuit(tile) + String(AKADORA_NUMBER_IN_FACT);
          }

          restOfAkadora--;
          return (
            TileUtil.getSuit(tile) + String(AKADORA_NUMBER_FOR_CONVINIENCE)
          );
        }
      );

      let meldTiles = melds
        .flatMap(
          (meld: Meld) =>
            TileUtil.getSuit(meld.meldTiles[0]) +
            meld.meldTiles.join("").replace(/[a-z]/g, "") +
            MELD_FROM_CODE.LEFT
        )
        .join(",");

      const replaceToAkaDora = (tilesStr: string, numOfReplace: number) => {
        return tilesStr
          .split(",")
          .map((tiles: string) => {
            if (tiles.startsWith(SUITS.ZIHAI)) {
              return tiles;
            } else {
              return tiles.replace(/5/g, () => {
                if (numOfReplace <= 0) {
                  return String(AKADORA_NUMBER_IN_FACT);
                }
                numOfReplace--;
                restOfAkadora = numOfReplace;
                return String(AKADORA_NUMBER_FOR_CONVINIENCE);
              });
            }
          })
          .join(",");
      };

      meldTiles = replaceToAkaDora(meldTiles, restOfAkadora);

      let kanTiles = kans
        .flatMap(
          (kan: string[]) =>
            TileUtil.getSuit(kan[0]) + kan.join("").replace(/[a-z]/g, "")
        )
        .join(",");

      kanTiles = replaceToAkaDora(kanTiles, restOfAkadora);

      let allTiles = handTiles;
      if (meldTiles != "") {
        allTiles += `,${meldTiles}`;
      }
      if (kanTiles != "") {
        allTiles += `,${kanTiles}`;
      }

      const Majiang = require("@kobalab/majiang-core");

      const rule = Majiang.rule();

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
            holaTile &&
            NUMBER_5TH_TILES.includes(holaTile)
          ? holaTile.replace(/5/, String(AKADORA_NUMBER_FOR_CONVINIENCE)) +
            MELD_FROM_CODE.LEFT
          : holaTile + MELD_FROM_CODE.LEFT,
        {
          rule: rule,
          zhuangfeng:
            roundWind === WINDS.TON
              ? 0
              : roundWind === WINDS.NAN
              ? 1
              : roundWind === WINDS.SHA
              ? 2
              : 3,
          menfeng:
            seatWind === WINDS.TON
              ? 0
              : seatWind === WINDS.NAN
              ? 1
              : seatWind === WINDS.SHA
              ? 2
              : 3,
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
        }
      );

      if (!result) {
        setMsg("点数を計算するためのデータが不足しています。");
        setResult(undefined);
        return;
      }

      setMsg("");
      setResult(result);
      return;
    } catch (error) {
      setMsg("点数を計算するためのデータが不足しています。");
      setResult(undefined);
      return;
    }
  };

  const copyInputTiles = (): void => {
    localStorage.setItem("handInput", JSON.stringify(hand));
    localStorage.setItem("meldsInput", JSON.stringify(melds));
    localStorage.setItem("kansInput", JSON.stringify(kans));

    alert("牌情報をコピーしました。");
  };

  const pasteInputTiles = (): void => {
    const handInputOnLocalStorage = localStorage.getItem("handInput");
    const meldsInputOnLocalStorage = localStorage.getItem("meldsInput");
    const kansInputOnLocalStorage = localStorage.getItem("kansInput");

    handInputOnLocalStorage && setHand(JSON.parse(handInputOnLocalStorage));
    meldsInputOnLocalStorage && setMelds(JSON.parse(meldsInputOnLocalStorage));
    kansInputOnLocalStorage && setKans(JSON.parse(kansInputOnLocalStorage));

    alert("牌情報を貼り付けました。");
  };

  return { result, msg, copyInputTiles, pasteInputTiles, calculateScore };
};

export { useScoreDisplay };
