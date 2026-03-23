import { describe, expect, it, vi } from "vitest";
import { MAX_DISP_DORAS_LENGTH } from "@/lib/constants/Constant";
import { useDispDora } from "@/hooks/components/useDispDora";

describe("useDispDora", () => {
  it("上限未満ならドラ表示牌を追加できる", () => {
    const setDispDoras = vi.fn();
    const { addTile } = useDispDora({
      dispDoras: ["m1", "p2"],
      setDispDoras,
    });

    addTile("s3");

    expect(setDispDoras).toHaveBeenCalledWith(["m1", "p2", "s3"]);
  });

  it("上限に達しているときはドラ表示牌を追加しない", () => {
    const setDispDoras = vi.fn();
    const { addTile } = useDispDora({
      dispDoras: Array.from(
        { length: MAX_DISP_DORAS_LENGTH },
        (_, index) => `m${index + 1}`,
      ),
      setDispDoras,
    });

    addTile("s3");

    expect(setDispDoras).not.toHaveBeenCalled();
  });

  it("指定した index のドラ表示牌を削除できる", () => {
    const setDispDoras = vi.fn();
    const { deleteTile } = useDispDora({
      dispDoras: ["m1", "p2", "s3"],
      setDispDoras,
    });

    deleteTile(1);

    expect(setDispDoras).toHaveBeenCalledWith(["m1", "s3"]);
  });
});
