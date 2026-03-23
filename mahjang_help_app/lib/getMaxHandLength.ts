import { MAX_HAND_LENGTH_WITH_MELDS_AND_KANS } from "@/lib/constants/Constant";

// 副露・カンの合計数に応じて、純手牌の数をMapの固定値から返す。
const getMaxHandLengthProcesser = (
  meldsAndKansLength: number,
): number | undefined => {
  return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS.get(meldsAndKansLength);
};

// Mapに存在しない値の場合は、0を返す。
const getMaxHandLength = (meldsAndKansLength: number): number => {
  const maxLength = getMaxHandLengthProcesser(meldsAndKansLength);
  return maxLength ? maxLength : 0;
};

export { getMaxHandLength, getMaxHandLengthProcesser };
