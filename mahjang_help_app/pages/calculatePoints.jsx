import { useState } from 'react';
import HandInput from '../components/HandInput';
import MeldInput from '../components/MeldInput';
import KanInput from '../components/KanInput';
import SituationalInput from '../components/SituationalInput';
import {Provider} from '../providers/Provider';
import ScoreDisplay from '../components/ScoreDisplay';
import {Box,HStack,Center, ButtonGroup, VStack,Button,Link} from "@chakra-ui/react";
import MahjangHeader from '../components/MahjangHeader';
import Header from '../components/Header';
import HolaInput from '../components/HolaInput';
import WindInput from '../components/WindInput';
import DispDorasInput from '../components/DispDorasInput';
import DispUraDorasInput from '../components/DispUraDorasInput';
import AkaDorasInput from '../components/AkaDorasInput';


const Index = () => {
    const [roundWind,setRoundWind] = useState("東");
    const [seatWind,setSeatWind] = useState("北");
    // const [hola,setHola] = useState({});
    const [holaTile,setHolaTile] = useState("");
    const [holaType,setHolaType] = useState("");
    const [hand, setHand] = useState([]);
    const [melds, setMelds] = useState([]);
    const [kans, setKans] = useState([]);
    const [dispDoras,setDispDoras] = useState([]);
    const [dispUraDoras,setDispUraDoras] = useState([]);
    const [situational, setSituational] = useState({
        richi: false,
        ippatsu: false,
        rinshan: false,
        chankan: false,
        haitei: false,
        houtei: false,
        wRichi: false,
    });
    const [akaDoras,setAkaDoras] = useState(0);
    const [showWindInput,setShowWindInput] = useState(false);
    const [showHandInput, setShowHandInput] = useState(false);
    const [showMeldInput, setShowMeldInput] = useState(false);
    const [showKanInput, setShowKanInput] = useState(false);
    const [showDispDorasInput,setShowDispDorasInput] = useState(false);
    const [showDispUraDorasInput,setShowDispUraDorasInput] = useState(false);
    const [showAkaDorasInput,setShowAkaDorasInput] = useState(false);
    const [showSituationalInput, setShowSituationalInput] = useState(false);
    const [showHolaInput, setShowHolaInput] = useState(false);

    const hideAllInput = () =>{
        setShowWindInput(false);
        setShowHandInput(false);
        setShowMeldInput(false);
        setShowKanInput(false);
        setShowDispDorasInput(false);
        setShowDispUraDorasInput(false);
        setShowSituationalInput(false);
        setShowHolaInput(false);
        setShowAkaDorasInput(false);
    }

    const copyInputTiles = () =>{
        localStorage.setItem("handInput",JSON.stringify(hand));
        localStorage.setItem("meldsInput",JSON.stringify(melds));
        localStorage.setItem("kansInput",JSON.stringify(kans));
      };

      const TOGGLE_SHOW_BUTTONS = [
        {
            boolean_show : showWindInput,
            setter:setShowWindInput,
            name:"場風・自風入力"
        }
        ,
        {
            boolean_show:showHolaInput,
            setter:setShowHolaInput,
            name:"上がり情報入力"

        },
        {
            boolean_show : showHandInput,
            setter : setShowHandInput,
            name:"純手牌入力"
        },
        {
          boolean_show:showMeldInput,
          setter:setShowMeldInput,
          name:"副露入力"
        },
        {
          boolean_show:showKanInput,
          setter:setShowKanInput,
          name:"暗槓入力"
        },
        {
            boolean_show:showDispDorasInput,
            setter:setShowDispDorasInput,
            name:"ドラ表示牌入力"
        },
        {
            boolean_show:showDispUraDorasInput,
            setter:setShowDispUraDorasInput,
            name:"裏ドラ表示牌入力"
        },
        {
            boolean_show:showAkaDorasInput,
            setter:setShowAkaDorasInput,
            name:"赤ドラ枚数入力"
        },
        {
            boolean_show:showSituationalInput,
            setter:setShowSituationalInput,
            name:"状況役入力"
        }
      ];

    return (
        <Provider>
            <MahjangHeader></MahjangHeader>
            <Header title="点数計算" className="text-center text-xl py-3"></Header>
            <Box className='text-center'>
                <ButtonGroup className='flex-wrap space-y-2 w-5/6'>
                <Button style={{display:"none"}}></Button>
                {
                TOGGLE_SHOW_BUTTONS.map(
                    btn => (
                    <Button
                    key={btn.name} 
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

            {showWindInput && <WindInput roundWind={roundWind} setRoundWind={setRoundWind } seatWind={seatWind} setSeatWind={setSeatWind}></WindInput>}

            {showHolaInput && <HolaInput holaTile={holaTile} setHolaTile={setHolaTile}
            holaType={holaType} setHolaType={setHolaType}></HolaInput>}

            {showHandInput && <HandInput hand={hand} setHand={setHand} /> }
            
            {showMeldInput && <MeldInput melds={melds} setMelds={setMelds} />}

            {showKanInput && <KanInput kans={kans} setKans={setKans} />}

            {showDispDorasInput && <DispDorasInput dispDoras={dispDoras} setDispDoras={setDispDoras} />}

            {showDispUraDorasInput && <DispUraDorasInput dispUraDoras={dispUraDoras} setDispUraDoras={setDispUraDoras} />}

            {showAkaDorasInput && <AkaDorasInput akaDoras={akaDoras} setAkaDoras={setAkaDoras}></AkaDorasInput>}
           
            {showSituationalInput &&  <SituationalInput situational={situational} setSituational={setSituational} melds={melds}/>}

            <Box className="flex justify-center py-2">
                <Link href="/shanten" className="font-bold" onClick={copyInputTiles}>シャンテン数計算へ</Link>
            </Box>

            <ScoreDisplay roundWind={roundWind} seatWind={seatWind} holaTile={holaTile} holaType={holaType} hand={hand} setHand={setHand} melds={melds} setMelds={setMelds} kans={kans} setKans={setKans} dispDoras={dispDoras} dispUraDoras={dispUraDoras} 
            akaDoras={akaDoras} situational={situational} />
        </Provider>
    );
};

export default Index;
