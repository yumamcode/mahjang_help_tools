import { Meld } from "@/components/MeldInput";
import { Dispatch, SetStateAction } from "react";

const useSituational = ({
  melds,
  situational,
  setSituational,
}: {
  melds: Meld[];
  situational: string[];
  setSituational: Dispatch<SetStateAction<string[]>>;
}) => {
  const addSituational = (newSituational: string) => {
    setSituational([...situational, newSituational]);
  };

  const deleteSituational = (targetSituational: string) => {
    setSituational(situational.filter((sit) => sit != targetSituational));
  };

  return { addSituational, deleteSituational };
};

export { useSituational };
