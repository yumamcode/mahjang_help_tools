import { describe, expect, it } from "vitest";
import { getShantenDescription } from "@/lib/getShantenDescription";

describe("getShantenDescription", () => {
  it("和了形は上がり形と表示する", () => {
    expect(getShantenDescription(-1)).toBe("上がり形");
  });

  it("0 シャンテンはテンパイと表示する", () => {
    expect(getShantenDescription(0)).toBe("テンパイ");
  });

  it("1 以上のシャンテン数は中国語読み付きで表示する", () => {
    expect(getShantenDescription(1)).toBe("イーシャンテン");
    expect(getShantenDescription(4)).toBe("スーシャンテン");
  });

  it("定義外の値は undefined を返す", () => {
    expect(getShantenDescription(10)).toBeUndefined();
    expect(getShantenDescription(-2)).toBeUndefined();
  });
});
