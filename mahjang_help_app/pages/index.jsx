import Header from "@/components/Header";
import Contents from "@/components/Contents";
import { Provider } from "@/providers/Provider";
import { Box, Center ,Container,VStack,Link,Image, CardHeader} from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <Provider>
      <div className="flex justify-center items-center">
        <Image src="/haiImg/s1.jpg" boxSize="30px "alt="header_icon"></Image>
        <Header title="麻雀支援ツール"></Header>
        <Image src="/haiImg/s1.jpg" boxSize="30px" alt="header_icon"></Image>
      </div>
      <VStack bgColor="orange" height="auto" centerContent listStyleType="initial">
        <Link>ルール</Link>
        <Link>役表</Link>
        <Link>点数表</Link>
        <Link href="/shanten">シャンテン数計算</Link>
      </VStack>
   </Provider>
  );
}
