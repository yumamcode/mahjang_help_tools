import React from 'react';
import Tile from './Tile';
import Header from './Header.jsx';
import { HStack,Box, Button, ButtonGroup } from '@chakra-ui/react';
import { useState } from 'react';

const haiArraySupplier = require("../src/haiArraySupplier.js");

const tiles = haiArraySupplier();

const HolaInput = ({ setHola }) => {

  const [tile,setTile] = useState([]);
  const [holaType,setHolaType] = useState("");

    const addTile = (t) => {
      setTile([t]);
      setHola({holaType,t});
  }

    const deleteTile = () => {
      setTile([]);
      setHola();
    }

    const tumoButtonOnClick = () => {
      setHolaType("ツモ");
      setHola({holaType:"ツモ",tile});
    }

    const ronButtonOnClick = () => {
      setHolaType("ロン");
      setHola({holaType:"ロン",tile});
    }

    return (
        <div>
            <Header title="上がり情報入力" className="text-center text-lg py-3"></Header>
            <Box className='flex justify-center py-3'>上がり牌入力</Box>
            <Box className='flex justify-center'>
                <HStack wrap="wrap" className='w-5/6'>
                    {tiles.map((tile,index) => (
                        <Tile key={index} tile={tile} onClick={addTile} />
                    ))}
                </HStack>
            </Box>
            <Box className='flex justify-center py-5'>
              {
                tile.map((input,index)=><Tile key={index} tile={input} onClick={deleteTile} />)
              }
            </Box>
            <Box className='flex justify-center'>上がり方入力</Box>
            <Box className='flex justify-center'>
              <ButtonGroup>
                <Button bgColor={holaType === "ツモ" ? 'red' : 'grey'} onClick={tumoButtonOnClick} _hover="">ツモ</Button>
                <Button bgColor={holaType === "ロン" ? 'red' : 'grey'} onClick={ronButtonOnClick} _hover="">ロン</Button>
              </ButtonGroup>
            </Box>
        </div>
    );
};

export default HolaInput;
