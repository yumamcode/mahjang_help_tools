import { describe, expect, it } from "vitest";
import { calculateShanten, recommendDiscard } from "@/src/shantenCalculator";

describe("calculateShanten", () => {
  it("テンパイ形のシャンテン数と有効牌を返す", () => {
    const result = calculateShanten({
      hand: [
        "m1",
        "m2",
        "m3",
        "p1",
        "p2",
        "p3",
        "s1",
        "s2",
        "s3",
        "m5",
        "m5",
        "p6",
        "p7",
      ],
      melds: [],
      kans: [],
    });

    expect(result.shanten).toBe(0);
    expect(result.usefulTiles).toEqual(["p5", "p8"]);
  });

  it("和了形では打牌候補を返さない", () => {
    const recommend = recommendDiscard({
      hand: [
        "m1",
        "m2",
        "m3",
        "p1",
        "p2",
        "p3",
        "s1",
        "s2",
        "s3",
        "m5",
        "m5",
        "p6",
        "p7",
        "p8",
      ],
      melds: [],
      kans: [],
    });

    expect(recommend).toBeUndefined();
  });
});
