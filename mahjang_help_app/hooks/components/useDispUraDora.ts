import { MAX_DISP_DORAS_LENGTH } from "@/lib/constants/Constant";
import { Dispatch, SetStateAction } from "react";

// 裏ドラ表示牌の追加・削除を管理する
const useDispUraDora = ({
  dispUraDoras,
  setDispUraDoras,
}: {
  dispUraDoras: string[];
  setDispUraDoras: Dispatch<SetStateAction<string[]>>;
}) => {
  // 入力上限以内で裏ドラ表示牌を追加する
  const addTile = (tile: string): void => {
    if (dispUraDoras.length < MAX_DISP_DORAS_LENGTH) {
      setDispUraDoras([...dispUraDoras, tile]);
    }
  };

  // 指定 index の裏ドラ表示牌を削除する
  const deleteTile = (index: number): void => {
    setDispUraDoras(dispUraDoras.filter((_, i) => i !== index));
  };

  return { addTile, deleteTile };
};

export { useDispUraDora };
