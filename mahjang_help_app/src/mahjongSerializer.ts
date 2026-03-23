import type { Meld } from "@/components/MeldInput";
import { MELD_FROM_CODE } from "@/lib/constants/Constant";
import { TileUtil } from "@/lib/TileUtil";

// 空文字を除外して、majiang-core が読めるカンマ区切り文字列にまとめる
const joinSerializedParts = (...parts: string[]): string => {
  return parts.filter((part) => part !== "").join(",");
};

// 純手牌をそのまま連結してシリアライズする
const serializeHand = (hand: string[]): string => {
  return hand.join("");
};

// 副露牌をスート記号付きの文字列へ変換する
const serializeMelds = (
  melds: Meld[],
  fromCode: string = MELD_FROM_CODE.LEFT,
): string => {
  return melds
    .map(
      (meld) =>
        TileUtil.getSuit(meld.meldTiles[0]) +
        meld.meldTiles.join("").replace(/[a-z]/gi, "") +
        fromCode,
    )
    .join(",");
};

// 暗槓牌をスート記号付きの文字列へ変換する
const serializeKans = (kans: string[][]): string => {
  return kans
    .map(
      (kan) => TileUtil.getSuit(kan[0]) + kan.join("").replace(/[a-z]/gi, ""),
    )
    .join(",");
};

// 手牌・副露・暗槓をまとめて 1 つの牌文字列にする
const serializeTiles = ({
  hand,
  melds,
  kans,
}: {
  hand: string[];
  melds: Meld[];
  kans: string[][];
}): string => {
  return joinSerializedParts(
    serializeHand(hand),
    serializeMelds(melds),
    serializeKans(kans),
  );
};

export {
  joinSerializedParts,
  serializeHand,
  serializeMelds,
  serializeKans,
  serializeTiles,
};
