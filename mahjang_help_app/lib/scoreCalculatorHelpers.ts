import {
  AKADORA_NUMBER_FOR_CONVINIENCE,
  AKADORA_NUMBER_IN_FACT,
  SUITS,
  WINDS,
} from "@/lib/constants/Constant";

// 字牌セグメントは赤ドラ変換しない
const isHonorTileGroup = (suit: string): boolean => {
  return suit === SUITS.ZIHAI;
};

// 5 を 1 枚だけ赤ドラ表現へ置き換える
const replaceOneFiveWithAkadora = (restOfAkadora: number) => {
  if (restOfAkadora <= 0) {
    return {
      replacedValue: String(AKADORA_NUMBER_IN_FACT),
      restOfAkadora,
    };
  }

  return {
    replacedValue: String(AKADORA_NUMBER_FOR_CONVINIENCE),
    restOfAkadora: restOfAkadora - 1,
  };
};

// 数牌セグメント内の 5 を、残り赤ドラ枚数に応じて順番に置き換える
const replaceTileGroupWithAkadora = (
  tileNumbers: string,
  initialAkadoraCount: number,
) => {
  let restOfAkadora = initialAkadoraCount;

  const convertedTiles = tileNumbers.replace(/5/g, () => {
    const replacement = replaceOneFiveWithAkadora(restOfAkadora);
    restOfAkadora = replacement.restOfAkadora;
    return replacement.replacedValue;
  });

  return { convertedTiles, restOfAkadora };
};

// 手牌・副露・カンを問わず、数牌セグメント内の 5 を赤ドラ表現へ置き換える
const replaceWithAkadora = (tilesStr: string, initialAkadoraCount: number) => {
  let restOfAkadora = initialAkadoraCount;

  const convertedTiles = tilesStr.replace(
    /([mpsz])(\d+[+\-=]?)/g,
    (_, suit: string, tileNumbers: string) => {
      if (isHonorTileGroup(suit)) {
        return `${suit}${tileNumbers}`;
      }

      const replacement = replaceTileGroupWithAkadora(
        tileNumbers,
        restOfAkadora,
      );
      restOfAkadora = replacement.restOfAkadora;
      return `${suit}${replacement.convertedTiles}`;
    },
  );

  return { convertedTiles, restOfAkadora };
};

// 風牌文字列を majiang-core 用の数値コードへ変換する
const toWindCode = (wind: string | undefined): number => {
  return wind === WINDS.TON
    ? 0
    : wind === WINDS.NAN
      ? 1
      : wind === WINDS.SHA
        ? 2
        : 3;
};

export {
  isHonorTileGroup,
  replaceOneFiveWithAkadora,
  replaceTileGroupWithAkadora,
  replaceWithAkadora,
  toWindCode,
};
