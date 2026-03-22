// 状況役の選択肢
const SITUATIONALS = {
  RICHI: "立直",
  W_RICHI: "ダブル立直",
  IPPATSU: "一発",
  CHANKAN: "槍槓",
  HAITEI: "海底撈月",
  HOTEI: "河底撈魚",
  RINSHAN: "嶺上開花",
};

// 場風・自風で使用する風牌
const WINDS = {
  TON: "東",
  NAN: "南",
  SHA: "西",
  PE: "北",
};

// 副露入力で扱う面子の種類
const MELD_TYPE = {
  CHI: "チー",
  PON: "ポン",
  KAN: "カン",
};

// 面子ごとの構成枚数
const MELD_LENGTH = {
  CHI: 3,
  PON: 3,
  KAN: 4,
};

// 和了方法の種類
const HOLA_TYPE = {
  TSUMO: "ツモ",
  RONG: "ロン",
};

// 牌文字列で使うスート記号
const SUITS = {
  MANZU: "m",
  SOUZU: "s",
  PINZU: "p",
  ZIHAI: "z",
};

// ドラ表示牌として入力できる最大枚数
const MAX_DISP_DORAS_LENGTH = 4;

// 副露と暗槓の合計上限
const MAX_MELDS_AND_KANS_LENGTH = 4;

// チー可能な数牌の数字。8,9は順子を作れないため除外
const CHI_ABLE_NUMBER_STRINGS = ["1", "2", "3", "4", "5", "6", "7"];

// 暗槓表示時に裏向き牌として描画する index
const ANKAN_TURNOVER_INDEX_ARRAY = [0, 3];

// 数え役満などで使う中国語読み
const CHINESE_COUNT_DESCRIPTIONS = new Map([
  [1, "イー"],
  [2, "リャン"],
  [3, "サン"],
  [4, "スー"],
  [5, "ウー"],
  [6, "ロー"],
  [7, "チー"],
  [8, "パー"],
  [9, "キュウ"],
]);

// シャンテン計算結果の特別値
const SHANTEN_DESCRIPTIONS = {
  HOLA: -1,
  TINGPAI: 0,
};

// 副露・暗槓の数に応じた純手牌の最大枚数
const MAX_HAND_LENGTH_WITH_MELDS_AND_KANS = new Map([
  [0, 14],
  [1, 11],
  [2, 8],
  [3, 5],
  [4, 2],
]);

// 赤ドラ変換対象になる 5 の牌
const NUMBER_5TH_TILES = ["m5", "p5", "s5"];

// ライブラリ都合で赤ドラを 0 として扱うための置換値
const AKADORA_NUMBER_FOR_CONVINIENCE = 0;

// 実際の牌番号としての 5
const AKADORA_NUMBER_IN_FACT = 5;

// 鳴いた方向を表す記号
const MELD_FROM_CODE = {
  LEFT: "-",
  FRONT: "=",
  RIGHT: "+",
};

// 赤ドラ枚数入力の最小値・最大値
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
