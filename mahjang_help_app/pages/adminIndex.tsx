import { MahjangHeader } from "@/components/MahjangHeader";
import { Provider } from "@/providers/Provider";
import { VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <VStack bgColor="orange">
        <Link href="/wordDictionaryAdmin">用語集管理</Link>
      </VStack>
    </Provider>
  );
}
