// components/ScoreDisplay.js
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Box, ButtonGroup, HStack, VStack, Center } from "@chakra-ui/react";
import { SubmitButton } from "./SubmitButton";
import { ErrorMsg } from "./ErrorMsg";
import { Tile } from "./Tile";
import type { Meld } from "./MeldInput";
const Majiang = require("@kobalab/majiang-core");
type Recommend = {
  daopai: string;
  shanten: number;
  usefulTiles: string[];
};

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
  const [shantenResult, setShantenResult] = useState<number | undefined>(
    undefined
  );
  const [usefulTileResult, setUsefulTileResult] = useState<
    string[] | undefined
  >(undefined);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [recommendResult, setRecommendResult] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setRecommendResult(undefined);
  }, [hand, melds, kans]);

  const calcShanten = () => {
    try {
      const handTiles = hand.join("");
      const meldTiles = melds
        .flatMap(
          (meld) =>
            meld.meldTiles[0][0] +
            meld.meldTiles.join("").replace(/[a-zA-Z]/g, "") +
            "-"
        )
        .join(",");
      const kanTiles = kans
        .flatMap((kan) => kan[0][0] + kan.join("").replace(/[a-zA-Z]/g, ""))
        .join(",");

      let allTiles = handTiles;

      if (meldTiles != "") {
        allTiles += `,${meldTiles}`;
      }

      if (kanTiles != "") {
        allTiles += `,${kanTiles}`;
      }

      const shoupai = Majiang.Shoupai.fromString(allTiles);

      const shanten = Majiang.Util.xiangting(shoupai);

      if (shanten == -1) {
        setRecommendResult(undefined);
      }

      setShantenResult(shanten);
      setUsefulTileResult(Majiang.Util.tingpai(shoupai));
      setErrorMsg("");

      return shanten;
    } catch (error) {
      setShantenResult(undefined);
      setUsefulTileResult(undefined);
      setErrorMsg("入力に問題があります。");
    }
  };

  const copyInputTiles = () => {
    localStorage.setItem("handInput", JSON.stringify(hand));
    localStorage.setItem("meldsInput", JSON.stringify(melds));
    localStorage.setItem("kansInput", JSON.stringify(kans));

    alert("牌情報をコピーしました。");
  };

  const pasteInputTiles = () => {
    const handInputOnLocalStorage = localStorage.getItem("handInput");
    const meldsInputOnLocalStorage = localStorage.getItem("meldsInput");
    const kansInputOnLocalStorage = localStorage.getItem("kansInput");

    handInputOnLocalStorage && setHand(JSON.parse(handInputOnLocalStorage));
    meldsInputOnLocalStorage && setMelds(JSON.parse(meldsInputOnLocalStorage));
    kansInputOnLocalStorage && setKans(JSON.parse(kansInputOnLocalStorage));

    alert("牌情報を貼り付けました。");
  };

  const recommendDapai = (prevShanten: number) => {
    if (prevShanten == -1) {
      return;
    }

    if (
      hand.length != 14 &&
      hand.length != 11 &&
      hand.length != 8 &&
      hand.length != 5 &&
      hand.length != 2
    ) {
      return;
    }

    const daopais: string[] = [];
    const recommends: Recommend[] = [];

    const meldTiles = melds
      .flatMap(
        (meld) =>
          meld.meldTiles[0][0] +
          meld.meldTiles.join("").replace(/[a-zA-Z]/g, "") +
          "-"
      )
      .join(",");

    const kanTiles = kans
      .flatMap((kan) => kan[0][0] + kan.join("").replace(/[a-zA-Z]/g, ""))
      .join(",");

    for (let daopai of hand) {
      if (daopais.includes(daopai)) {
        continue;
      }

      const afterDaopai = hand.filter((h) => h != daopai);

      let allTiles = afterDaopai.join("");

      if (meldTiles != "") {
        allTiles += `,${meldTiles}`;
      }

      if (kanTiles != "") {
        allTiles += `,${kanTiles}`;
      }

      const shoupai = Majiang.Shoupai.fromString(allTiles);

      const shanten = Majiang.Util.xiangting(shoupai);

      const usefulTiles = Majiang.Util.tingpai(shoupai);

      const recommend = {
        daopai: daopai,
        shanten: shanten,
        usefulTiles: usefulTiles,
      };

      daopais.push(daopai);
      recommends.push(recommend);
    }

    recommends.sort((a: Recommend, b: Recommend) => {
      if (a.shanten < b.shanten) {
        return -1;
      }

      if (a.shanten > b.shanten) {
        return 1;
      }

      if (!a.usefulTiles || !b.usefulTiles) {
        return 0;
      }

      if (a.usefulTiles.length < b.usefulTiles.length) {
        return 1;
      }

      if (a.usefulTiles.length > b.usefulTiles.length) {
        return -1;
      }

      return 0;
    });

    setRecommendResult(recommends[0].daopai);
  };

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
      <Box className="bg-green-400">
        <VStack>
          <Box>入力一覧</Box>
          <Box>
            <Center>牌姿</Center>
            <HStack className="py-2">
              <HStack className="flex-wrap justify-center space-x-3">
                <HStack spacing="0px">
                  {hand.map((tile, index) => (
                    <Tile key={index} tile={tile} onClick={() => {}} />
                  ))}
                </HStack>
                {melds.map((meld, index) => (
                  <HStack key={index} ml="10px" spacing="0px">
                    {meld.meldTiles.map((tile, idx) => (
                      <Tile
                        className={idx == 0 ? "rotate-90 mr-2" : ""}
                        key={idx}
                        tile={tile}
                        onClick={() => {}}
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
                    if (idx == 0 || idx == 3) {
                      tile = "turnoverdTile";
                    }
                    return <Tile key={idx} tile={tile} onClick={() => {}} />;
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
        {shantenResult == -1
          ? "上がり形"
          : shantenResult == 0
          ? "テンパイ"
          : ""}
      </Box>
      <Box className="flex justify-center py-3">
        <label>待ち・有効牌</label>
      </Box>
      <Box className="flex flex-wrap justify-center">
        {usefulTileResult?.map((tile) => (
          <Tile key={tile} tile={tile} onClick={() => {}}></Tile>
        ))}
      </Box>
      <Box className="flex justify-center">
        <label>おすすめ打牌</label>
      </Box>
      <Box className="flex justify-center">
        {recommendResult && (
          <Tile tile={recommendResult} onClick={() => {}}></Tile>
        )}
      </Box>
    </div>
  );
};

export { ShantenDisplay };
