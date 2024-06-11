// components/MeldInput.js
import React, { useState } from 'react';
import Tile from './Tile';
import { HStack ,Box,Button, ButtonGroup, VStack} from '@chakra-ui/react';

const haiArraySupplier = require("../src/haiArraySupplier.js");

const tiles = haiArraySupplier();
const MeldInput = ({ melds, setMelds }) => {
    const [selectedTiles, setSelectedTiles] = useState([]);
    const [meldType, setMeldType] = useState(null);

    const addTile = (tile) => {
        if (meldType === 'chi') {
            if (['1', '2', '3', '4', '5', '6', '7'].includes(tile[1]) && tile[0] !== "z") {
                const base = parseInt(tile[1]);
                const suit = tile[0];
                setSelectedTiles([`${suit}${base}`, `${suit}${base+1}`, `${suit}${base+2}`]);
            }
        } else if (meldType === 'pon' && selectedTiles.length < 1) {
            setSelectedTiles(Array(3).fill(tile));
        } else if (meldType === 'kan' && selectedTiles.length < 1) {
            setSelectedTiles(Array(4).fill(tile));
        }
    };

    const confirmMeld = () => {
        let valid = true;
        if (meldType === 'chi') {
            const chiNumbers = selectedTiles.map(tile => parseInt(tile[1]));
            console.log(chiNumbers);
            const isValidChi = chiNumbers[1] * 2 == (chiNumbers[0] + chiNumbers[2]);
            valid = isValidChi && selectedTiles.length === 3;
        } else if (meldType === 'pon') {
            const ponNumbers = selectedTiles.map(tile => tile[1]);
            const isValidPon = ponNumbers.every(num => num === ponNumbers[0]);
            valid = isValidPon && selectedTiles.length === 3;
        } else if (meldType === 'kan') {
            const kanNumbers = selectedTiles.map(tile => tile[1]);
            const isValidKan = kanNumbers.every(num => num === kanNumbers[0]);
            valid = isValidKan && selectedTiles.length === 4;
        }

        if (valid) {
            setMelds([...melds, { type: meldType, tiles: selectedTiles }]);
        }

        setSelectedTiles([]);
        setMeldType(null);
        
    };

    const deleteMeld = (index) => {
        setMelds(melds.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h2 className='text-center'>副露入力</h2>
            <Box className='flex justify-center py-5'>
                <HStack wrap="wrap" className='w-5/6'> 
                    {tiles.map((tile) => (
                        <Tile key={tile} tile={tile} onClick={addTile} />
                    ))}
                </HStack>
            </Box>
           
            <Box className='flex justify-center'>
                <HStack>
                    {selectedTiles.map((tile, index) => (
                        <Tile key={index} tile={tile} onClick={() => {setSelectedTiles([])}} />
                    ))}
                </HStack>
            </Box>
            <Box className='flex justify-center py-5'>
                <ButtonGroup>
                    <Button bgColor={meldType === "chi" ? 'red' : 'grey'} _hover="" onClick={() => setMeldType('chi')}>チー</Button>
                    <Button bgColor={meldType === "pon" ? 'red' : 'grey'} _hover="" onClick={() => setMeldType('pon')}>ポン</Button>
                    <Button bgColor={meldType === "kan" ? 'red' : 'grey'} _hover="" onClick={() => setMeldType('kan')}>カン</Button>
                    <Button onClick={confirmMeld}>確定</Button>
                </ButtonGroup>
            </Box>
            <Box>
                <VStack>
                    {melds.map((meld, index) => (
                        <div key={index}>
                            <strong>{meld.type.toUpperCase()}:</strong>
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
