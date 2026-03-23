import { describe, expect, it } from "vitest";
import { isChiable } from "@/lib/isChiable";

describe("isChiable", () => {
  it("1はtrueになる", () => {
    expect(isChiable(1)).toBe(true);
  });

  it("7はtrueになる", () => {
    expect(isChiable(1)).toBe(true);
  });

  it("文字列も対応", () => {
    expect(isChiable("1")).toBe(true);
  });

  it("数値に変換できない文字列はfalse", () => {
    expect(isChiable("あ")).toBe(false);
  });

  it("8はfalseになる", () => {
    expect(isChiable(8)).toBe(false);
  });
});
