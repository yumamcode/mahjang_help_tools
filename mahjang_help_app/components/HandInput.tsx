import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Tile } from "./Tile";
import { Header } from "./Header";
import { HStack, Box, Button } from "@chakra-ui/react";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";
import { Meld } from "./MeldInput";
import { getMaxHandLength } from "@/src/getMaxHandLength";
import { ErrorMsg } from "./ErrorMsg";
import { useHand } from "@/hooks/useHand";

const tiles = HAI_ARRAY;

const HandInput = ({
  hand,
  setHand,
  melds,
  kans,
  isSeparetedLastTile,
}: {
  hand: string[];
  setHand: Dispatch<SetStateAction<string[]>>;
  melds: Meld[];
  kans: string[][];
  isSeparetedLastTile: boolean;
}) => {
  const { errorMsg, addTile, deleteTile } = useHand({
    hand,
    setHand,
    melds,
    kans,
    isSeparetedLastTile,
  });

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
      <Box className="flex justify-center">
        <label>純手牌枚数:</label>
        {hand.length}
      </Box>
      <Box className="flex justify-center py-5">
        {hand.map((tile: string, index: number) => (
          <Tile key={index} tile={tile} onClick={() => deleteTile(index)} />
        ))}
      </Box>
      <Box>
        <ErrorMsg msg={errorMsg}></ErrorMsg>
      </Box>
    </div>
  );
};

export { HandInput };
