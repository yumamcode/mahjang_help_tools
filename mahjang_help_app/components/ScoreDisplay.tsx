// components/ScoreDisplay.js
import React, { Dispatch, SetStateAction } from "react";
import { Box, ButtonGroup, VStack, HStack, Center } from "@chakra-ui/react";
import { SubmitButton } from "./SubmitButton";
import { Tile } from "./Tile";
import { ErrorMsg } from "./ErrorMsg";
import { ANKAN_TURNOVER_INDEX_ARRAY } from "../src/Constant";
import { Meld } from "./MeldInput";
import { RequiredIcon } from "./RequiredIcon";
import { useScoreDisplay } from "@/hooks/useScoreDisplay";

const ScoreDisplay = ({
  roundWind,
  seatWind,
  holaTile,
  holaType,
  hand,
  setHand,
  melds,
  setMelds,
  kans,
  setKans,
  dispDoras,
  dispUraDoras,
  akaDoras,
  situational,
}: {
  roundWind: string | undefined;
  seatWind: string | undefined;
  holaTile: string | undefined;
  holaType: string | undefined;
  hand: string[];
  setHand: Dispatch<SetStateAction<string[]>>;
  melds: Meld[];
  setMelds: Dispatch<SetStateAction<Meld[]>>;
  kans: string[][];
  setKans: Dispatch<SetStateAction<string[][]>>;
  dispDoras: string[];
  dispUraDoras: string[];
  akaDoras: number;
  situational: string[];
}) => {
  const { result, msg, copyInputTiles, pasteInputTiles, calculateScore } =
    useScoreDisplay({
      roundWind,
      seatWind,
      holaTile,
      holaType,
      hand,
      setHand,
      melds,
      setMelds,
      kans,
      setKans,
      dispDoras,
      dispUraDoras,
      akaDoras,
      situational,
    });

  return (
    <div>
      <Box className="bg-green-300">
        <VStack>
          <Box className="text-lg font-semibold">入力一覧</Box>
          <Box>
            {roundWind}場 {seatWind}家
          </Box>
          <Box>
            <Center>
              <RequiredIcon innerText="上がり牌:"></RequiredIcon>
              {holaTile && <Tile className="ml-2" tile={holaTile} size="s" />}
            </Center>
            <Center>
              <RequiredIcon innerText="上がり方:"></RequiredIcon>
              {holaType}
            </Center>
          </Box>
          <Box>
            <Center>
              <RequiredIcon innerText="牌姿"></RequiredIcon>
            </Center>
            <HStack className="py-2">
              <HStack className="flex-wrap justify-center space-x-3">
                <HStack spacing="0px">
                  {hand.map((tile: string, index: number) => (
                    <Tile key={index} tile={tile} />
                  ))}
                </HStack>
                {melds.map((meld: Meld, index: number) => (
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
              {kans.map((kan: string[], index: number) => (
                <HStack key={index} spacing="0px">
                  {kan.map((tile: string, idx: number) => {
                    if (ANKAN_TURNOVER_INDEX_ARRAY.includes(idx)) {
                      tile = "turnoverdTile";
                    }
                    return <Tile key={idx} tile={tile} />;
                  })}
                </HStack>
              ))}
            </HStack>
          </Box>
          <Box>
            ドラ表示牌
            <HStack spacing="0px" py="3px">
              {dispDoras.map((dora: string, idx: number) => (
                <Tile tile={dora} key={idx} />
              ))}
            </HStack>
          </Box>
          <Box>
            裏ドラ表示牌
            <HStack spacing="0px" py="3px">
              {dispUraDoras.map((dora: string, idx: number) => (
                <Tile tile={dora} key={idx} />
              ))}
            </HStack>
          </Box>
          <Box>赤ドラ枚数:{akaDoras}</Box>
          <Box>状況役:{situational.join(",")}</Box>
        </VStack>
      </Box>
      <Box className="flex justify-center">
        <ButtonGroup>
          <SubmitButton name="点数表示" onClick={calculateScore}></SubmitButton>
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

      {result && (
        <Box className="flex justify-center">
          <VStack>
            <p>符: {result.fu}</p>
            <p>翻: {result.fanshu}</p>
            <p>点数: {result.defen}</p>
            <Box className="flex flex-col">
              <p>役 : </p>
              {result.hupai?.map((yaku) => (
                <span key={yaku.name}>
                  {yaku.name} {yaku.fanshu}翻{" "}
                </span>
              ))}
            </Box>
          </VStack>
        </Box>
      )}
      <ErrorMsg msg={msg}></ErrorMsg>
      <Box className="py-5"></Box>
    </div>
  );
};

export { ScoreDisplay };
