import { MAX_HAND_LENGTH_WITH_MELDS_AND_KANS } from "./Constant";

const getMaxHandLength = (meldsAndKansLength: number): number => {
  if (meldsAndKansLength === 0) {
    return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS[0];
  }
  if (meldsAndKansLength === 1) {
    return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS[1];
  }
  if (meldsAndKansLength === 2) {
    return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS[2];
  }
  if (meldsAndKansLength === 3) {
    return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS[3];
  }
  if (meldsAndKansLength === 4) {
    return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS[4];
  }

  return MAX_HAND_LENGTH_WITH_MELDS_AND_KANS[0];
};

export { getMaxHandLength };
