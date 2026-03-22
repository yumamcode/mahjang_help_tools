import { Meld } from "@/components/MeldInput";
import { Dispatch, SetStateAction } from "react";

// 状況役の追加・削除を管理する
const useSituational = ({
  melds,
  situational,
  setSituational,
}: {
  melds: Meld[];
  situational: string[];
  setSituational: Dispatch<SetStateAction<string[]>>;
}) => {
  // 選択した状況役を追加する
  const addSituational = (newSituational: string) => {
    setSituational([...situational, newSituational]);
  };

  // 指定した状況役を選択状態から外す
  const deleteSituational = (targetSituational: string) => {
    setSituational(situational.filter((sit) => sit != targetSituational));
  };

  return { addSituational, deleteSituational };
};

export { useSituational };
