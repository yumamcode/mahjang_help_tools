import { Meld } from "@/components/MeldInput";
import { getMaxHandLength } from "@/lib/getMaxHandLength";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

// 純手牌の入力と枚数上限チェックを管理する
const useHand = ({
  hand,
  setHand,
  melds,
  kans,
  isSeparetedLastTile,
}: {
  hand: string[];
  setHand: Dispatch<SetStateAction<string[]>>;
  melds: Meld[];
  kans: string[][];
  isSeparetedLastTile: boolean;
}) => {
  const [errorMsg, setErrorMsg] = useState<string>("");

  // 入力内容が変わったらエラーメッセージをクリアする
  useEffect(() => {
    setErrorMsg("");
  }, [hand, melds, kans]);

  // 副露・暗槓数に応じた最大枚数を超えない範囲で牌を追加する
  const addTile = (tile: string): void => {
    const meldsAndKansLength = melds.length + kans.length;
    if (
      hand.length >=
      (isSeparetedLastTile
        ? getMaxHandLength(meldsAndKansLength) - 1
        : getMaxHandLength(meldsAndKansLength))
    ) {
      setErrorMsg("純手牌は既に最大枚数です。");
      return;
    }
    setHand([...hand, tile]);
  };

  // 指定 index の牌を純手牌から削除する
  const deleteTile = (index: number): void => {
    setHand(hand.filter((_: string, i: number) => i !== index));
  };

  return { errorMsg, addTile, deleteTile };
};

export { useHand };
