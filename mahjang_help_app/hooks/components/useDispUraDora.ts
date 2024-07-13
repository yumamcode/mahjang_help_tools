import { MAX_DISP_DORAS_LENGTH } from "@/src/Constant";
import { Dispatch, SetStateAction } from "react";

const useDispUraDora = ({
  dispUraDoras,
  setDispUraDoras,
}: {
  dispUraDoras: string[];
  setDispUraDoras: Dispatch<SetStateAction<string[]>>;
}) => {
  const addTile = (tile: string): void => {
    if (dispUraDoras.length < MAX_DISP_DORAS_LENGTH) {
      setDispUraDoras([...dispUraDoras, tile]);
    }
  };

  const deleteTile = (index: number): void => {
    setDispUraDoras(dispUraDoras.filter((_, i) => i !== index));
  };

  return { addTile, deleteTile };
};

export { useDispUraDora };
