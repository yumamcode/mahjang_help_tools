import { Image } from "@chakra-ui/react";
import MahjangHeader from "../components/MahjangHeader";
import { Provider } from "../providers/Provider";

export default function Home() {
  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <Image src="/majan_role_table.jpg" alt="majanRoleTable"></Image>
    </Provider>
  );
}
