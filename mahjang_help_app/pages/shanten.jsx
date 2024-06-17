import Header from "@/components/Header";
import HaiInputForm from "@/components/HaiInputForm";
import { Provider } from "@/providers/Provider";
import {Box,Link} from "@chakra-ui/react";
import MahjangHeader from "@/components/MahjangHeader";
import HandInput from "@/components/HandInput";
import MeldInput from "@/components/MeldInput";
import KanInput from "@/components/KanInput";
import ShantenDisplay from "@/components/ShantenDisplay";
import { useState } from "react";


export default function Home() {
  const [hand, setHand] = useState([]);
  const [melds, setMelds] = useState([]);
  const [kans, setKans] = useState([]);

  const copyInputTiles = () =>{
    localStorage.setItem("handInput",JSON.stringify(hand));
    localStorage.setItem("meldsInput",JSON.stringify(melds));
    localStorage.setItem("kansInput",JSON.stringify(kans));
  };

  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <Header title="シャンテン数確認" className="text-center text-xl"></Header>
      <HandInput hand={hand} setHand={setHand}></HandInput>
      <MeldInput melds={melds} setMelds={setMelds}></MeldInput>
      <KanInput kans={kans} setKans={setKans}></KanInput>
      <Box className="flex justify-center py-1">
        <Link href="/calculatePoints" className="font-bold" onClick={copyInputTiles}>点数計算へ</Link>
      </Box>
      <ShantenDisplay hand={hand} setHand={setHand} melds={melds} setMelds={setMelds} kans={kans} setKans={setKans}></ShantenDisplay>
      <Box py="20"></Box>
   </Provider>
  );
}
