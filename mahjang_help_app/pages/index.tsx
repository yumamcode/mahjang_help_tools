import { MahjangHeader } from "../components/MahjangHeader";
import { Seo } from "../components/MahjangHead";
import { Provider } from "@/providers/Provider";
import { VStack, Link } from "@chakra-ui/react";

export default function Home() {
  return (
    <Provider>
      <Seo
        pageTitle="麻雀支援ツール"
        pageDescription="麻雀の難しいところをサポートします。シャンテン数・和了点計算 待ち牌の検索ができます。"
      ></Seo>
      <MahjangHeader></MahjangHeader>
      <VStack bgColor="orange">
        <Link href="/roleTable">役表</Link>
        <Link href="/pointsTable">点数表</Link>
        <Link href="/shanten">シャンテン数計算</Link>
        <Link href="/calculatePoints">点数計算</Link>
      </VStack>
    </Provider>
  );
}
