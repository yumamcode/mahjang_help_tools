import { Meld } from "@/components/MeldInput";
import { SHANTEN_DESCRIPTIONS } from "@/src/Constant";
import { calculateShanten, recommendDiscard } from "@/src/shantenCalculator";
import { useEffect, useState } from "react";

// シャンテン数表示に必要な計算結果と候補牌を管理する
const useShantenDisplay = ({
  hand,
  melds,
  kans,
}: {
  hand: string[];
  melds: Meld[];
  kans: string[][];
}) => {
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

  // 手牌構成が変わったら、前回のおすすめ打牌をリセットする
  useEffect(() => {
    setRecommendResult(undefined);
  }, [hand, melds, kans]);

  // 現在の入力値からシャンテン数と有効牌を計算する
  const calcShanten = () => {
    try {
      const result = calculateShanten({ hand, melds, kans });
      const shanten = result.shanten;

      if (shanten === SHANTEN_DESCRIPTIONS.HOLA) {
        setRecommendResult(undefined);
      }

      setShantenResult(shanten);
      setUsefulTileResult(result.usefulTiles);
      setErrorMsg("");

      return shanten;
    } catch (error) {
      setShantenResult(undefined);
      setUsefulTileResult(undefined);
      setErrorMsg("入力に問題があります。");
    }
  };

  // シャンテン結果をもとにおすすめ打牌を 1 つ選ぶ
  const recommendDapai = (prevShanten: number) => {
    if (prevShanten === SHANTEN_DESCRIPTIONS.HOLA) {
      return;
    }

    setRecommendResult(recommendDiscard({ hand, melds, kans }));
  };

  return {
    errorMsg,
    shantenResult,
    usefulTileResult,
    recommendResult,
    calcShanten,
    recommendDapai,
  };
};

export { useShantenDisplay };
