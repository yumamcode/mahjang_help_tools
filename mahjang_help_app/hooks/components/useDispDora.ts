import { MAX_DISP_DORAS_LENGTH } from "@/src/Constant";
import { Dispatch, SetStateAction } from "react";

// ドラ表示牌の追加・削除を管理する
const useDispDora = ({
  dispDoras,
  setDispDoras,
}: {
  dispDoras: string[];
  setDispDoras: Dispatch<SetStateAction<string[]>>;
}) => {
  // 入力上限以内でドラ表示牌を追加する
  const addTile = (tile: string): void => {
    if (dispDoras.length < MAX_DISP_DORAS_LENGTH) {
      setDispDoras([...dispDoras, tile]);
    }
  };

  // 指定 index のドラ表示牌を削除する
  const deleteTile = (index: number): void => {
    setDispDoras(dispDoras.filter((_, i) => i !== index));
  };

  return { addTile, deleteTile };
};

export { useDispDora };
