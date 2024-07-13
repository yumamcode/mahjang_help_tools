import { Meld } from "@/components/MeldInput";
import { MIN_LENGTH_AKADORA, WINDS } from "@/src/Constant";
import { useState } from "react";

const useCalculatePoints = () => {
  const [roundWind, setRoundWind] = useState(WINDS.TON);
  const [seatWind, setSeatWind] = useState(WINDS.PE);
  const [holaTile, setHolaTile] = useState<string | undefined>(undefined);
  const [holaType, setHolaType] = useState<string | undefined>(undefined);
  const [hand, setHand] = useState<string[]>([]);
  const [melds, setMelds] = useState<Meld[]>([]);
  const [kans, setKans] = useState<string[][]>([]);
  const [dispDoras, setDispDoras] = useState<string[]>([]);
  const [dispUraDoras, setDispUraDoras] = useState<string[]>([]);
  const [situational, setSituational] = useState<string[]>([]);
  const [akaDoras, setAkaDoras] = useState(MIN_LENGTH_AKADORA);
  const [showWindInput, setShowWindInput] = useState(false);
  const [showHandInput, setShowHandInput] = useState(false);
  const [showMeldInput, setShowMeldInput] = useState(false);
  const [showKanInput, setShowKanInput] = useState(false);
  const [showDispDorasInput, setShowDispDorasInput] = useState(false);
  const [showDispUraDorasInput, setShowDispUraDorasInput] = useState(false);
  const [showAkaDorasInput, setShowAkaDorasInput] = useState(false);
  const [showSituationalInput, setShowSituationalInput] = useState(false);
  const [showHolaInput, setShowHolaInput] = useState(false);

  const hideAllInput = () => {
    setShowWindInput(false);
    setShowHandInput(false);
    setShowMeldInput(false);
    setShowKanInput(false);
    setShowDispDorasInput(false);
    setShowDispUraDorasInput(false);
    setShowSituationalInput(false);
    setShowHolaInput(false);
    setShowAkaDorasInput(false);
  };

  const TOGGLE_SHOW_BUTTONS = [
    {
      boolean_show: showWindInput,
      setter: setShowWindInput,
      name: "場風・自風",
    },
    {
      boolean_show: showHolaInput,
      setter: setShowHolaInput,
      name: "上がり牌",
    },
    {
      boolean_show: showHandInput,
      setter: setShowHandInput,
      name: "純手牌",
    },
    {
      boolean_show: showMeldInput,
      setter: setShowMeldInput,
      name: "副露",
    },
    {
      boolean_show: showKanInput,
      setter: setShowKanInput,
      name: "暗槓",
    },
    {
      boolean_show: showDispDorasInput,
      setter: setShowDispDorasInput,
      name: "ドラ表示牌",
    },
    {
      boolean_show: showDispUraDorasInput,
      setter: setShowDispUraDorasInput,
      name: "裏ドラ表示牌",
    },
    {
      boolean_show: showAkaDorasInput,
      setter: setShowAkaDorasInput,
      name: "赤ドラ枚数",
    },
    {
      boolean_show: showSituationalInput,
      setter: setShowSituationalInput,
      name: "状況役",
    },
  ];

  return {
    TOGGLE_SHOW_BUTTONS,
    hideAllInput,
    roundWind,
    seatWind,
    holaTile,
    holaType,
    hand,
    melds,
    kans,
    dispDoras,
    dispUraDoras,
    situational,
    akaDoras,
    showWindInput,
    showHandInput,
    showMeldInput,
    showKanInput,
    showDispDorasInput,
    showDispUraDorasInput,
    showAkaDorasInput,
    showSituationalInput,
    showHolaInput,
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
