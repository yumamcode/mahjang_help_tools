import { describe, expect, it } from "vitest";
import {
  getMaxHandLength,
  getMaxHandLengthProcesser,
} from "@/lib/getMaxHandLength";

describe("getMaxHandLength", () => {
  it("副露・暗槓の数に応じた純手牌の最大枚数を返す", () => {
    expect(getMaxHandLength(0)).toBe(14);
    expect(getMaxHandLength(1)).toBe(11);
    expect(getMaxHandLength(2)).toBe(8);
    expect(getMaxHandLength(3)).toBe(5);
    expect(getMaxHandLength(4)).toBe(2);
  });

  it("範囲外の入力では 0 を返す", () => {
    expect(getMaxHandLength(-1)).toBe(0);
    expect(getMaxHandLength(5)).toBe(0);
  });
});

describe("getMaxHandLengthProcesser", () => {
  it("Map に存在する値はそのまま返す", () => {
    expect(getMaxHandLengthProcesser(0)).toBe(14);
    expect(getMaxHandLengthProcesser(4)).toBe(2);
  });

  it("Map に存在しない値では undefined を返す", () => {
    expect(getMaxHandLengthProcesser(-1)).toBeUndefined();
    expect(getMaxHandLengthProcesser(5)).toBeUndefined();
  });
});
