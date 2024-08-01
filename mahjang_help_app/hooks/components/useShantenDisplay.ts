import { Meld } from "@/components/MeldInput";
import {
  MAX_HAND_LENGTH_WITH_MELDS_AND_KANS,
  MELD_FROM_CODE,
  SHANTEN_DESCRIPTIONS,
} from "@/src/Constant";
import { TileUtil } from "@/src/TileUtil";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useShantenDisplay = ({
  hand,
  setHand,
  melds,
  setMelds,
  kans,
  setKans,
}: {
  hand: string[];
  setHand: Dispatch<SetStateAction<string[]>>;
  melds: Meld[];
  setMelds: Dispatch<SetStateAction<Meld[]>>;
  kans: string[][];
  setKans: Dispatch<SetStateAction<string[][]>>;
}) => {
  const Majiang = require("@kobalab/majiang-core");
  const [shantenResult, setShantenResult] = useState<number | undefined>(
    undefined
  );
  const [usefulTileResult, setUsefulTileResult] = useState<
    string[] | undefined
  >(undefined);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [recommendResult, setRecommendResult] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setRecommendResult(undefined);
  }, [hand, melds, kans]);

  const calcShanten = () => {
    try {
      const handTiles = hand.join("");
      const meldTiles = melds
        .flatMap(
          (meld) =>
            TileUtil.getSuit(meld.meldTiles[0]) +
            meld.meldTiles.join("").replace(/[a-z]/g, "") +
            MELD_FROM_CODE.LEFT
        )
        .join(",");
      const kanTiles = kans
        .flatMap(
          (kan) => TileUtil.getSuit(kan[0]) + kan.join("").replace(/[a-z]/g, "")
        )
        .join(",");

      let allTiles = handTiles;

      if (meldTiles != "") {
        allTiles += `,${meldTiles}`;
      }

      if (kanTiles != "") {
        allTiles += `,${kanTiles}`;
      }

      const shoupai = Majiang.Shoupai.fromString(allTiles);

      const shanten = Majiang.Util.xiangting(shoupai);

      if (shanten == SHANTEN_DESCRIPTIONS.HOLA) {
        setRecommendResult(undefined);
      }

      setShantenResult(shanten);
      setUsefulTileResult(Majiang.Util.tingpai(shoupai));
      setErrorMsg("");

      return shanten;
    } catch (error) {
      setShantenResult(undefined);
      setUsefulTileResult(undefined);
      setErrorMsg("入力に問題があります。");
    }
  };

  const copyInputTiles = () => {
    localStorage.setItem("handInput", JSON.stringify(hand));
    localStorage.setItem("meldsInput", JSON.stringify(melds));
    localStorage.setItem("kansInput", JSON.stringify(kans));

    alert("牌情報をコピーしました。");
  };

  const pasteInputTiles = () => {
    const handInputOnLocalStorage = localStorage.getItem("handInput");
    const meldsInputOnLocalStorage = localStorage.getItem("meldsInput");
    const kansInputOnLocalStorage = localStorage.getItem("kansInput");

    handInputOnLocalStorage && setHand(JSON.parse(handInputOnLocalStorage));
    meldsInputOnLocalStorage && setMelds(JSON.parse(meldsInputOnLocalStorage));
    kansInputOnLocalStorage && setKans(JSON.parse(kansInputOnLocalStorage));

    alert("牌情報を貼り付けました。");
  };

  type Recommend = {
    daopai: string;
    shanten: number;
    usefulTiles: string[];
  };
  const recommendDapai = (prevShanten: number) => {
    if (prevShanten == SHANTEN_DESCRIPTIONS.HOLA) {
      return;
    }

    const maxHandLengthArray = Array.from(
      MAX_HAND_LENGTH_WITH_MELDS_AND_KANS.values()
    );

    if (!maxHandLengthArray.includes(hand.length)) {
      //純手牌が最大枚数でないならreturnして終了
      return;
    }

    const daopais: string[] = [];
    const recommends: Recommend[] = [];

    const meldTiles = melds
      .flatMap(
        (meld) =>
          meld.meldTiles[0][0] +
          meld.meldTiles.join("").replace(/[a-zA-Z]/g, "") +
          "-"
      )
      .join(",");

    const kanTiles = kans
      .flatMap((kan) => kan[0][0] + kan.join("").replace(/[a-zA-Z]/g, ""))
      .join(",");

    for (let daopai of hand) {
      if (daopais.includes(daopai)) {
        continue;
      }

      const firstIndexOfDaopai = hand.indexOf(daopai);

      const afterDaopai = hand.toSpliced(firstIndexOfDaopai, 1);

      let allTiles = afterDaopai.join("");

      if (meldTiles != "") {
        allTiles += `,${meldTiles}`;
      }

      if (kanTiles != "") {
        allTiles += `,${kanTiles}`;
      }

      const shoupai = Majiang.Shoupai.fromString(allTiles);

      const shanten = Majiang.Util.xiangting(shoupai);

      const usefulTiles = Majiang.Util.tingpai(shoupai);

      const recommend = {
        daopai: daopai,
        shanten: shanten,
        usefulTiles: usefulTiles,
      };

      daopais.push(daopai);
      recommends.push(recommend);
    }

    recommends.sort((a: Recommend, b: Recommend) => {
      if (a.shanten < b.shanten) {
        return -1;
      }

      if (a.shanten > b.shanten) {
        return 1;
      }

      if (!a.usefulTiles || !b.usefulTiles) {
        return 0;
      }

      if (a.usefulTiles.length < b.usefulTiles.length) {
        return 1;
      }

      if (a.usefulTiles.length > b.usefulTiles.length) {
        return -1;
      }

      return 0;
    });

    setRecommendResult(recommends[0].daopai);
  };
  return {
    errorMsg,
    shantenResult,
    usefulTileResult,
    recommendResult,
    calcShanten,
    recommendDapai,
    copyInputTiles,
    pasteInputTiles,
  };
};

export { useShantenDisplay };
