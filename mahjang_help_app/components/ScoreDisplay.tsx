// components/ScoreDisplay.js
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  ButtonGroup,
  VStack,
  HStack,
  Center,
  FormLabel,
  Icon,
} from "@chakra-ui/react";
import { SubmitButton } from "./SubmitButton";
import { Tile } from "./Tile";
import { ErrorMsg } from "./ErrorMsg";
import { HOLA_TYPE, SITUATIONALS, WINDS } from "../src/Constant";
import { Meld } from "./MeldInput";
import { RequiredIcon } from "./RequiredIcon";
type ScoreResult = {
  fu: number;
  fanshu: number;
  defen: number;
  hupai?: Role[];
};

type Role = {
  name: string;
  fanshu: number;
};

const Majiang = require("@kobalab/majiang-core");

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
  roundWind: string;
  seatWind: string;
  holaTile: string;
  holaType: string;
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
  const [result, setResult] = useState<ScoreResult | undefined>(undefined);
  const [msg, setMsg] = useState("");

  const calculateScore = (): void => {
    try {
      let i = akaDoras;
      let handTiles = hand.join("");
      if (holaType === HOLA_TYPE.TSUMO) {
        handTiles += holaTile;
      }

      handTiles = handTiles.replace(/([msp])5/g, (tile: string) => {
        if (i <= 0) {
          return tile.charAt(0) + "5";
        }

        i--;
        return tile.charAt(0) + "0";
      });

      let meldTiles = melds
        .flatMap(
          (meld: Meld) =>
            meld.meldTiles[0][0] +
            meld.meldTiles.join("").replace(/[a-zA-Z]/g, "") +
            "-"
        )
        .join(",");

      const replaceToAkaDora = (tilesStr: string, numOfReplace: number) => {
        return tilesStr
          .split(",")
          .map((tiles: string) => {
            if (tiles.startsWith("z")) {
              return tiles;
            } else {
              return tiles.replace(/5/g, () => {
                if (numOfReplace <= 0) {
                  return "5";
                }
                numOfReplace--;
                return "0";
              });
            }
          })
          .join(",");
      };

      meldTiles = replaceToAkaDora(meldTiles, i);

      let kanTiles = kans
        .flatMap(
          (kan: string[]) => kan[0][0] + kan.join("").replace(/[a-zA-Z]/g, "")
        )
        .join(",");

      kanTiles = replaceToAkaDora(kanTiles, i);

      let allTiles = handTiles;
      if (meldTiles != "") {
        allTiles += `,${meldTiles}`;
      }
      if (kanTiles != "") {
        allTiles += `,${kanTiles}`;
      }

      const rule = Majiang.rule();

      rule.赤牌 = {
        m: 3,
        p: 3,
        s: 3,
      };

      const richi = situational.includes(SITUATIONALS.RICHI);
      const wRichi = situational.includes(SITUATIONALS.W_RICHI);
      const ippatsu = situational.includes(SITUATIONALS.IPPATSU);
      const chankan = situational.includes(SITUATIONALS.CHANKAN);
      const rinshan = situational.includes(SITUATIONALS.RINSHAN);
      const haitei = situational.includes(SITUATIONALS.HAITEI);
      const houtei = situational.includes(SITUATIONALS.HOTEI);

      const result: ScoreResult = Majiang.Util.hule(
        Majiang.Shoupai.fromString(allTiles),
        holaType === HOLA_TYPE.TSUMO
          ? null
          : ["s5", "m5", "p5"].includes(holaTile) && i > 0
          ? holaTile.replace(/5/, "0") + "-"
          : holaTile + "-",
        {
          rule: rule,
          zhuangfeng:
            roundWind === WINDS.TON
              ? 0
              : roundWind === WINDS.NAN
              ? 1
              : roundWind === WINDS.SHA
              ? 2
              : 3,
          menfeng:
            seatWind === WINDS.TON
              ? 0
              : seatWind === WINDS.NAN
              ? 1
              : seatWind === WINDS.SHA
              ? 2
              : 3,
          hupai: {
            lizhi: wRichi ? 2 : richi ? 1 : 0,
            yifa: ippatsu,
            qianggang: chankan,
            lingshang: rinshan,
            haidi: houtei ? 2 : haitei ? 1 : 0,
            tianhu: 0,
          },
          baopai: dispDoras,
          fubaopai: richi || wRichi ? dispUraDoras : [],
          jicun: {
            changbang: 0,
            lizhibang: 0,
          },
        }
      );

      if (!result) {
        setMsg("点数を計算するためのデータが不足しています。");
        setResult(undefined);
        return;
      }

      setMsg("");
      setResult(result);
      return;
    } catch (error) {
      setMsg("点数を計算するためのデータが不足しています。");
      setResult(undefined);
      return;
    }
  };

  const copyInputTiles = (): void => {
    localStorage.setItem("handInput", JSON.stringify(hand));
    localStorage.setItem("meldsInput", JSON.stringify(melds));
    localStorage.setItem("kansInput", JSON.stringify(kans));

    alert("牌情報をコピーしました。");
  };

  const pasteInputTiles = (): void => {
    const handInputOnLocalStorage = localStorage.getItem("handInput");
    const meldsInputOnLocalStorage = localStorage.getItem("meldsInput");
    const kansInputOnLocalStorage = localStorage.getItem("kansInput");

    handInputOnLocalStorage && setHand(JSON.parse(handInputOnLocalStorage));
    meldsInputOnLocalStorage && setMelds(JSON.parse(meldsInputOnLocalStorage));
    kansInputOnLocalStorage && setKans(JSON.parse(kansInputOnLocalStorage));

    alert("牌情報を貼り付けました。");
  };

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
              <RequiredIcon innerText="上がり牌"></RequiredIcon>
              {holaTile && <Tile tile={holaTile} onClick={() => {}} />}
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
                    <Tile key={index} tile={tile} onClick={() => {}} />
                  ))}
                </HStack>
                {melds.map((meld: Meld, index: number) => (
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
              {kans.map((kan: string[], index: number) => (
                <HStack key={index} spacing="0px">
                  {kan.map((tile: string, idx: number) => {
                    if (idx == 0 || idx == 3) {
                      tile = "turnoverdTile";
                    }
                    return <Tile key={idx} tile={tile} onClick={() => {}} />;
                  })}
                </HStack>
              ))}
            </HStack>
          </Box>
          <Box>
            ドラ表示牌
            <HStack spacing="0px" py="3px">
              {dispDoras.map((dora: string, idx: number) => (
                <Tile tile={dora} key={idx} onClick={() => {}} />
              ))}
            </HStack>
          </Box>
          <Box>
            裏ドラ表示牌
            <HStack spacing="0px" py="3px">
              {dispUraDoras.map((dora: string, idx: number) => (
                <Tile tile={dora} key={idx} onClick={() => {}} />
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
