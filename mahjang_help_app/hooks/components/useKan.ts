import { Meld } from "@/components/MeldInput";
import { MAX_MELDS_AND_KANS_LENGTH } from "@/src/Constant";
import { Dispatch, SetStateAction, useState } from "react";

// 暗槓の追加・削除と入力上限チェックを管理する
const useKan = ({
  kans,
  setKans,
  melds,
}: {
  kans: string[][];
  setKans: Dispatch<SetStateAction<string[][]>>;
  melds: Meld[];
}) => {
  const [msg, setMsg] = useState("");

  // 副露数との合計上限を超えない範囲で暗槓を追加する
  const addKan = (tile: string): void => {
    if (melds.length + kans.length >= MAX_MELDS_AND_KANS_LENGTH) {
      setMsg("これ以上暗槓出来ません。");
      return;
    }
    setKans([...kans, [tile, tile, tile, tile]]);
  };

  // 指定 index の暗槓を削除する
  const deleteKan = (index: number): void => {
    setKans(kans.filter((_, i) => i !== index));
  };

  return { msg, addKan, deleteKan };
};

export { useKan };
