const SITUATIONALS = {
  RICHI: "立直",
  W_RICHI: "ダブル立直",
  IPPATSU: "一発",
  CHANKAN: "槍槓",
  HAITEI: "海底撈月",
  HOTEI: "河底撈魚",
  RINSHAN: "嶺上開花",
};

const WINDS = {
  TON: "東",
  NAN: "南",
  SHA: "西",
  PE: "北",
};

const MELD_TYPE = {
  CHI: "チー",
  PON: "ポン",
  KAN: "カン",
};

const MELD_LENGTH = {
  CHI: 3,
  PON: 3,
  KAN: 4,
};

const HOLA_TYPE = {
  TSUMO: "ツモ",
  RONG: "ロン",
};

const SUITS = {
  MANZU: "m",
  SOUZU: "s",
  PINZU: "p",
  ZIHAI: "z",
};

const MAX_DISP_DORAS_LENGTH = 4;

const MAX_MELDS_AND_KANS_LENGTH = 4;

const CHI_ABLE_NUMBER_STRINGS = ["1", "2", "3", "4", "5", "6", "7"];

const ANKAN_TURNOVER_INDEX_ARRAY = [0, 3];

const CHINESE_COUNT_DESCRIPTIONS = {
  1: "イー",
  2: "リャン",
  3: "サン",
  4: "スー",
  5: "ウー",
  6: "ロー",
  7: "チー",
  8: "パー",
  9: "キュウ",
};

const SHANTEN_DESCRIPTIONS = {
  HOLA: -1,
  TINGPAI: 0,
};

const MAX_HAND_LENGTH_WITH_MELDS_AND_KANS = {
  0: 14,
  1: 11,
  2: 8,
  3: 5,
  4: 2,
};

const NUMBER_5TH_TILES = ["m5", "p5", "s5"];

const AKADORA_NUMBER_FOR_CONVINIENCE = 0;

const AKADORA_NUMBER_IN_FACT = 5;

const MELD_FROM_CODE = {
  LEFT: "-",
  FRONT: "=",
  RIGHT: "+",
};

const MIN_LENGTH_AKADORA = 0;

const MAX_LENGTH_AKADORA = 3;

export {
  SITUATIONALS,
  WINDS,
  MELD_TYPE,
  MELD_LENGTH,
  HOLA_TYPE,
  SUITS,
  MAX_DISP_DORAS_LENGTH,
  MAX_MELDS_AND_KANS_LENGTH,
  CHI_ABLE_NUMBER_STRINGS,
  ANKAN_TURNOVER_INDEX_ARRAY,
  CHINESE_COUNT_DESCRIPTIONS,
  SHANTEN_DESCRIPTIONS,
  MAX_HAND_LENGTH_WITH_MELDS_AND_KANS,
  NUMBER_5TH_TILES,
  AKADORA_NUMBER_FOR_CONVINIENCE,
  AKADORA_NUMBER_IN_FACT,
  MELD_FROM_CODE,
  MIN_LENGTH_AKADORA,
  MAX_LENGTH_AKADORA,
};
