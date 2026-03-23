import { describe, expect, it } from "vitest";
import { TileUtil } from "@/lib/TileUtil";

describe("TileUtil", () => {
  it("getSuit は牌文字列のスートを返す", () => {
    expect(TileUtil.getSuit("m5")).toBe("m");
    expect(TileUtil.getSuit("z7")).toBe("z");
  });

  it("getNumberString は牌文字列の数字部分を返す", () => {
    expect(TileUtil.getNumberString("p3")).toBe("3");
    expect(TileUtil.getNumberString("s9")).toBe("9");
  });
});
