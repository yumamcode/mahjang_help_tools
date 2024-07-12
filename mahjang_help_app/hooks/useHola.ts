import { HOLA_TYPE } from "@/src/Constant";
import { Dispatch, SetStateAction } from "react";

const useHola = ({
  setHolaTile,
  setHolaType,
}: {
  setHolaTile: Dispatch<SetStateAction<string | undefined>>;
  setHolaType: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const addTile = (t: string): void => {
    setHolaTile(t);
  };

  const deleteTile = (): void => {
    setHolaTile("");
  };

  const tsumoButtonOnClick = (): void => {
    setHolaType(HOLA_TYPE.TSUMO);
  };

  const rongButtonOnClick = (): void => {
    setHolaType(HOLA_TYPE.RONG);
  };

  return { addTile, deleteTile, tsumoButtonOnClick, rongButtonOnClick };
};

export { useHola };
