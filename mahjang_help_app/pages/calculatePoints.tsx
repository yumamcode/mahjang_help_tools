import { SetStateAction, useState } from "react";
import { HandInput } from "../components/HandInput";
import { MeldInput } from "../components/MeldInput";
import { KanInput } from "../components/KanInput";
import { SituationalInput } from "../components/SituationalInput";
import { Provider } from "../providers/Provider";
import { ScoreDisplay } from "../components/ScoreDisplay";
import {
  Box,
  HStack,
  Center,
  ButtonGroup,
  VStack,
  Button,
  Link,
} from "@chakra-ui/react";
import { MahjangHeader } from "../components/MahjangHeader";
import { Header } from "../components/Header";
import { HolaInput } from "../components/HolaInput";
import { WindInput } from "../components/WindInput";
import { DispDorasInput } from "../components/DispDorasInput";
import { DispUraDorasInput } from "../components/DispUraDorasInput";
import { AkaDorasInput } from "../components/AkaDorasInput";
import type { Meld } from "../components/MeldInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { MIN_LENGTH_AKADORA, WINDS } from "@/src/Constant";

const Index = () => {
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

  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <Header title="点数計算" className="text-center text-xl py-3"></Header>
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

      {showWindInput && (
        <WindInput
          roundWind={roundWind}
          setRoundWind={setRoundWind}
          seatWind={seatWind}
          setSeatWind={setSeatWind}
        ></WindInput>
      )}

      {showHolaInput && (
        <HolaInput
          holaTile={holaTile}
          setHolaTile={setHolaTile}
          holaType={holaType}
          setHolaType={setHolaType}
        ></HolaInput>
      )}

      {showHandInput && (
        <HandInput hand={hand} setHand={setHand} melds={melds} kans={kans} />
      )}

      {showMeldInput && (
        <MeldInput
          melds={melds}
          setMelds={setMelds}
          kans={kans}
          situational={situational}
          setSituational={setSituational}
        />
      )}

      {showKanInput && <KanInput kans={kans} setKans={setKans} melds={melds} />}

      {showDispDorasInput && (
        <DispDorasInput dispDoras={dispDoras} setDispDoras={setDispDoras} />
      )}

      {showDispUraDorasInput && (
        <DispUraDorasInput
          dispUraDoras={dispUraDoras}
          setDispUraDoras={setDispUraDoras}
        />
      )}

      {showAkaDorasInput && (
        <AkaDorasInput
          akaDoras={akaDoras}
          setAkaDoras={setAkaDoras}
        ></AkaDorasInput>
      )}

      {showSituationalInput && (
        <SituationalInput
          situational={situational}
          setSituational={setSituational}
          melds={melds}
        />
      )}

      <Box className="flex justify-center py-2">
        <Link href="/shanten" className="font-bold">
          シャンテン数計算へ
        </Link>
      </Box>

      <ScoreDisplay
        roundWind={roundWind}
        seatWind={seatWind}
        holaTile={holaTile}
        holaType={holaType}
        hand={hand}
        setHand={setHand}
        melds={melds}
        setMelds={setMelds}
        kans={kans}
        setKans={setKans}
        dispDoras={dispDoras}
        dispUraDoras={dispUraDoras}
        akaDoras={akaDoras}
        situational={situational}
      />
    </Provider>
  );
};

export default Index;
