import { Provider } from "../providers/Provider";
import { Header } from "./Header";
import { Image, Box, Link } from "@chakra-ui/react";

export default function MahjangHeader() {
  return (
    <Provider>
      <Link href="/" className="flex justify-center items-center">
        <Image src="/haiImg/s1.jpg" boxSize="30px " alt="header_icon"></Image>
        <Header
          title="麻雀支援ツール"
          className="text-center text-4xl py-7"
        ></Header>
        <Image src="/haiImg/s1.jpg" boxSize="30px" alt="header_icon"></Image>
      </Link>
    </Provider>
  );
}
