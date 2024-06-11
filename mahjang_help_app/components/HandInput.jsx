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

    const deleteTile = (tile) => {
        const array = [];
        for(let tempTile of hand){
            if(tempTile !== tile){
                array.push(tempTile);
            }
        }
        setHand(array);
    }

    return (
        <div>
            <h2 className='text-center py-5'>手牌入力</h2>
            <Box className='flex justify-center'>
                <HStack wrap="wrap" className='w-5/6'>
                    {tiles.map((tile) => (
                        <Tile key={tile} tile={tile} onClick={addTile} />
                    ))}
                </HStack>
            </Box>
            <Box className='flex justify-center py-5'>
                {hand.map((tile, index) => (
                    <Tile key={index} tile={tile} onClick={deleteTile} />
                ))}
            </Box>
        </div>
    );
};

export default HandInput;