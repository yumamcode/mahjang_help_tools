import Header from "@/components/Header";
import HaiInputForm from "@/components/HaiInputForm";
import { Provider } from "@/providers/Provider";
import {Box} from "@chakra-ui/react";
import MahjangHeader from "@/components/MahjangHeader";
import { useState } from "react";


export default function Home() {
  const [hand,setHand] = useState([]);
  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <Header title="シャンテン数確認" className="text-center text-xl py-3"></Header>
      <HaiInputForm hand={hand} setHand={setHand}></HaiInputForm>
      <Box py="20"></Box>
   </Provider>
  );
}
