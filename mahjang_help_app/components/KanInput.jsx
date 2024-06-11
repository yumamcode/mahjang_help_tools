import React from 'react';
import Tile from './Tile';
import { Box,HStack,VStack } from '@chakra-ui/react';

const haiArraySupplier = require("../src/haiArraySupplier.js");

const tiles = haiArraySupplier();

const KanInput = ({ kans, setKans }) => {
    const addKan = (tile) => {
        if (kans.length < 4) {
            setKans([...kans, [tile, tile, tile, tile]]);
        }
    };

    const deleteKan = (index) => {
        setKans(kans.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h2 className="text-center">暗槓入力</h2>
            <Box className='flex justify-center py-5'>
                <HStack wrap="wrap" className='w-5/6'>
                    {tiles.map((tile) => (
                        <Tile key={tile} tile={tile} onClick={addKan} />
                    ))}
                </HStack>
            </Box>
            <Box className='flex justify-center py-5'>
                <VStack>
                {kans.map((kan,index) => (
                    <HStack key={index}>
                        {kan.map((tile, idx) => (
                            <Tile key={idx} tile={tile} onClick={() => {}} />
                        ))}
                        <button onClick={() => deleteKan(index)}>削除</button>
                    </HStack>
                ))}
                </VStack>
            </Box>
        </div>
    );
};

export default KanInput;