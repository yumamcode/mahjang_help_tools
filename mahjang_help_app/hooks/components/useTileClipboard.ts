import type { Meld } from "@/components/MeldInput";
import { Dispatch, SetStateAction } from "react";

const HAND_INPUT_STORAGE_KEY = "handInput";
const MELDS_INPUT_STORAGE_KEY = "meldsInput";
const KANS_INPUT_STORAGE_KEY = "kansInput";

// 手牌・副露・暗槓のコピー貼り付け処理をまとめる
const useTileClipboard = ({
  hand,
  setHand,
  melds,
  setMelds,
  kans,
  setKans,
}: {
  hand: string[];
  setHand: Dispatch<SetStateAction<string[]>>;
  melds: Meld[];
  setMelds: Dispatch<SetStateAction<Meld[]>>;
  kans: string[][];
  setKans: Dispatch<SetStateAction<string[][]>>;
}) => {
  // 現在の牌入力状態を localStorage に保存する
  const copyInputTiles = (): void => {
    localStorage.setItem(HAND_INPUT_STORAGE_KEY, JSON.stringify(hand));
    localStorage.setItem(MELDS_INPUT_STORAGE_KEY, JSON.stringify(melds));
    localStorage.setItem(KANS_INPUT_STORAGE_KEY, JSON.stringify(kans));

    alert("牌情報をコピーしました。");
  };

  // 保存済みの牌入力状態を localStorage から復元する
  const pasteInputTiles = (): void => {
    const handInputOnLocalStorage = localStorage.getItem(HAND_INPUT_STORAGE_KEY);
    const meldsInputOnLocalStorage = localStorage.getItem(
      MELDS_INPUT_STORAGE_KEY
    );
    const kansInputOnLocalStorage = localStorage.getItem(KANS_INPUT_STORAGE_KEY);

    handInputOnLocalStorage && setHand(JSON.parse(handInputOnLocalStorage));
    meldsInputOnLocalStorage && setMelds(JSON.parse(meldsInputOnLocalStorage));
    kansInputOnLocalStorage && setKans(JSON.parse(kansInputOnLocalStorage));

    alert("牌情報を貼り付けました。");
  };

  return { copyInputTiles, pasteInputTiles };
};

export { useTileClipboard };
