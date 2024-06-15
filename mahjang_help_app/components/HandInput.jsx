import React from 'react';
import Tile from './Tile';
import Header from './Header.jsx';
import { HStack,Box } from '@chakra-ui/react';

const haiArraySupplier = require("../src/haiArraySupplier.js");


const tiles = haiArraySupplier();

const HandInput = ({ hand, setHand }) => {
    const addTile = (tile) => {
        if (hand.length < 14) {
            setHand([...hand, tile]);
        }
    };

    const deleteTile = (index) => {
        setHand(hand.filter((_, i) => i !== index));
    }

    return (
        <div>
            <Header title="純手牌入力" className="text-center text-lg py-3"></Header>
            <Box className='flex justify-center'>
                <HStack wrap="wrap" className='w-5/6'>
                    {tiles.map((tile,index) => (
                        <Tile key={index} tile={tile} onClick={addTile} />
                    ))}
                </HStack>
            </Box>
            <Box className='flex justify-center py-5'>
                {hand.map((tile, index) => (
                    <Tile key={index} tile={tile} onClick={()=>deleteTile(index)} />
                ))}
            </Box>
        </div>
    );
};

export default HandInput;
