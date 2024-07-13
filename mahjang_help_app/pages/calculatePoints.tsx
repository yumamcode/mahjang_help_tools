import { HandInput } from "../components/HandInput";
import { MeldInput } from "../components/MeldInput";
import { KanInput } from "../components/KanInput";
import { SituationalInput } from "../components/SituationalInput";
import { Provider } from "../providers/Provider";
import { ScoreDisplay } from "../components/ScoreDisplay";
import { Box, ButtonGroup, Button, Link } from "@chakra-ui/react";
import { MahjangHeader } from "../components/MahjangHeader";
import { Header } from "../components/Header";
import { HolaInput } from "../components/HolaInput";
import { WindInput } from "../components/WindInput";
import { DispDorasInput } from "../components/DispDorasInput";
import { DispUraDorasInput } from "../components/DispUraDorasInput";
import { AkaDorasInput } from "../components/AkaDorasInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useCalculatePoints } from "@/hooks/pages/useCalculatePoints";

const Index = () => {
  const {
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
  } = useCalculatePoints();
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
        <HandInput
          hand={hand}
          setHand={setHand}
          melds={melds}
          kans={kans}
          isSeparetedLastTile={true}
        />
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
