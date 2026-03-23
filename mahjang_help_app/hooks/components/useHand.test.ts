import { beforeEach, describe, expect, it, vi } from "vitest";
import * as React from "react";
import { MELD_TYPE } from "@/lib/constants/Constant";
import { useHand } from "@/hooks/components/useHand";

vi.mock("react", async () => {
  // 本物のreactをインポート
  const actual = await vi.importActual<typeof import("react")>("react");
  // useStateとuseEffectだけモックに置き換え
  return {
    ...actual,
    useState: vi.fn(),
    useEffect: vi.fn(),
  };
});

// TypeScriptにモック化したことを伝える
const mockedUseState = vi.mocked(React.useState);
const mockedUseEffect = vi.mocked(React.useEffect);

// テストごとに useHand の初期条件を変えつつ、内部 setter の呼ばれ方を確認できるようにする
const renderUseHand = ({
  hand = [],
  melds = [],
  kans = [],
  isSeparetedLastTile = false,
}: {
  hand?: string[];
  melds?: { meldType: string; meldTiles: string[] }[];
  kans?: string[][];
  isSeparetedLastTile?: boolean;
} = {}) => {
  const setHand = vi.fn();
  const setErrorMsg = vi.fn();

  // useHand 内の errorMsg state は「空文字で開始し、更新はモックで受け取る」状態にする
  mockedUseState.mockReturnValue(["", setErrorMsg] as never);

  // useEffect は描画後を待たず、その場で即実行してテストしやすくする
  mockedUseEffect.mockImplementation((effect) => {
    effect();
  });

  let hook: ReturnType<typeof useHand> | undefined;

  // Hooks ルールに従うため、テスト用コンポーネントの中で useHand を呼ぶ
  const TestComponent = () => {
    hook = useHand({
      hand,
      setHand,
      melds,
      kans,
      isSeparetedLastTile,
    });

    return null;
  };

  TestComponent();

  return { hook: hook!, setHand, setErrorMsg };
};

describe("useHand", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("初期化時にエラーメッセージをクリアする", () => {
    const { setErrorMsg } = renderUseHand({
      hand: ["m1", "m2"],
    });

    expect(setErrorMsg).toHaveBeenCalledWith("");
  });

  it("isSeparetedLastTile が false で上限未満なら牌を追加できる", () => {
    const { hook, setHand, setErrorMsg } = renderUseHand({
      hand: Array.from({ length: 13 }, (_, index) => `m${(index % 9) + 1}`),
      isSeparetedLastTile: false,
    });

    setErrorMsg.mockClear();
    hook.addTile("p1");

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
    expect(setErrorMsg).not.toHaveBeenCalled();
  });

  it("isSeparetedLastTile が false で最大枚数なら追加せずエラーにする", () => {
    const { hook, setHand, setErrorMsg } = renderUseHand({
      hand: Array.from({ length: 14 }, (_, index) => `m${(index % 9) + 1}`),
      isSeparetedLastTile: false,
    });

    setErrorMsg.mockClear();
    hook.addTile("p1");

    expect(setHand).not.toHaveBeenCalled();
    expect(setErrorMsg).toHaveBeenCalledWith("純手牌は既に最大枚数です。");
  });

  it("isSeparetedLastTile が true なら 1 枚少ない時点で追加を止める", () => {
    const { hook, setHand, setErrorMsg } = renderUseHand({
      hand: Array.from({ length: 13 }, (_, index) => `m${(index % 9) + 1}`),
      isSeparetedLastTile: true,
    });

    setErrorMsg.mockClear();
    hook.addTile("p1");

    expect(setHand).not.toHaveBeenCalled();
    expect(setErrorMsg).toHaveBeenCalledWith("純手牌は既に最大枚数です。");
  });

  it("melds と kans がある場合は調整後の上限未満なら追加できる", () => {
    const { hook, setHand, setErrorMsg } = renderUseHand({
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

    setErrorMsg.mockClear();
    hook.addTile("s2");

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
    expect(setErrorMsg).not.toHaveBeenCalled();
  });

  it("melds と kans があり isSeparetedLastTile が true なら調整後上限で追加を止める", () => {
    const { hook, setHand, setErrorMsg } = renderUseHand({
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

    setErrorMsg.mockClear();
    hook.addTile("s2");

    expect(setHand).not.toHaveBeenCalled();
    expect(setErrorMsg).toHaveBeenCalledWith("純手牌は既に最大枚数です。");
  });

  it("deleteTile は指定 index の牌を削除する", () => {
    const { hook, setHand } = renderUseHand({
      hand: ["m1", "m2", "m3"],
    });

    hook.deleteTile(1);

    expect(setHand).toHaveBeenCalledWith(["m1", "m3"]);
  });
});
