import { describe, expect, it } from "vitest";
import { HOLA_TYPE, WINDS } from "@/src/Constant";
import { calculateScore } from "@/src/scoreCalculator";

describe("calculateScore", () => {
  it("平和・断幺九・三色同順のロン和了を計算できる", () => {
    const score = calculateScore({
      roundWind: WINDS.TON,
      seatWind: WINDS.TON,
      holaTile: "p2",
      holaType: HOLA_TYPE.RONG,
      hand: [
        "m2",
        "m3",
        "m4",
        "m6",
        "m7",
        "m8",
        "p2",
        "p3",
        "p4",
        "s2",
        "s3",
        "s4",
        "p2",
      ],
      melds: [],
      kans: [],
      dispDoras: [],
      dispUraDoras: [],
      akaDoras: 0,
      situational: [],
    });

    expect(score.msg).toBe("");
    expect(score.result).toBeDefined();
    expect(score.result?.fu).toBe(30);
    expect(score.result?.fanshu).toBe(4);
    expect(score.result?.defen).toBe(11600);
    expect(score.result?.hupai?.map((role) => role.name)).toEqual([
      "平和",
      "断幺九",
      "三色同順",
    ]);
  });

  it("上がり牌がないときはエラーメッセージを返す", () => {
    const score = calculateScore({
      roundWind: WINDS.TON,
      seatWind: WINDS.NAN,
      holaTile: undefined,
      holaType: HOLA_TYPE.RONG,
      hand: ["m1", "m2", "m3"],
      melds: [],
      kans: [],
      dispDoras: [],
      dispUraDoras: [],
      akaDoras: 0,
      situational: [],
    });

    expect(score.result).toBeUndefined();
    expect(score.msg).toBe("上がり牌を選択してください。");
  });

  it("赤ドラ3枚を含む和了の翻数と点数を計算できる", () => {
    const score = calculateScore({
      roundWind: WINDS.TON,
      seatWind: WINDS.TON,
      holaTile: "p5",
      holaType: HOLA_TYPE.RONG,
      hand: [
        "m3",
        "m4",
        "m5",
        "m6",
        "m7",
        "m8",
        "p3",
        "p4",
        "p5",
        "s3",
        "s4",
        "s5",
        "p5",
      ],
      melds: [],
      kans: [],
      dispDoras: [],
      dispUraDoras: [],
      akaDoras: 3,
      situational: [],
    });

    expect(score.msg).toBe("");
    expect(score.result).toBeDefined();
    expect(score.result?.fu).toBe(30);
    expect(score.result?.fanshu).toBe(7);
    expect(score.result?.defen).toBe(18000);
    expect(score.result?.hupai?.map((role) => role.name)).toEqual([
      "平和",
      "断幺九",
      "三色同順",
      "赤ドラ",
    ]);
  });
});
