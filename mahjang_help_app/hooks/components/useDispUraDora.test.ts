import { describe, expect, it, vi } from "vitest";
import { MAX_DISP_DORAS_LENGTH } from "@/lib/constants/Constant";
import { useDispUraDora } from "@/hooks/components/useDispUraDora";

describe("useDispUraDora", () => {
  it("上限未満なら裏ドラ表示牌を追加できる", () => {
    const setDispUraDoras = vi.fn();
    const { addTile } = useDispUraDora({
      dispUraDoras: ["m1", "p2"],
      setDispUraDoras,
    });

    addTile("s3");

    expect(setDispUraDoras).toHaveBeenCalledWith(["m1", "p2", "s3"]);
  });

  it("上限に達しているときは裏ドラ表示牌を追加しない", () => {
    const setDispUraDoras = vi.fn();
    const { addTile } = useDispUraDora({
      dispUraDoras: Array.from(
        { length: MAX_DISP_DORAS_LENGTH },
        (_, index) => `m${index + 1}`,
      ),
      setDispUraDoras,
    });

    addTile("s3");

    expect(setDispUraDoras).not.toHaveBeenCalled();
  });

  it("指定した index の裏ドラ表示牌を削除できる", () => {
    const setDispUraDoras = vi.fn();
    const { deleteTile } = useDispUraDora({
      dispUraDoras: ["m1", "p2", "s3"],
      setDispUraDoras,
    });

    deleteTile(1);

    expect(setDispUraDoras).toHaveBeenCalledWith(["m1", "s3"]);
  });
});
