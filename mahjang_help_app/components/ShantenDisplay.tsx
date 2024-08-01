// components/ScoreDisplay.js
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Box, ButtonGroup, HStack, VStack, Center } from "@chakra-ui/react";
import { SubmitButton } from "./SubmitButton";
import { ErrorMsg } from "./ErrorMsg";
import { Tile } from "./Tile";
import type { Meld } from "./MeldInput";
import {
  ANKAN_TURNOVER_INDEX_ARRAY,
  SHANTEN_DESCRIPTIONS,
} from "@/src/Constant";
import { useShantenDisplay } from "@/hooks/components/useShantenDisplay";
import { getShantenDescription } from "@/src/getShantenDescription";

const ShantenDisplay = ({
  hand,
  setHand,
  melds,
  setMelds,
  kans,
  setKans,
}: {
  hand: string[];
  setHand: Dispatch<SetStateAction<string[]>>;
  melds: Meld[];
  setMelds: Dispatch<SetStateAction<Meld[]>>;
  kans: string[][];
  setKans: Dispatch<SetStateAction<string[][]>>;
}) => {
  const {
    errorMsg,
    shantenResult,
    usefulTileResult,
    recommendResult,
    calcShanten,
    recommendDapai,
    copyInputTiles,
    pasteInputTiles,
  } = useShantenDisplay({
    hand,
    setHand,
    melds,
    setMelds,
    kans,
    setKans,
  });

  // console.log(recommendResult);

  return (
    <div>
      <Box className="text-center">
        <ButtonGroup className="justify-center">
          <SubmitButton
            name="計算"
            onClick={() => {
              const shanten: number = calcShanten();
              recommendDapai(shanten);
            }}
          ></SubmitButton>
          <SubmitButton
            name="牌情報コピー"
            onClick={copyInputTiles}
          ></SubmitButton>
          <SubmitButton
            name="牌情報貼付"
            onClick={pasteInputTiles}
          ></SubmitButton>
        </ButtonGroup>
      </Box>
      <Box className="bg-green-300">
        <VStack>
          <Box>入力一覧</Box>
          <Box>
            <Center>牌姿</Center>
            <HStack className="py-2">
              <HStack className="flex-wrap justify-center space-x-3">
                <HStack spacing="0px">
                  {hand.map((tile, index) => (
                    <Tile key={index} tile={tile} />
                  ))}
                </HStack>
                {melds.map((meld, index) => (
                  <HStack key={index} ml="10px" spacing="0px">
                    {meld.meldTiles.map((tile, idx) => (
                      <Tile
                        className={idx == 0 ? "rotate-90 mr-2" : ""}
                        key={idx}
                        tile={tile}
                      />
                    ))}
                  </HStack>
                ))}
              </HStack>
            </HStack>
            <Center>暗槓</Center>
            <HStack className="flex-wrap justify-center space-x-3">
              {kans.map((kan, index) => (
                <HStack key={index} spacing="0px">
                  {kan.map((tile, idx) => {
                    if (ANKAN_TURNOVER_INDEX_ARRAY.includes(idx)) {
                      tile = "turnoverdTile";
                    }
                    return <Tile key={idx} tile={tile} />;
                  })}
                </HStack>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Box>
      <Box className="flex justify-center">
        <ErrorMsg msg={errorMsg}></ErrorMsg>
      </Box>
      <Box className="flex justify-center">
        <label>シャンテン数:</label>
        {shantenResult != undefined && shantenResult > 0 && shantenResult}
        {shantenResult != undefined &&
          shantenResult <= 0 &&
          getShantenDescription(shantenResult)}
      </Box>
      <Box className="flex justify-center py-3">
        <label>待ち・有効牌</label>
      </Box>
      <Box className="flex flex-wrap justify-center">
        {usefulTileResult &&
          usefulTileResult.map((tile) => <Tile key={tile} tile={tile}></Tile>)}
      </Box>
      <Box className="flex justify-center">
        <label>おすすめ打牌</label>
      </Box>
      <Box className="flex justify-center">
        {recommendResult && <Tile tile={recommendResult}></Tile>}
      </Box>
    </div>
  );
};

export { ShantenDisplay };
