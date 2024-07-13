import { Meld } from "@/components/MeldInput";
import { getMaxHandLength } from "@/src/getMaxHandLength";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

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

  useEffect(() => {
    setErrorMsg("");
  }, [hand, melds, kans]);

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

  const deleteTile = (index: number): void => {
    setHand(hand.filter((_: string, i: number) => i !== index));
  };

  return { errorMsg, addTile, deleteTile };
};

export { useHand };
