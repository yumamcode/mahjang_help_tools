import { MAX_HAND_LENGTH_WITH_MELDS_AND_KANS } from "./Constant";

const getMaxHandLengthProcesser = (
  meldsAndKansLength: number
): number | undefined => {
  return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS.get(meldsAndKansLength);
};

const getMaxHandLength = (meldsAndKansLength: number): number => {
  const maxLength = getMaxHandLengthProcesser(meldsAndKansLength);
  return maxLength ? maxLength : 0;
};

export { getMaxHandLength };
