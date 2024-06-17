import MahjangHeader from '../components/MahjangHeader'
import { Provider } from "@/providers/Provider";
import { Box, Center ,Container,VStack,Link,Image, CardHeader} from "@chakra-ui/react";

export default function Home() {
  return (
    <Provider>
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
