import { describe, expect, it } from "vitest";
import { MELD_FROM_CODE, MELD_TYPE } from "@/src/Constant";
import {
  joinSerializedParts,
  serializeHand,
  serializeKans,
  serializeMelds,
  serializeTiles,
} from "@/src/mahjongSerializer";

describe("mahjongSerializer", () => {
  it("joinSerializedParts は空文字を除外して結合する", () => {
    expect(joinSerializedParts("m123", "", "p456", "", "z77")).toBe(
      "m123,p456,z77",
    );
  });

  it("serializeHand は手牌をそのまま連結する", () => {
    expect(serializeHand(["m1", "m2", "m3", "z5"])).toBe("m1m2m3z5");
  });

  it("serializeMelds は副露を majiang-core 向けに変換する", () => {
    expect(
      serializeMelds([
        {
          meldType: MELD_TYPE.CHI,
          meldTiles: ["m2", "m3", "m4"],
        },
        {
          meldType: MELD_TYPE.PON,
          meldTiles: ["z5", "z5", "z5"],
        },
      ]),
    ).toBe("m234-,z555-");
  });

  it("serializeMelds は鳴いた方向コードを切り替えられる", () => {
    expect(
      serializeMelds(
        [
          {
            meldType: MELD_TYPE.CHI,
            meldTiles: ["p4", "p5", "p6"],
          },
        ],
        MELD_FROM_CODE.RIGHT,
      ),
    ).toBe("p456+");
  });

  it("serializeKans は暗槓を majiang-core 向けに変換する", () => {
    expect(
      serializeKans([
        ["m1", "m1", "m1", "m1"],
        ["z7", "z7", "z7", "z7"],
      ]),
    ).toBe("m1111,z7777");
  });

  it("serializeTiles は手牌・副露・暗槓をまとめて結合する", () => {
    expect(
      serializeTiles({
        hand: ["m2", "m3", "p4", "z5"],
        melds: [
          {
            meldType: MELD_TYPE.CHI,
            meldTiles: ["s3", "s4", "s5"],
          },
        ],
        kans: [["p9", "p9", "p9", "p9"]],
      }),
    ).toBe("m2m3p4z5,s345-,p9999");
  });
});
