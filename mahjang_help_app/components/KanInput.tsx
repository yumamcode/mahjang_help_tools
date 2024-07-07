import React, { Dispatch, SetStateAction } from "react";
import { Tile } from "./Tile";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Header } from "./Header";
import { ErrorMsg } from "./ErrorMsg";
import { useState } from "react";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";
import type { Meld } from "./MeldInput";
import {
  ANKAN_TURNOVER_INDEX_ARRAY,
  MAX_MELDS_AND_KANS_LENGTH,
} from "@/src/Constant";

const tiles = HAI_ARRAY;

const KanInput = ({
  kans,
  setKans,
  melds,
}: {
  kans: string[][];
  setKans: Dispatch<SetStateAction<string[][]>>;
  melds: Meld[];
}) => {
  const [msg, setMsg] = useState("");

  const addKan = (tile: string): void => {
    const NumOfMeldsAndKans = melds?.length + kans?.length;
    if (NumOfMeldsAndKans >= MAX_MELDS_AND_KANS_LENGTH) {
      setMsg("これ以上暗槓出来ません。");
      return;
    }
    setKans([...kans, [tile, tile, tile, tile]]);
  };

  const deleteKan = (index: number): void => {
    setKans(kans.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header title="暗槓入力" className="text-center text-lg py-3"></Header>
      <Box className="flex justify-center">
        <HStack wrap="wrap" className="w-5/6">
          {tiles.map((tile) => (
            <Tile key={tile} tile={tile} onClick={addKan} />
          ))}
        </HStack>
      </Box>
      <ErrorMsg msg={msg}></ErrorMsg>
      <Box className="flex justify-center py-5">
        <VStack>
          {kans.map((kan, index) => (
            <HStack key={index}>
              {kan.map((tile, idx) => {
                if (ANKAN_TURNOVER_INDEX_ARRAY.includes(idx)) {
                  tile = "turnoverdTile";
                }
                return <Tile key={idx} tile={tile} onClick={() => {}} />;
              })}
              <button onClick={() => deleteKan(index)}>削除</button>
            </HStack>
          ))}
        </VStack>
      </Box>
    </div>
  );
};

export { KanInput };
