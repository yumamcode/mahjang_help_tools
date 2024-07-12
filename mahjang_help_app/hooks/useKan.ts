import { Meld } from "@/components/MeldInput";
import { MAX_MELDS_AND_KANS_LENGTH } from "@/src/Constant";
import { Dispatch, SetStateAction, useState } from "react";

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

  const addKan = (tile: string): void => {
    if (melds.length + kans.length >= MAX_MELDS_AND_KANS_LENGTH) {
      setMsg("これ以上暗槓出来ません。");
      return;
    }
    setKans([...kans, [tile, tile, tile, tile]]);
  };

  const deleteKan = (index: number): void => {
    setKans(kans.filter((_, i) => i !== index));
  };

  return { msg, addKan, deleteKan };
};

export { useKan };
