import { Meld } from "@/components/MeldInput";
import {
  MAX_MELDS_AND_KANS_LENGTH,
  MELD_LENGTH,
  MELD_TYPE,
  SITUATIONALS,
  SUITS,
} from "@/src/Constant";
import { isChiable } from "@/src/isChiable";
import { TileUtil } from "@/src/TileUtil";
import { Dispatch, SetStateAction, useState } from "react";

const useMeld = ({
  melds,
  setMelds,
  kans,
  situational,
  setSituational,
}: {
  melds: Meld[];
  setMelds: Dispatch<SetStateAction<Meld[]>>;
  kans: string[][];
  situational?: string[];
  setSituational?: Dispatch<SetStateAction<string[]>>;
}) => {
  const [meldType, setMeldType] = useState<string | undefined>(undefined);
  const [errMsg, setErrMsg] = useState<string>("");

  const addMeld = (tile: string): void => {
    if (melds.length + kans.length >= MAX_MELDS_AND_KANS_LENGTH) {
      setErrMsg("これ以上副露出来ません。");
      return;
    }

    if (meldType === undefined) {
      setErrMsg("先にチー・ポン・カンのいずれかを選択してください。");
      return;
    }

    let meldTiles: string[] = [];

    if (meldType === MELD_TYPE.CHI) {
      if (TileUtil.getSuit(tile) == SUITS.ZIHAI) {
        setErrMsg("字牌はチー出来ません。");
        return;
      }

      if (!isChiable(TileUtil.getNumberString(tile))) {
        setErrMsg("チーは順子の中で最小のものを選択してください。");
        return;
      }

      const suit = TileUtil.getSuit(tile);
      const base = parseInt(TileUtil.getNumberString(tile));
      for (let i = 0; i < MELD_LENGTH.CHI; i++) {
        meldTiles.push(`${suit}${base + i}`);
      }
    } else if (meldType === MELD_TYPE.PON) {
      for (let i = 0; i < MELD_LENGTH.PON; i++) {
        meldTiles.push(tile);
      }
    } else if (meldType === MELD_TYPE.KAN) {
      for (let i = 0; i < MELD_LENGTH.KAN; i++) {
        meldTiles.push(tile);
      }
    }

    const newMeld: Meld = { meldType: meldType, meldTiles: meldTiles };

    setMelds([...melds, newMeld]);

    if (situational) {
      setSituational &&
        setSituational(
          situational.filter(
            (sit) => sit != SITUATIONALS.RICHI && sit != SITUATIONALS.W_RICHI
          )
        );
    }
    setErrMsg("");
  };

  const deleteMeld = (index: number) => {
    setMelds(melds.filter((_, i) => i !== index));
  };

  return { errMsg, meldType, setMeldType, addMeld, deleteMeld };
};

export { useMeld };
