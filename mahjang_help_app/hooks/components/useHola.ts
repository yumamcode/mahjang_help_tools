import { HOLA_TYPE } from "@/src/Constant";
import { Dispatch, SetStateAction } from "react";

// 上がり牌と上がり方の入力を管理する
const useHola = ({
  setHolaTile,
  setHolaType,
}: {
  setHolaTile: Dispatch<SetStateAction<string | undefined>>;
  setHolaType: Dispatch<SetStateAction<string | undefined>>;
}) => {
  // 上がり牌を 1 枚選択する
  const addTile = (t: string): void => {
    setHolaTile(t);
  };

  // 選択済みの上がり牌をクリアする
  const deleteTile = (): void => {
    setHolaTile("");
  };

  // 上がり方をツモに設定する
  const tsumoButtonOnClick = (): void => {
    setHolaType(HOLA_TYPE.TSUMO);
  };

  // 上がり方をロンに設定する
  const rongButtonOnClick = (): void => {
    setHolaType(HOLA_TYPE.RONG);
  };

  return { addTile, deleteTile, tsumoButtonOnClick, rongButtonOnClick };
};

export { useHola };
