import { MahjangHeader } from "../components/MahjangHeader";
import { Seo } from "../components/MahjangHead";
import { Provider } from "@/providers/Provider";
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const FEATURE_LINKS = [
  {
    title: "役表",
    description: "代表的な役と条件を一覧で確認できます。",
    href: "/roleTable",
  },
  {
    title: "点数表",
    description: "翻数と符数から支払い点を素早く確認できます。",
    href: "/pointsTable",
  },
  {
    title: "シャンテン数計算",
    description: "現在手牌のシャンテン数を自動で計算します。",
    href: "/shanten",
  },
  {
    title: "点数計算",
    description: "状況を入力して和了時の点数を計算できます。",
    href: "/calculatePoints",
  },
];

export default function Home() {
  return (
    <Provider>
      <Seo
        pageTitle="麻雀支援ツール"
        pageDescription="麻雀の難しいところをサポートします。シャンテン数計算と和了点計算を素早く行えます。"
      ></Seo>
      <Box
        minH="100vh"
        bgGradient="linear(to-b, orange.50, white 38%, teal.50)"
        pb={{ base: 12, md: 16 }}
      >
        <MahjangHeader></MahjangHeader>

        <Container maxW="6xl" px={{ base: 4, md: 8 }}>
          <VStack
            align={{ base: "stretch", md: "flex-start" }}
            spacing={{ base: 8, md: 10 }}
          >
            <VStack
              align={{ base: "stretch", md: "flex-start" }}
              spacing={4}
              bg="whiteAlpha.900"
              borderRadius="2xl"
              p={{ base: 5, md: 8 }}
              border="1px solid"
              borderColor="orange.100"
              boxShadow="xl"
              w="full"
            >
              <Badge
                colorScheme="orange"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="0.75rem"
              >
                Mahjong Helper Tools
              </Badge>
              <Heading
                size={{ base: "lg", md: "xl" }}
                lineHeight={{ base: "short", md: "shorter" }}
              >
                麻雀の学習と点数確認を、
                <br />
                1つの画面からすばやく
              </Heading>
              <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
                必要な機能をタップして、役の確認・シャンテン数計算・点数計算をすぐに始められます。
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={5} w="full">
              {FEATURE_LINKS.map((feature, index) => (
                <Link
                  key={feature.href}
                  href={feature.href}
                  _hover={{ textDecoration: "none" }}
                >
                  <VStack
                    align="stretch"
                    spacing={4}
                    h="full"
                    p={5}
                    borderRadius="xl"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.100"
                    boxShadow="lg"
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "2xl",
                      borderColor: "orange.200",
                    }}
                  >
                    <HStack justify="space-between" align="center">
                      <Text fontWeight="bold" color="gray.800" fontSize="lg">
                        {feature.title}
                      </Text>
                      <Box
                        w={8}
                        h={8}
                        borderRadius="full"
                        bg="orange.100"
                        color="orange.700"
                        display="grid"
                        placeItems="center"
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        {index + 1}
                      </Box>
                    </HStack>
                    <Text color="gray.600" fontSize="sm" minH="3.5rem">
                      {feature.description}
                    </Text>
                    <Text color="teal.600" fontWeight="semibold" fontSize="sm">
                      ページを開く →
                    </Text>
                  </VStack>
                </Link>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Provider>
  );
}
