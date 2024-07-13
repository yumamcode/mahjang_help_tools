import { MAX_DISP_DORAS_LENGTH } from "@/src/Constant";
import { Dispatch, SetStateAction } from "react";

const useDispDora = ({
  dispDoras,
  setDispDoras,
}: {
  dispDoras: string[];
  setDispDoras: Dispatch<SetStateAction<string[]>>;
}) => {
  const addTile = (tile: string): void => {
    if (dispDoras.length < MAX_DISP_DORAS_LENGTH) {
      setDispDoras([...dispDoras, tile]);
    }
  };

  const deleteTile = (index: number): void => {
    setDispDoras(dispDoras.filter((_, i) => i !== index));
  };

  return { addTile, deleteTile };
};

export { useDispDora };
