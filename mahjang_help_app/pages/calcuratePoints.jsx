import { useState } from 'react';
import HandInput from '../components/HandInput';
import MeldInput from '../components/MeldInput';
import KanInput from '../components/KanInput';
import SituationalInput from '../components/SituationalInput';
import {Provider} from '../providers/Provider';
import ScoreDisplay from '../components/ScoreDisplay';
import {Box,HStack,Center} from "@chakra-ui/react";
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

    return (
        <Provider>
            <MahjangHeader></MahjangHeader>
            <Header title="点数計算" className="text-center text-2xl py-4"></Header>
            <HolaInput hola={hola} setHola={setHola}></HolaInput>
            <HandInput hand={hand} setHand={setHand} />
            <MeldInput melds={melds} setMelds={setMelds} />
            <KanInput kans={kans} setKans={setKans} />
            <SituationalInput situational={situational} setSituational={setSituational} />
            <ScoreDisplay hola={hola} hand={hand} melds={melds} kans={kans} situational={situational} />
        </Provider>
    );
};

export default Index;
