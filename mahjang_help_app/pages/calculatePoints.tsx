import { HandInput } from "../components/HandInput";
import { MeldInput } from "../components/MeldInput";
import { KanInput } from "../components/KanInput";
import { SituationalInput } from "../components/SituationalInput";
import { Provider } from "../providers/Provider";
import { ScoreDisplay } from "../components/ScoreDisplay";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MahjangHeader } from "../components/MahjangHeader";
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
      <Box
        minH="100vh"
        bgGradient="linear(to-b, orange.50, white 42%, teal.50)"
        pb={{ base: 12, md: 16 }}
      >
        <MahjangHeader></MahjangHeader>

        <Container maxW="6xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={{ base: 6, md: 8 }} align="stretch">
            <VStack
              align={{ base: "stretch", md: "flex-start" }}
              spacing={4}
              bg="whiteAlpha.900"
              borderRadius="2xl"
              p={{ base: 5, md: 8 }}
              border="1px solid"
              borderColor="orange.100"
              boxShadow="xl"
            >
              <Badge
                colorScheme="orange"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="0.75rem"
              >
                Score Calculator
              </Badge>
              <Heading size={{ base: "lg", md: "xl" }}>点数計算</Heading>
              <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
                場風・自風・和了牌・ドラ・副露情報を入力して、和了点をすばやく計算できます。
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Link color="orange.600" fontWeight="bold" href="/shanten">
                  シャンテン数計算へ →
                </Link>
                <Link color="gray.600" fontWeight="semibold" href="/">
                  トップへ戻る
                </Link>
              </HStack>
            </VStack>

            <Box
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="lg"
              p={{ base: 4, md: 6 }}
            >
              <Text fontWeight="bold" color="gray.700" mb={1}>
                入力切り替え
              </Text>
              <Text color="gray.500" fontSize="sm" mb={4}>
                編集したい項目を選ぶと、該当フォームだけが表示されます。
              </Text>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={3}
              >
                {TOGGLE_SHOW_BUTTONS.map((btn) => (
                  <Button
                    key={btn.name}
                    colorScheme={btn.boolean_show ? "orange" : "gray"}
                    variant={btn.boolean_show ? "solid" : "outline"}
                    rightIcon={
                      btn.boolean_show ? <ExpandLessIcon /> : <ExpandMoreIcon />
                    }
                    w="full"
                    onClick={() => {
                      if (btn.boolean_show) {
                        btn.setter(false);
                        return;
                      }
                      hideAllInput();
                      btn.setter(true);
                    }}
                  >
                    {btn.name}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>

            {showWindInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <WindInput
                  roundWind={roundWind}
                  setRoundWind={setRoundWind}
                  seatWind={seatWind}
                  setSeatWind={setSeatWind}
                ></WindInput>
              </Box>
            )}

            {showHolaInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <HolaInput
                  holaTile={holaTile}
                  setHolaTile={setHolaTile}
                  holaType={holaType}
                  setHolaType={setHolaType}
                ></HolaInput>
              </Box>
            )}

            {showHandInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <HandInput
                  hand={hand}
                  setHand={setHand}
                  melds={melds}
                  kans={kans}
                  isSeparetedLastTile={true}
                />
              </Box>
            )}

            {showMeldInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <MeldInput
                  melds={melds}
                  setMelds={setMelds}
                  kans={kans}
                  situational={situational}
                  setSituational={setSituational}
                />
              </Box>
            )}

            {showKanInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <KanInput kans={kans} setKans={setKans} melds={melds} />
              </Box>
            )}

            {showDispDorasInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <DispDorasInput
                  dispDoras={dispDoras}
                  setDispDoras={setDispDoras}
                />
              </Box>
            )}

            {showDispUraDorasInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <DispUraDorasInput
                  dispUraDoras={dispUraDoras}
                  setDispUraDoras={setDispUraDoras}
                />
              </Box>
            )}

            {showAkaDorasInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <AkaDorasInput
                  akaDoras={akaDoras}
                  setAkaDoras={setAkaDoras}
                ></AkaDorasInput>
              </Box>
            )}

            {showSituationalInput && (
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
              >
                <SituationalInput
                  situational={situational}
                  setSituational={setSituational}
                  melds={melds}
                />
              </Box>
            )}

            <Box
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="xl"
              p={{ base: 4, md: 6 }}
            >
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
            </Box>
          </VStack>
        </Container>
      </Box>
    </Provider>
  );
};

export default Index;
