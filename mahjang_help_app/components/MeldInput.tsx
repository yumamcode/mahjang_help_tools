// components/MeldInput.js
import React, { Dispatch, SetStateAction, useState } from "react";
import { Tile } from "./Tile";
import { ErrorMsg } from "./ErrorMsg";
import { Header } from "./Header";
import { HStack, Box, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import {
  MAX_MELDS_AND_KANS_LENGTH,
  MELD_LENGTH,
  SITUATIONALS,
  SUITS,
} from "../src/Constant";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";
import { MELD_TYPE } from "../src/Constant";
import { isChiable } from "@/src/isChiable";
import { TileUtil } from "@/src/TileUtil";
import { useMeld } from "@/hooks/useMeld";

type Meld = {
  meldType: string;
  meldTiles: string[];
};

const tiles = HAI_ARRAY;
const MeldInput = ({
  melds,
  setMelds,
  kans,
  situational,
  setSituational,
}: {
  melds: Meld[];
  setMelds: Dispatch<SetStateAction<Meld[]>>;
  kans: string[][];
  situational?: string[];
  setSituational?: Dispatch<SetStateAction<string[]>>;
}) => {
  const { errMsg, meldType, setMeldType, addMeld, deleteMeld } = useMeld({
    melds,
    setMelds,
    kans,
    situational,
    setSituational,
  });

  return (
    <div>
      <Header title="副露入力" className="text-center text-lg py-3"></Header>
      <Box className="flex justify-center">
        <HStack wrap="wrap" className="w-5/6">
          {tiles.map((tile: string, index: number) => (
            <Tile key={index} tile={tile} onClick={addMeld} />
          ))}
        </HStack>
      </Box>

      <Box className="py-1">
        <ErrorMsg msg={errMsg}></ErrorMsg>
      </Box>

      <Box className="flex justify-center py-2">
        <ButtonGroup>
          <Button
            bgColor={meldType === MELD_TYPE.CHI ? "red" : "grey"}
            _hover=""
            onClick={() => {
              setMeldType(MELD_TYPE.CHI);
            }}
          >
            {MELD_TYPE.CHI}
          </Button>
          <Button
            bgColor={meldType === MELD_TYPE.PON ? "red" : "grey"}
            _hover=""
            onClick={() => {
              setMeldType(MELD_TYPE.PON);
            }}
          >
            {MELD_TYPE.PON}
          </Button>
          <Button
            bgColor={meldType === MELD_TYPE.KAN ? "red" : "grey"}
            _hover=""
            onClick={() => {
              setMeldType(MELD_TYPE.KAN);
            }}
          >
            {MELD_TYPE.KAN}
          </Button>
        </ButtonGroup>
      </Box>
      <Box className="py-3">
        <VStack>
          {melds.map((meld, index) => (
            <div key={index}>
              <strong>{meld.meldType}:</strong>
              <HStack spacing="0px">
                {meld.meldTiles.map((tile, idx) => (
                  <Tile
                    className={idx == 0 ? "mr-2 rotate-90" : ""}
                    key={idx}
                    tile={tile}
                  />
                ))}
                <button className="mx-3" onClick={() => deleteMeld(index)}>
                  削除
                </button>
              </HStack>
            </div>
          ))}
        </VStack>
      </Box>
    </div>
  );
};

export { MeldInput };
export type { Meld };
