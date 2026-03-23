const NUM_HAI_KINDS = ["m", "p", "s"];
const NUM_HAI_NUMBERS = Array.from({ length: 9 }, (_, index) => index + 1);
const ZIHAI_NUMBERS = Array.from({ length: 7 }, (_, index) => index + 1);

// 数牌(萬子・筒子・索子)を m1~m9, p1~p9, s1~s9 の形で作る
const numberTiles = NUM_HAI_KINDS.map((kind) => {
  return NUM_HAI_NUMBERS.map((number) => `${kind}${number}`);
}).flat();

// 字牌(東南西北白發中)を z1~z7 の形で作る
const honorTiles = ZIHAI_NUMBERS.map((number) => `z${number}`);

// 牌選択で使う全牌一覧
const HAI_ARRAY = [...numberTiles, ...honorTiles];

export { HAI_ARRAY };
