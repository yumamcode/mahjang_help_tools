import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MELD_TYPE } from "@/lib/constants/Constant";
import { useKan } from "@/hooks/components/useKan";

type UseKanProps = Parameters<typeof useKan>[0];

const createProps = (
  overrides: Partial<UseKanProps> = {},
): {
  props: UseKanProps;
  setKans: ReturnType<typeof vi.fn>;
} => {
  const setKans = vi.fn();

  return {
    setKans,
    props: {
      kans: [],
      setKans,
      melds: [],
      ...overrides,
    },
  };
};

describe("useKan", () => {
  it("初期化時の msg は空文字", () => {
    const { props } = createProps();
    const { result } = renderHook((hookProps: UseKanProps) => useKan(hookProps), {
      initialProps: props,
    });

    expect(result.current.msg).toBe("");
  });

  it("副露と暗槓の合計が上限未満なら暗槓を追加できる", () => {
    const { props, setKans } = createProps({
      kans: [["m1", "m1", "m1", "m1"]],
      melds: [
        {
          meldType: MELD_TYPE.CHI,
          meldTiles: ["p1", "p2", "p3"],
        },
      ],
    });

    const { result } = renderHook((hookProps: UseKanProps) => useKan(hookProps), {
      initialProps: props,
    });

    act(() => {
      result.current.addKan("s7");
    });

    expect(setKans).toHaveBeenCalledWith([
      ["m1", "m1", "m1", "m1"],
      ["s7", "s7", "s7", "s7"],
    ]);
    expect(result.current.msg).toBe("");
  });

  it("副露と暗槓の合計が上限以上なら暗槓を追加せず msg を設定する", () => {
    const { props, setKans } = createProps({
      kans: [
        ["m1", "m1", "m1", "m1"],
        ["p2", "p2", "p2", "p2"],
      ],
      melds: [
        {
          meldType: MELD_TYPE.PON,
          meldTiles: ["z5", "z5", "z5"],
        },
        {
          meldType: MELD_TYPE.CHI,
          meldTiles: ["s3", "s4", "s5"],
        },
      ],
    });

    const { result } = renderHook((hookProps: UseKanProps) => useKan(hookProps), {
      initialProps: props,
    });

    act(() => {
      result.current.addKan("z1");
    });

    expect(setKans).not.toHaveBeenCalled();
    expect(result.current.msg).toBe("これ以上暗槓出来ません。");
  });

  it("deleteKan は指定 index の暗槓を削除する", () => {
    const { props, setKans } = createProps({
      kans: [
        ["m1", "m1", "m1", "m1"],
        ["p2", "p2", "p2", "p2"],
        ["s3", "s3", "s3", "s3"],
      ],
    });

    const { result } = renderHook((hookProps: UseKanProps) => useKan(hookProps), {
      initialProps: props,
    });

    act(() => {
      result.current.deleteKan(1);
    });

    expect(setKans).toHaveBeenCalledWith([
      ["m1", "m1", "m1", "m1"],
      ["s3", "s3", "s3", "s3"],
    ]);
  });
});
