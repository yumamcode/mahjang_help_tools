import { Meld } from "@/components/MeldInput";
import { useState } from "react";

const useShanten = () => {
  const [hand, setHand] = useState<string[]>([]);
  const [melds, setMelds] = useState<Meld[]>([]);
  const [kans, setKans] = useState<string[][]>([]);

  const [showHandInput, setShowHandInput] = useState(false);
  const [showMeldInput, setShowMeldInput] = useState(false);
  const [showKanInput, setShowKanInput] = useState(false);

  const hideAllInput = () => {
    setShowHandInput(false);
    setShowMeldInput(false);
    setShowKanInput(false);
  };

  const TOGGLE_SHOW_BUTTONS = [
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
  ];

  return {
    TOGGLE_SHOW_BUTTONS,
    hideAllInput,
    hand,
    melds,
    kans,
    showHandInput,
    showMeldInput,
    showKanInput,
    setHand,
    setMelds,
    setKans,
  };
};

export { useShanten };
