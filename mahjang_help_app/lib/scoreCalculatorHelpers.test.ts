import { describe, expect, it } from "vitest";
import {
  AKADORA_NUMBER_FOR_CONVINIENCE,
  AKADORA_NUMBER_IN_FACT,
  SUITS,
  WINDS,
} from "@/src/Constant";
import {
  isHonorTileGroup,
  replaceOneFiveWithAkadora,
  replaceTileGroupWithAkadora,
  replaceWithAkadora,
  toWindCode,
} from "@/lib/scoreCalculatorHelpers";

describe("scoreCalculatorHelpers", () => {
  it("isHonorTileGroup は字牌のスートだけ true を返す", () => {
    expect(isHonorTileGroup(SUITS.ZIHAI)).toBe(true);
    expect(isHonorTileGroup(SUITS.MANZU)).toBe(false);
    expect(isHonorTileGroup(SUITS.PINZU)).toBe(false);
  });

  it("replaceOneFiveWithAkadora は赤ドラ残数があると 0 に置き換える", () => {
    expect(replaceOneFiveWithAkadora(2)).toEqual({
      replacedValue: String(AKADORA_NUMBER_FOR_CONVINIENCE),
      restOfAkadora: 1,
    });
  });

  it("replaceOneFiveWithAkadora は赤ドラ残数がないと通常の 5 を返す", () => {
    expect(replaceOneFiveWithAkadora(0)).toEqual({
      replacedValue: String(AKADORA_NUMBER_IN_FACT),
      restOfAkadora: 0,
    });
  });

  it("replaceTileGroupWithAkadora は数牌セグメント内の 5 を順番に変換する", () => {
    expect(replaceTileGroupWithAkadora("45567", 1)).toEqual({
      convertedTiles: "40567",
      restOfAkadora: 0,
    });
  });

  it("replaceWithAkadora は手牌と副露をまとめて変換し、字牌はそのまま残す", () => {
    expect(replaceWithAkadora("m5z555,p555-,s123", 2)).toEqual({
      convertedTiles: "m0z555,p055-,s123",
      restOfAkadora: 0,
    });
  });

  it("toWindCode は風牌を majiang-core 用の数値へ変換する", () => {
    expect(toWindCode(WINDS.TON)).toBe(0);
    expect(toWindCode(WINDS.NAN)).toBe(1);
    expect(toWindCode(WINDS.SHA)).toBe(2);
    expect(toWindCode(WINDS.PE)).toBe(3);
    expect(toWindCode(undefined)).toBe(3);
  });
});
