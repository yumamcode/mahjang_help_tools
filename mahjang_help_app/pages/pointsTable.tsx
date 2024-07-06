import { Image } from "@chakra-ui/react";
import { Provider } from "../providers/Provider";
import MahjangHeader from "../components/MahjangHeader";

export default function Home() {
  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <Image src="/majan_point_table.jpg" alt="majanPointTable"></Image>
    </Provider>
  );
}
