import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MELD_TYPE } from "@/lib/constants/Constant";
import { useHand } from "@/hooks/components/useHand";

// これは TypeScript の組み込み utility type で、
// 関数の引数型を配列（タプル）として取り出します。
type UseHandProps = Parameters<typeof useHand>[0];

// テストごとに必要な props だけ上書きして、共通の初期値と setHand モックを作る
const createProps = (
  overrides: Partial<UseHandProps> = {},
): {
  props: UseHandProps;
  setHand: ReturnType<typeof vi.fn>;
} => {
  const setHand = vi.fn();

  return {
    setHand,
    props: {
      hand: [],
      setHand,
      melds: [],
      kans: [],
      isSeparetedLastTile: false,
      ...overrides,
    },
  };
};

describe("useHand", () => {
  it("初期化時の errorMsg は空文字", () => {
    const { props } = createProps({
      hand: ["m1", "m2"],
    });

    // renderHook で useHand を実行し、result.current から現在の返り値を確認する
    const { result } = renderHook(
      (hookProps: UseHandProps) => useHand(hookProps),
      {
        initialProps: props,
      },
    );

    expect(result.current.errorMsg).toBe("");
  });

  it("isSeparetedLastTile が false で上限未満なら牌を追加できる", () => {
    const { props, setHand } = createProps({
      hand: Array.from({ length: 13 }, (_, index) => `m${(index % 9) + 1}`),
      isSeparetedLastTile: false,
    });

    const { result } = renderHook(
      (hookProps: UseHandProps) => useHand(hookProps),
      {
        initialProps: props,
      },
    );

    // state 更新を伴う操作は act で包んで React に反映させる
    act(() => {
      result.current.addTile("p1");
    });

    expect(setHand).toHaveBeenCalledWith([
      "m1",
      "m2",
      "m3",
      "m4",
      "m5",
      "m6",
      "m7",
      "m8",
      "m9",
      "m1",
      "m2",
      "m3",
      "m4",
      "p1",
    ]);
    expect(result.current.errorMsg).toBe("");
  });

  it("isSeparetedLastTile が false で最大枚数なら追加せずエラーにする", () => {
    const { props, setHand } = createProps({
      hand: Array.from({ length: 14 }, (_, index) => `m${(index % 9) + 1}`),
      isSeparetedLastTile: false,
    });

    const { result } = renderHook(
      (hookProps: UseHandProps) => useHand(hookProps),
      {
        initialProps: props,
      },
    );

    act(() => {
      result.current.addTile("p1");
    });

    expect(setHand).not.toHaveBeenCalled();
    expect(result.current.errorMsg).toBe("純手牌は既に最大枚数です。");
  });

  it("isSeparetedLastTile が true なら 1 枚少ない時点で追加を止める", () => {
    const { props, setHand } = createProps({
      hand: Array.from({ length: 13 }, (_, index) => `m${(index % 9) + 1}`),
      isSeparetedLastTile: true,
    });

    const { result } = renderHook(
      (hookProps: UseHandProps) => useHand(hookProps),
      {
        initialProps: props,
      },
    );

    act(() => {
      result.current.addTile("p1");
    });

    expect(setHand).not.toHaveBeenCalled();
    expect(result.current.errorMsg).toBe("純手牌は既に最大枚数です。");
  });

  it("melds と kans がある場合は調整後の上限未満なら追加できる", () => {
    const { props, setHand } = createProps({
      hand: ["m1", "m2", "m3", "p1", "p2", "p3", "s1"],
      melds: [
        {
          meldType: MELD_TYPE.CHI,
          meldTiles: ["m4", "m5", "m6"],
        },
      ],
      kans: [["z1", "z1", "z1", "z1"]],
      isSeparetedLastTile: false,
    });

    const { result } = renderHook(
      (hookProps: UseHandProps) => useHand(hookProps),
      {
        initialProps: props,
      },
    );

    act(() => {
      result.current.addTile("s2");
    });

    expect(setHand).toHaveBeenCalledWith([
      "m1",
      "m2",
      "m3",
      "p1",
      "p2",
      "p3",
      "s1",
      "s2",
    ]);
    expect(result.current.errorMsg).toBe("");
  });

  it("melds と kans があり isSeparetedLastTile が true なら調整後上限で追加を止める", () => {
    const { props, setHand } = createProps({
      hand: ["m1", "m2", "m3", "p1", "p2", "p3", "s1"],
      melds: [
        {
          meldType: MELD_TYPE.PON,
          meldTiles: ["z5", "z5", "z5"],
        },
      ],
      kans: [["z1", "z1", "z1", "z1"]],
      isSeparetedLastTile: true,
    });

    const { result } = renderHook(
      (hookProps: UseHandProps) => useHand(hookProps),
      {
        initialProps: props,
      },
    );

    act(() => {
      result.current.addTile("s2");
    });

    expect(setHand).not.toHaveBeenCalled();
    expect(result.current.errorMsg).toBe("純手牌は既に最大枚数です。");
  });

  it("hand が変わると errorMsg をクリアする", () => {
    const { props } = createProps({
      hand: Array.from({ length: 14 }, (_, index) => `m${(index % 9) + 1}`),
    });

    const { result, rerender } = renderHook(
      (hookProps: UseHandProps) => useHand(hookProps),
      {
        initialProps: props,
      },
    );

    act(() => {
      result.current.addTile("p1");
    });

    expect(result.current.errorMsg).toBe("純手牌は既に最大枚数です。");

    // rerender で props を更新すると、useEffect による errorMsg クリアも確認できる
    rerender({
      ...props,
      hand: ["m1", "m2", "m3"],
    });

    expect(result.current.errorMsg).toBe("");
  });

  it("deleteTile は指定 index の牌を削除する", () => {
    const { props, setHand } = createProps({
      hand: ["m1", "m2", "m3"],
    });

    const { result } = renderHook(
      (hookProps: UseHandProps) => useHand(hookProps),
      {
        initialProps: props,
      },
    );

    act(() => {
      result.current.deleteTile(1);
    });

    expect(setHand).toHaveBeenCalledWith(["m1", "m3"]);
  });
});
