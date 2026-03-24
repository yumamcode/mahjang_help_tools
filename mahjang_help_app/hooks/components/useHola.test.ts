import { describe, expect, it, vi } from "vitest";
import { HOLA_TYPE } from "@/lib/constants/Constant";
import { useHola } from "@/hooks/components/useHola";

describe("useHola", () => {
  it("addTile は選択した上がり牌を設定する", () => {
    const setHolaTile = vi.fn();
    const setHolaType = vi.fn();
    const { addTile } = useHola({
      setHolaTile,
      setHolaType,
    });

    addTile("m3");

    expect(setHolaTile).toHaveBeenCalledWith("m3");
  });

  it("deleteTile は選択済みの上がり牌をクリアする", () => {
    const setHolaTile = vi.fn();
    const setHolaType = vi.fn();
    const { deleteTile } = useHola({
      setHolaTile,
      setHolaType,
    });

    deleteTile();

    expect(setHolaTile).toHaveBeenCalledWith("");
  });

  it("tsumoButtonOnClick は上がり方をツモに設定する", () => {
    const setHolaTile = vi.fn();
    const setHolaType = vi.fn();
    const { tsumoButtonOnClick } = useHola({
      setHolaTile,
      setHolaType,
    });

    tsumoButtonOnClick();

    expect(setHolaType).toHaveBeenCalledWith(HOLA_TYPE.TSUMO);
  });

  it("rongButtonOnClick は上がり方をロンに設定する", () => {
    const setHolaTile = vi.fn();
    const setHolaType = vi.fn();
    const { rongButtonOnClick } = useHola({
      setHolaTile,
      setHolaType,
    });

    rongButtonOnClick();

    expect(setHolaType).toHaveBeenCalledWith(HOLA_TYPE.RONG);
  });
});
