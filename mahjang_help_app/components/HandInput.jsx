import React from 'react';
import Tile from './Tile';
import { HStack,Box } from '@chakra-ui/react';

const haiArraySupplier = require("../src/haiArraySupplier.js");


const tiles = haiArraySupplier();

const HandInput = ({ hand, setHand }) => {
    const addTile = (tile) => {
        if (hand.length < 13) {
            setHand([...hand, tile]);
        }
    };

    return (
        <div>
            <h2 className='text-center'>手牌入力</h2>
            <Box className='flex justify-center'>
                <HStack wrap="wrap" className='w-5/6'>
                    {tiles.map((tile) => (
                        <Tile key={tile} tile={tile} onClick={addTile} />
                    ))}
                </HStack>
            </Box>
            <div className='flex flex-wrap'>
                {hand.map((tile, index) => (
                    <Tile key={index} tile={tile} onClick={() => {}} />
                ))}
            </div>
        </div>
    );
};

export default HandInput;
