import React, { Dispatch, SetStateAction } from "react";
import { Tile } from "./Tile";
import { Header } from "./Header";
import { HStack, Box, Button } from "@chakra-ui/react";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";
import { MAX_HANDS_LENGTH } from "@/src/Constant";

const tiles = HAI_ARRAY;

const HandInput = ({
  hand,
  setHand,
}: {
  hand: string[];
  setHand: Dispatch<SetStateAction<string[]>>;
}) => {
  const addTile = (tile: string) => {
    if (hand.length < MAX_HANDS_LENGTH) {
      setHand([...hand, tile]);
    }
  };

  const deleteTile = (index: number) => {
    setHand(hand.filter((_: string, i: number) => i !== index));
  };

  return (
    <div>
      <Box className="flex justify-center space-x-2 py-3">
        <Header title="純手牌入力" className="text-center text-lg"></Header>
      </Box>
      <Box className="flex justify-center">
        <HStack wrap="wrap" className="w-5/6">
          {tiles.map((tile: string, index: number) => (
            <Tile key={index} tile={tile} onClick={addTile} />
          ))}
        </HStack>
      </Box>
      <Box className="flex justify-center py-5">
        {hand.map((tile: string, index: number) => (
          <Tile key={index} tile={tile} onClick={() => deleteTile(index)} />
        ))}
      </Box>
    </div>
  );
};

export { HandInput };
