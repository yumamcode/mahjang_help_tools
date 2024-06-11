import React from 'react';
import Tile from './Tile';
import { Box,HStack } from '@chakra-ui/react';

const haiArraySupplier = require("../src/haiArraySupplier.js");

const tiles = haiArraySupplier();

const KanInput = ({ kans, setKans }) => {
    const addKan = (tile) => {
        if (kans.length < 4) {
            setKans([...kans, [tile, tile, tile, tile]]);
        }
    };

    return (
        <div>
            <h2>暗槓入力</h2>
            <Box className='flex justify-center'>
                <HStack wrap="wrap" className='w-5/6'>
                    {tiles.map((tile) => (
                        <Tile key={tile} tile={tile} onClick={addKan} />
                    ))}
                </HStack>
            </Box>
            <div className='flex flex-wrap'>
                {kans.map((kan, index) => (
                    <div key={index}>
                        {kan.map((tile, idx) => (
                            <Tile key={idx} tile={tile} onClick={() => {}} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanInput;
