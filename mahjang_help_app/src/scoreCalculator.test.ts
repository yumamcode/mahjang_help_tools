import { describe, expect, it } from "vitest";
import { HOLA_TYPE, MELD_TYPE, WINDS } from "@/src/Constant";
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

  it("z5 を含んでいても字牌は赤ドラに変換されない", () => {
    const score = calculateScore({
      roundWind: WINDS.TON,
      seatWind: WINDS.TON,
      holaTile: "m7",
      holaType: HOLA_TYPE.RONG,
      hand: [
        "z5",
        "z5",
        "z5",
        "p2",
        "p3",
        "p4",
        "s2",
        "s3",
        "s4",
        "m4",
        "m5",
        "m6",
        "m7",
      ],
      melds: [],
      kans: [],
      dispDoras: [],
      dispUraDoras: [],
      akaDoras: 2,
      situational: [],
    });

    expect(score.msg).toBe("");
    expect(score.result).toBeDefined();
    expect(score.result?.fu).toBe(40);
    expect(score.result?.fanshu).toBe(2);
    expect(score.result?.defen).toBe(3900);
    expect(score.result?.hupai).toEqual([
      { name: "翻牌 白", fanshu: 1 },
      { name: "赤ドラ", fanshu: 1 },
    ]);
  });

  it("鳴いた手牌では平和がつかない", () => {
    const score = calculateScore({
      roundWind: WINDS.TON,
      seatWind: WINDS.NAN,
      holaTile: "p2",
      holaType: HOLA_TYPE.RONG,
      hand: ["m6", "m7", "m8", "p2", "p3", "p4", "s2", "s3", "s4", "p2"],
      melds: [
        {
          meldType: MELD_TYPE.CHI,
          meldTiles: ["m2", "m3", "m4"],
        },
      ],
      kans: [],
      dispDoras: [],
      dispUraDoras: [],
      akaDoras: 0,
      situational: [],
    });

    expect(score.msg).toBe("");
    expect(score.result).toBeDefined();
    expect(score.result?.fu).toBe(30);
    expect(score.result?.fanshu).toBe(2);
    expect(score.result?.defen).toBe(2000);
    expect(score.result?.hupai?.map((role) => role.name)).toEqual([
      "断幺九",
      "三色同順",
    ]);
    expect(score.result?.hupai?.map((role) => role.name)).not.toContain("平和");
  });

  it("暗槓3つの和了で三槓子を計算できる", () => {
    const score = calculateScore({
      roundWind: WINDS.TON,
      seatWind: WINDS.TON,
      holaTile: "p5",
      holaType: HOLA_TYPE.RONG,
      hand: ["p3", "p4", "z1", "z1"],
      melds: [],
      kans: [
        ["m1", "m1", "m1", "m1"],
        ["p9", "p9", "p9", "p9"],
        ["s1", "s1", "s1", "s1"],
      ],
      dispDoras: [],
      dispUraDoras: [],
      akaDoras: 0,
      situational: [],
    });

    expect(score.msg).toBe("");
    expect(score.result).toBeDefined();
    expect(score.result?.fu).toBe(130);
    expect(score.result?.fanshu).toBe(4);
    expect(score.result?.defen).toBe(12000);
    expect(score.result?.hupai).toEqual([
      { name: "三暗刻", fanshu: 2 },
      { name: "三槓子", fanshu: 2 },
    ]);
  });

  it("明槓を含む和了でも三槓子を計算できる", () => {
    const score = calculateScore({
      roundWind: WINDS.NAN,
      seatWind: WINDS.SHA,
      holaTile: "m4",
      holaType: HOLA_TYPE.RONG,
      hand: ["m2", "m3", "z5", "z5"],
      melds: [
        {
          meldType: MELD_TYPE.KAN,
          meldTiles: ["z1", "z1", "z1", "z1"],
        },
      ],
      kans: [
        ["m9", "m9", "m9", "m9"],
        ["p1", "p1", "p1", "p1"],
      ],
      dispDoras: [],
      dispUraDoras: [],
      akaDoras: 0,
      situational: [],
    });

    expect(score.msg).toBe("");
    expect(score.result).toBeDefined();
    expect(score.result?.fu).toBe(110);
    expect(score.result?.fanshu).toBe(2);
    expect(score.result?.defen).toBe(7100);
    expect(score.result?.hupai).toEqual([{ name: "三槓子", fanshu: 2 }]);
  });
});
