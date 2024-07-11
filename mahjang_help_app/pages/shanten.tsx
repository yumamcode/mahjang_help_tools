import { Header } from "@/components/Header";
import { Provider } from "@/providers/Provider";
import { Box, ButtonGroup, Link, Button } from "@chakra-ui/react";
import { MahjangHeader } from "@/components/MahjangHeader";
import { HandInput } from "@/components/HandInput";
import { MeldInput } from "@/components/MeldInput";
import { KanInput } from "@/components/KanInput";
import { ShantenDisplay } from "@/components/ShantenDisplay";
import { useState } from "react";
import type { Meld } from "@/components/MeldInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function Home() {
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

  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <Header
        title="シャンテン数確認"
        className="text-center text-xl py-3"
      ></Header>
      <Box className="text-center">
        <ButtonGroup className="flex-wrap space-y-2 w-5/6">
          <Button style={{ display: "none" }}></Button>
          {TOGGLE_SHOW_BUTTONS.map((btn) => (
            <div key={btn.name}>
              {btn.boolean_show && (
                <Button
                  colorScheme="red"
                  rightIcon={<ExpandLessIcon></ExpandLessIcon>}
                  width="150px"
                  onClick={() => {
                    btn.setter(false);
                  }}
                >
                  {btn.name}
                </Button>
              )}
              {!btn.boolean_show && (
                <Button
                  colorScheme="blackAlpha"
                  rightIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                  width="150px"
                  onClick={() => {
                    hideAllInput();
                    btn.setter(true);
                  }}
                >
                  {btn.name}
                </Button>
              )}
            </div>
          ))}
        </ButtonGroup>
      </Box>
      {showHandInput && (
        <HandInput
          hand={hand}
          setHand={setHand}
          melds={melds}
          kans={kans}
        ></HandInput>
      )}
      {showMeldInput && (
        <MeldInput melds={melds} setMelds={setMelds} kans={kans}></MeldInput>
      )}
      {showKanInput && (
        <KanInput kans={kans} setKans={setKans} melds={melds}></KanInput>
      )}
      <Box className="flex justify-center py-2">
        <Link href="/calculatePoints" className="font-bold">
          点数計算へ
        </Link>
      </Box>
      <ShantenDisplay
        hand={hand}
        setHand={setHand}
        melds={melds}
        setMelds={setMelds}
        kans={kans}
        setKans={setKans}
      ></ShantenDisplay>
      <Box py="20"></Box>
    </Provider>
  );
}
