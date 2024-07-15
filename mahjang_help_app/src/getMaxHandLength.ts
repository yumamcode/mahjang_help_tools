import { MAX_HAND_LENGTH_WITH_MELDS_AND_KANS } from "./Constant";

const getMaxHandLength = (meldsAndKansLength: number): number | undefined => {
  return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS.get(meldsAndKansLength);
};

export { getMaxHandLength };
