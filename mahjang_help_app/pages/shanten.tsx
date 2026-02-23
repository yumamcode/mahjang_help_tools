import { Provider } from "@/providers/Provider";
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
import { MahjangHeader } from "@/components/MahjangHeader";
import { HandInput } from "@/components/HandInput";
import { MeldInput } from "@/components/MeldInput";
import { KanInput } from "@/components/KanInput";
import { ShantenDisplay } from "@/components/ShantenDisplay";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useShanten } from "@/hooks/pages/useShanten";

export default function Home() {
  const {
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
  } = useShanten();

  return (
    <Provider>
      <Box
        minH="100vh"
        bgGradient="linear(to-b, teal.50, white 42%, orange.50)"
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
              borderColor="teal.100"
              boxShadow="xl"
            >
              <Badge
                colorScheme="teal"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="0.75rem"
              >
                Shanten Checker
              </Badge>
              <Heading size={{ base: "lg", md: "xl" }}>
                シャンテン数確認
              </Heading>
              <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
                純手牌・副露・暗槓を入力して、シャンテン数と有効牌をすばやく確認できます。
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Link color="teal.600" fontWeight="bold" href="/calculatePoints">
                  点数計算へ →
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
                編集したい項目を選ぶと、該当フォームが表示されます。
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
                {TOGGLE_SHOW_BUTTONS.map((btn) => (
                  <Button
                    key={btn.name}
                    colorScheme={btn.boolean_show ? "teal" : "gray"}
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
                  isSeparetedLastTile={false}
                ></HandInput>
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
                ></MeldInput>
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
                <KanInput
                  kans={kans}
                  setKans={setKans}
                  melds={melds}
                ></KanInput>
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
              <ShantenDisplay
                hand={hand}
                setHand={setHand}
                melds={melds}
                setMelds={setMelds}
                kans={kans}
                setKans={setKans}
              ></ShantenDisplay>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Provider>
  );
}
