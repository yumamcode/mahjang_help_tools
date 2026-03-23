import { Image } from "@chakra-ui/react";
import { Provider } from "../providers/Provider";
import { MahjangHeader } from "../components/MahjangHeader";

export default function Home() {
  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <div className="flex justify-center px-4 py-6">
        <Image
          src="/majan_point_table.jpg"
          alt="majanPointTable"
          className="mx-auto"
          maxW="100%"
        ></Image>
      </div>
    </Provider>
  );
}
