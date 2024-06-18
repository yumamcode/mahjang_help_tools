import Header from "@/components/Header";
import HaiInputForm from "@/components/HaiInputForm";
import { Provider } from "@/providers/Provider";
import {Box,ButtonGroup,Link,Button} from "@chakra-ui/react";
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

  const [showHandInput, setShowHandInput] = useState(false);
  const [showMeldInput, setShowMeldInput] = useState(false);
  const [showKanInput, setShowKanInput] = useState(false);

  const hideAllInput = () =>{
      setShowHandInput(false);
      setShowMeldInput(false);
      setShowKanInput(false);
  }


  const copyInputTiles = () =>{
    localStorage.setItem("handInput",JSON.stringify(hand));
    localStorage.setItem("meldsInput",JSON.stringify(melds));
    localStorage.setItem("kansInput",JSON.stringify(kans));
  };

  const TOGGLE_SHOW_BUTTONS = [
  {
      boolean_show : showHandInput,
      setter : setShowHandInput,
      name:"純手牌"
  },
  {
    boolean_show:showMeldInput,
    setter:setShowMeldInput,
    name:"副露"
  },
  {
    boolean_show:showKanInput,
    setter:setShowKanInput,
    name:"暗槓"
  }
];

  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <Header title="シャンテン数確認" className="text-center text-xl py-3"></Header>
      <Box className='text-center'>
        <ButtonGroup className='flex-wrap space-y-2 w-5/6'>
        <Button style={{display:"none"}}>
        </Button>
        {
          TOGGLE_SHOW_BUTTONS.map(
            btn => (
              <Button
              key={btn.name} 
              width="150px"
              bgColor={btn.boolean_show ? 'red' : 'grey'}
              _hover=""
              onClick={()=>{
                hideAllInput();
                btn.setter(!btn.boolean_show);
              }}>
                {btn.name} {btn.boolean_show ? "▲" : "▼"}
              </Button>
            )
          )
        }
        </ButtonGroup>
      </Box>
      {showHandInput && <HandInput hand={hand} setHand={setHand}></HandInput>}
      {showMeldInput && <MeldInput melds={melds} setMelds={setMelds}></MeldInput>}
      {showKanInput && <KanInput kans={kans} setKans={setKans}></KanInput>}
      <Box className="flex justify-center py-2">
        <Link href="/calculatePoints" className="font-bold" onClick={copyInputTiles}>点数計算へ</Link>
      </Box>
      <ShantenDisplay hand={hand} setHand={setHand} melds={melds} setMelds={setMelds} kans={kans} setKans={setKans}></ShantenDisplay>
      <Box py="20"></Box>
   </Provider>
  );
}
