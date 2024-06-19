// components/MeldInput.js
import React, { useState} from 'react';
import Tile from './Tile';
import ErrorMsg from './ErrorMsg.jsx';
import Header from './Header.jsx';
import { HStack ,Box,Button, ButtonGroup, VStack} from '@chakra-ui/react';

const haiArraySupplier = require("../src/haiArraySupplier.js");

const tiles = haiArraySupplier();
const MeldInput = ({ melds, setMelds }) => {
    const [selectedTiles, setSelectedTiles] = useState([]);
    const [meldType, setMeldType] = useState(null);
    const [errMsg,setErrMsg] = useState("");

    const addTile = (tile) => {
        if (meldType === 'チー') {
            if (['1', '2', '3', '4', '5', '6', '7'].includes(tile[1]) && tile[0] !== "z") {
                const base = parseInt(tile[1]);
                const suit = tile[0];
                setSelectedTiles([`${suit}${base}`, `${suit}${base+1}`, `${suit}${base+2}`]);
            }
        } else if (meldType === 'ポン' && selectedTiles.length < 1) {
            setSelectedTiles(Array(3).fill(tile));
        } else if (meldType === 'カン' && selectedTiles.length < 1) {
            setSelectedTiles(Array(4).fill(tile));
        }
    };

    const confirmMeld = () => {
        let valid = true;
        if (meldType === 'チー') {
            const chiNumbers = selectedTiles.map(tile => parseInt(tile[1]));
            const isValidChi = chiNumbers[0] !== chiNumbers[1] && chiNumbers[1] * 2 == chiNumbers[0] + chiNumbers[2];
            valid = isValidChi && selectedTiles.length === 3;
        } else if (meldType === 'ポン') {
            const ponNumbers = selectedTiles.map(tile => tile[1]);
            const isValidPon = ponNumbers.every(num => num === ponNumbers[0]);
            valid = isValidPon && selectedTiles.length === 3;
        } else if (meldType === 'カン') {
            const kanNumbers = selectedTiles.map(tile => tile[1]);
            const isValidKan = kanNumbers.every(num => num === kanNumbers[0]);
            valid = isValidKan && selectedTiles.length === 4;
        }else{
            return false;
        }

        if (valid) {
            setMelds([...melds, { type: meldType, tiles: selectedTiles }]);
            setErrMsg("");
        }else{
            setErrMsg("無効な形式のため、追加されませんでした。")
        }

        setSelectedTiles([]);
        setMeldType(null);
        
    };

    const deleteMeld = (index) => {
        setMelds(melds.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Header title="副露入力" className="text-center text-lg py-3"></Header>
            <Box className='text-center text-red-400 font-bold'>
                ※確定を押すまで副露に反映されません。
            </Box>
            <Box className='flex justify-center'>
                <HStack wrap="wrap" className='w-5/6'> 
                    {tiles.map((tile,index) => (
                        <Tile key={index} tile={tile} onClick={addTile} />
                    ))}
                </HStack>
            </Box>
           
            <Box className='flex justify-center py-3'>
                <HStack>
                    {selectedTiles.map((tile, index) => (
                        <Tile key={index} tile={tile} onClick={() => {setSelectedTiles([])}} />
                    ))}
                </HStack>
            </Box>

            <Box className='py-1'>
                <ErrorMsg msg={errMsg}></ErrorMsg>
            </Box>

            <Box className='flex justify-center py-2'>
                <ButtonGroup>
                    <Button bgColor={meldType === "チー" ? 'red' : 'grey'} _hover="" onClick={() => {
                        if(selectedTiles.length < 1){
                        setMeldType('チー')
                        }
                    }
                    }>チー</Button>
                    <Button bgColor={meldType === "ポン" ? 'red' : 'grey'} _hover="" onClick={() => {
                        if(selectedTiles.length < 1){
                        setMeldType('ポン')
                        }
                    }
                        }>ポン</Button>
                    <Button bgColor={meldType === "カン" ? 'red' : 'grey'} _hover="" onClick={() => {
                        if(selectedTiles.length < 1){
                        setMeldType('カン')
                        }
                    }
                        }>カン</Button>
                    <Button onClick={confirmMeld}>確定</Button>
                </ButtonGroup>
            </Box>
            <Box className='py-3'>
                <VStack>
                    {melds.map((meld, index) => (
                        <div key={index}>
                            <strong>{meld.type}:</strong>
                            <HStack>
                                {meld.tiles.map((tile, idx) => (
                                    <Tile key={idx} tile={tile} onClick={() => {}} />
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
