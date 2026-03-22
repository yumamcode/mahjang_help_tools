import { Meld } from "@/components/MeldInput";
import { MIN_LENGTH_AKADORA, WINDS } from "@/src/Constant";
import { Dispatch, SetStateAction, useReducer } from "react";

// 点数計算に必要な入力値をまとめて保持する state
type InputState = {
  roundWind: string;
  seatWind: string;
  holaTile: string | undefined;
  holaType: string | undefined;
  hand: string[];
  melds: Meld[];
  kans: string[][];
  dispDoras: string[];
  dispUraDoras: string[];
  situational: string[];
  akaDoras: number;
};

// 各入力フォームの表示・非表示を管理する state
type VisibleInputsState = {
  showWindInput: boolean;
  showHandInput: boolean;
  showMeldInput: boolean;
  showKanInput: boolean;
  showDispDorasInput: boolean;
  showDispUraDorasInput: boolean;
  showAkaDorasInput: boolean;
  showSituationalInput: boolean;
  showHolaInput: boolean;
};

// ページ内の入力値と表示状態をまとめた reducer 用 state
type State = {
  inputState: InputState;
  visibleInputs: VisibleInputsState;
};

// reducer で更新対象を型安全に扱うための key 型
type InputStateKey = keyof InputState;
type VisibleInputKey = keyof VisibleInputsState;

// reducer に渡す action の種類
type Action =
  | {
      type: "setInput";
      key: InputStateKey;
      value: InputState[InputStateKey];
    }
  | {
      type: "setVisibleInput";
      key: VisibleInputKey;
      value: boolean;
    }
  | {
      type: "hideAllInputs";
    };

// 点数計算ページの初期状態
const initialState: State = {
  inputState: {
    roundWind: WINDS.TON,
    seatWind: WINDS.PE,
    holaTile: undefined,
    holaType: undefined,
    hand: [],
    melds: [],
    kans: [],
    dispDoras: [],
    dispUraDoras: [],
    situational: [],
    akaDoras: MIN_LENGTH_AKADORA,
  },
  visibleInputs: {
    showWindInput: false,
    showHandInput: false,
    showMeldInput: false,
    showKanInput: false,
    showDispDorasInput: false,
    showDispUraDorasInput: false,
    showAkaDorasInput: false,
    showSituationalInput: false,
    showHolaInput: false,
  },
};

// 入力値と表示状態の更新を一元管理する reducer
const calculatePointsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setInput":
      return {
        ...state,
        inputState: {
          ...state.inputState,
          [action.key]: action.value,
        },
      };
    case "setVisibleInput":
      return {
        ...state,
        visibleInputs: {
          ...state.visibleInputs,
          [action.key]: action.value,
        },
      };
    case "hideAllInputs":
      return {
        ...state,
        visibleInputs: {
          showWindInput: false,
          showHandInput: false,
          showMeldInput: false,
          showKanInput: false,
          showDispDorasInput: false,
          showDispUraDorasInput: false,
          showAkaDorasInput: false,
          showSituationalInput: false,
          showHolaInput: false,
        },
      };
    default:
      return state;
  }
};

// SetStateAction の「値」または「更新関数」を実際の次の値に解決する
const resolveNextValue = <T>(
  valueOrUpdater: SetStateAction<T>,
  currentValue: T,
): T => {
  return typeof valueOrUpdater === "function"
    ? (valueOrUpdater as (prevState: T) => T)(currentValue)
    : valueOrUpdater;
};

// inputState 用に SetStateAction 互換の setter を生成する
const createInputSetter = <T extends InputStateKey>(
  dispatch: Dispatch<Action>,
  key: T,
  currentValue: InputState[T],
): Dispatch<SetStateAction<InputState[T]>> => {
  return (valueOrUpdater) => {
    dispatch({
      type: "setInput",
      key,
      value: resolveNextValue(valueOrUpdater, currentValue),
    });
  };
};

// visibleInputs 用に SetStateAction 互換の setter を生成する
const createVisibleInputSetter = (
  dispatch: Dispatch<Action>,
  key: VisibleInputKey,
  currentValue: boolean,
): Dispatch<SetStateAction<boolean>> => {
  return (valueOrUpdater) => {
    dispatch({
      type: "setVisibleInput",
      key,
      value: resolveNextValue(valueOrUpdater, currentValue),
    });
  };
};

// 点数計算ページ全体の入力状態と表示切り替えを管理する
const useCalculatePoints = () => {
  const [state, dispatch] = useReducer(calculatePointsReducer, initialState);
  const { inputState, visibleInputs } = state;

  // 入力フォームの表示状態をすべて閉じる
  const hideAllInput = () => {
    dispatch({ type: "hideAllInputs" });
  };

  // 各入力値を更新する setter 群
  const setRoundWind = createInputSetter(
    dispatch,
    "roundWind",
    inputState.roundWind,
  );
  const setSeatWind = createInputSetter(
    dispatch,
    "seatWind",
    inputState.seatWind,
  );
  const setHolaTile = createInputSetter(
    dispatch,
    "holaTile",
    inputState.holaTile,
  );
  const setHolaType = createInputSetter(
    dispatch,
    "holaType",
    inputState.holaType,
  );
  const setHand = createInputSetter(dispatch, "hand", inputState.hand);
  const setMelds = createInputSetter(dispatch, "melds", inputState.melds);
  const setKans = createInputSetter(dispatch, "kans", inputState.kans);
  const setDispDoras = createInputSetter(
    dispatch,
    "dispDoras",
    inputState.dispDoras,
  );
  const setDispUraDoras = createInputSetter(
    dispatch,
    "dispUraDoras",
    inputState.dispUraDoras,
  );
  const setSituational = createInputSetter(
    dispatch,
    "situational",
    inputState.situational,
  );
  const setAkaDoras = createInputSetter(
    dispatch,
    "akaDoras",
    inputState.akaDoras,
  );

  // 各入力フォームの表示状態を更新する setter 群
  const setShowWindInput = createVisibleInputSetter(
    dispatch,
    "showWindInput",
    visibleInputs.showWindInput,
  );
  const setShowHandInput = createVisibleInputSetter(
    dispatch,
    "showHandInput",
    visibleInputs.showHandInput,
  );
  const setShowMeldInput = createVisibleInputSetter(
    dispatch,
    "showMeldInput",
    visibleInputs.showMeldInput,
  );
  const setShowKanInput = createVisibleInputSetter(
    dispatch,
    "showKanInput",
    visibleInputs.showKanInput,
  );
  const setShowDispDorasInput = createVisibleInputSetter(
    dispatch,
    "showDispDorasInput",
    visibleInputs.showDispDorasInput,
  );
  const setShowDispUraDorasInput = createVisibleInputSetter(
    dispatch,
    "showDispUraDorasInput",
    visibleInputs.showDispUraDorasInput,
  );
  const setShowAkaDorasInput = createVisibleInputSetter(
    dispatch,
    "showAkaDorasInput",
    visibleInputs.showAkaDorasInput,
  );
  const setShowSituationalInput = createVisibleInputSetter(
    dispatch,
    "showSituationalInput",
    visibleInputs.showSituationalInput,
  );
  const setShowHolaInput = createVisibleInputSetter(
    dispatch,
    "showHolaInput",
    visibleInputs.showHolaInput,
  );

  // トグル表示ボタン用の設定一覧
  const TOGGLE_SHOW_BUTTONS = [
    {
      boolean_show: visibleInputs.showWindInput,
      setter: setShowWindInput,
      name: "場風・自風",
    },
    {
      boolean_show: visibleInputs.showHolaInput,
      setter: setShowHolaInput,
      name: "上がり牌",
    },
    {
      boolean_show: visibleInputs.showHandInput,
      setter: setShowHandInput,
      name: "純手牌",
    },
    {
      boolean_show: visibleInputs.showMeldInput,
      setter: setShowMeldInput,
      name: "副露",
    },
    {
      boolean_show: visibleInputs.showKanInput,
      setter: setShowKanInput,
      name: "暗槓",
    },
    {
      boolean_show: visibleInputs.showDispDorasInput,
      setter: setShowDispDorasInput,
      name: "ドラ表示牌",
    },
    {
      boolean_show: visibleInputs.showDispUraDorasInput,
      setter: setShowDispUraDorasInput,
      name: "裏ドラ表示牌",
    },
    {
      boolean_show: visibleInputs.showAkaDorasInput,
      setter: setShowAkaDorasInput,
      name: "赤ドラ枚数",
    },
    {
      boolean_show: visibleInputs.showSituationalInput,
      setter: setShowSituationalInput,
      name: "状況役",
    },
  ];

  return {
    TOGGLE_SHOW_BUTTONS,
    hideAllInput,
    ...inputState,
    ...visibleInputs,
    setRoundWind,
    setSeatWind,
    setHolaTile,
    setHolaType,
    setHand,
    setMelds,
    setKans,
    setDispDoras,
    setDispUraDoras,
    setSituational,
    setAkaDoras,
  };
};

export { useCalculatePoints };
