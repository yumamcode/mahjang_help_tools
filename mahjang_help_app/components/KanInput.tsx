import React, { Dispatch, SetStateAction } from "react";
import { Tile } from "./Tile";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Header } from "./Header";
import { ErrorMsg } from "./ErrorMsg";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";
import type { Meld } from "./MeldInput";
import {
  ANKAN_TURNOVER_INDEX_ARRAY,
  MAX_MELDS_AND_KANS_LENGTH,
} from "@/src/Constant";
import { useKan } from "@/hooks/components/useKan";

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
  const { msg, addKan, deleteKan } = useKan({
    kans,
    setKans,
    melds,
  });

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
            <HStack key={index} spacing="0px">
              {kan.map((tile, idx) => {
                if (ANKAN_TURNOVER_INDEX_ARRAY.includes(idx)) {
                  tile = "turnoverdTile";
                }
                return <Tile key={idx} tile={tile} />;
              })}
              <button className="px-3" onClick={() => deleteKan(index)}>
                削除
              </button>
            </HStack>
          ))}
        </VStack>
      </Box>
    </div>
  );
};

export { KanInput };
