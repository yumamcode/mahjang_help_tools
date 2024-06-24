// components/MeldInput.js
import React, { useState} from 'react';
import Tile from './Tile';
import ErrorMsg from './ErrorMsg.jsx';
import Header from './Header.jsx';
import { HStack ,Box,Button, ButtonGroup, VStack} from '@chakra-ui/react';

const haiArraySupplier = require("../src/haiArraySupplier.js");

const tiles = haiArraySupplier();
const MeldInput = ({ melds, setMelds }) => {
    const [meldType, setMeldType] = useState(null);
    const [errMsg,setErrMsg] = useState("");

    const addMeld = (tile) => {

        let meldTiles;

        if (meldType === 'チー') {
            if (['1', '2', '3', '4', '5', '6', '7'].includes(tile[1]) && tile[0] !== "z") {
                const base = parseInt(tile[1]);
                const suit = tile[0];
                meldTiles = [`${suit}${base}`, `${suit}${base+1}`, `${suit}${base+2}`];
            }else{
                setErrMsg("チーは順子の中で最小のものを選択してください。");
                return false;
            }
            } else if (meldType === 'ポン') {
                meldTiles = Array(3).fill(tile);
            } else if (meldType === 'カン') {
                meldTiles = Array(4).fill(tile);
            }else{
                setErrMsg("先にチー・ポン・カンのいずれかを選択してください");
                return false;
            }

        setMelds([...melds, { type: meldType, tiles: meldTiles}]);
        setErrMsg("");
    };

    const deleteMeld = (index) => {
        setMelds(melds.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Header title="副露入力" className="text-center text-lg py-3"></Header>
            <Box className='flex justify-center'>
                <HStack wrap="wrap" className='w-5/6'> 
                    {tiles.map((tile,index) => (
                        <Tile key={index} tile={tile} onClick={addMeld} />
                    ))}
                </HStack>
            </Box>

            <Box className='py-1'>
                <ErrorMsg msg={errMsg}></ErrorMsg>
            </Box>

            <Box className='flex justify-center py-2'>
                <ButtonGroup>
                    <Button bgColor={meldType === "チー" ? 'red' : 'grey'} _hover="" onClick={() => {setMeldType('チー')}}>
                        チー
                    </Button>
                    <Button bgColor={meldType === "ポン" ? 'red' : 'grey'} _hover="" onClick={() => {setMeldType('ポン')}}>
                        ポン
                    </Button>
                    <Button bgColor={meldType === "カン" ? 'red' : 'grey'} _hover="" onClick={() => {setMeldType('カン')}}>
                        カン
                    </Button>
                </ButtonGroup>
            </Box>
            <Box className='py-3'>
                <VStack>
                    {melds.map((meld, index) => (
                        <div key={index}>
                            <strong>{meld.type}:</strong>
                            <HStack>
                                {meld.tiles.map((tile, idx) => (
                                    <Tile className={idx == 0 ? 'rotate-90 ' : ''} key={idx} tile={tile} onClick={() => {}} />
                                ))}
                                <button onClick={() => deleteMeld(index)}>削除</button>
                            </HStack>
                        </div>
                    ))}
                </VStack>
            </Box>
        </div>
    );
};

export default MeldInput;
