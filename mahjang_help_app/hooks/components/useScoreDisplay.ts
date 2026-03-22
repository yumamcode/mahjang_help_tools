import { Meld } from "@/components/MeldInput";
import {
  calculateScore as calculateScoreResult,
  ScoreResult,
} from "@/src/scoreCalculator";
import { useEffect, useState } from "react";

// 点数表示に必要な計算結果とメッセージ状態を管理する
const useScoreDisplay = ({
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
}: {
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
}) => {
  const [result, setResult] = useState<ScoreResult | undefined>(undefined);
  const [msg, setMsg] = useState("");

  // 入力値が変わったら、前回の点数計算結果をクリアする
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

  // 必須入力が更新されたらエラーメッセージをクリアする
  useEffect(() => {
    setMsg("");
  }, [holaTile, holaType, hand]);

  // 現在の入力値で点数計算を実行し、結果またはエラーメッセージを反映する
  const calculateScore = (): void => {
    const scoreCalculation = calculateScoreResult({
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
    });

    if (!scoreCalculation.result) {
      setMsg(scoreCalculation.msg);
      setResult(undefined);
      return;
    }

    setMsg("");
    setResult(scoreCalculation.result);
  };

  return { result, msg, calculateScore };
};

export { useScoreDisplay };
