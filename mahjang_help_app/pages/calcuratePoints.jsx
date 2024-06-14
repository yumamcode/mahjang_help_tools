import { useState } from 'react';
import HandInput from '../components/HandInput';
import MeldInput from '../components/MeldInput';
import KanInput from '../components/KanInput';
import SituationalInput from '../components/SituationalInput';
import {Provider} from '../providers/Provider';
import ScoreDisplay from '../components/ScoreDisplay';
import {Box,HStack,Center, ButtonGroup, VStack,Button} from "@chakra-ui/react";
import MahjangHeader from '../components/MahjangHeader';
import Header from '../components/Header';
import HolaInput from '../components/HolaInput';

const Index = () => {
    const [hola,setHola] = useState({});
    const [hand, setHand] = useState([]);
    const [melds, setMelds] = useState([]);
    const [kans, setKans] = useState([]);
    const [situational, setSituational] = useState({
        richi: false,
        ippatsu: false,
        rinshan: false,
        chankan: false,
        haitei: false,
        houtei: false,
        wRichi: false,
    });
    const [showHandInput, setShowHandInput] = useState(false);
    const [showMeldInput, setShowMeldInput] = useState(false);
    const [showKanInput, setShowKanInput] = useState(false);
    const [showSituationalInput, setShowSituationalInput] = useState(false);
    const [showHolaInput, setShowHolaInput] = useState(false);

    return (
        <Provider>
            <MahjangHeader></MahjangHeader>
            <Header title="点数計算" className="text-center text-xl py-3"></Header>
            <Box>
                <VStack>
                    <ButtonGroup className='flex flex-col space-y-2'>
                        <Button bgColor={showHolaInput? 'red' : 'grey'} _hover="" onClick={() => setShowHolaInput(!showHolaInput)}>
                            上がり情報入力 {showHolaInput ? "▲" : "▼"}
                        </Button>
                        <Button bgColor={showHandInput? 'red' : 'grey'} _hover="" onClick={() => setShowHandInput(!showHandInput)}>
                            純手牌入力 {showHandInput ? "▲" : "▼"}
                        </Button>
                        <Button bgColor={showMeldInput? 'red' : 'grey'} _hover="" onClick={() => setShowMeldInput(!showMeldInput)}>
                            副露入力 {showMeldInput ? "▲" : "▼"}
                        </Button>
                        <Button bgColor={showKanInput? 'red' : 'grey'} _hover="" onClick={() => setShowKanInput(!showKanInput)}>
                            暗槓入力 {showKanInput ? "▲" : "▼"}
                        </Button>
                        <Button bgColor={showSituationalInput? 'red' : 'grey'} _hover="" 
                        onClick={() => setShowSituationalInput(!showSituationalInput)}>
                            状況役入力 {showSituationalInput ? "▲" : "▼"}
                        </Button>
                    </ButtonGroup>
                </VStack>
            </Box>
           
            {showHolaInput && <HolaInput hola={hola} setHola={setHola}></HolaInput>}

            
            {showHandInput && <HandInput hand={hand} setHand={setHand} />}

            
            {showMeldInput &&<MeldInput melds={melds} setMelds={setMelds} />}

            
            {showKanInput && <KanInput kans={kans} setKans={setKans} />}

           
            {showSituationalInput &&  <SituationalInput situational={situational} setSituational={setSituational} />}

            <ScoreDisplay hola={hola} hand={hand} melds={melds} kans={kans} situational={situational} />
        </Provider>
    );
};

export default Index;
