// components/MeldInput.js
import React, { Dispatch, SetStateAction, useState } from "react";
import {Tile} from "./Tile";
import {ErrorMsg} from "./ErrorMsg.jsx";
import Header from "./Header.jsx";
import { HStack, Box, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import SITUATIONALS from "../src/SituationalStringConstant";

const haiArraySupplier = require("../src/haiArraySupplier.js");

type Meld = {
  meldType:string,
  meldTiles:string[]
};

const tiles = haiArraySupplier();
const MeldInput = ({ melds, setMelds, kans, situational, setSituational } :
  {melds:Meld[],setMelds:Dispatch<SetStateAction<Meld[]>>,kans:string[][],situational?:string[],setSituational?:Dispatch<SetStateAction<string[]>>}) => {
  const [meldType, setMeldType] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  const addMeld = (tile:string) => {
    let meldTiles;

    const NumOfmeldsAndKans = melds?.length + kans?.length;

    if (NumOfmeldsAndKans >= 4) {
      setErrMsg("これ以上副露出来ません。");
      return false;
    }

    if (meldType === "チー") {
      if (tile[0] == "z") {
        setErrMsg("字牌はチー出来ません。");
        return false;
      }

      if (
        ["1", "2", "3", "4", "5", "6", "7"].includes(tile[1]) &&
        tile[0] !== "z"
      ) {
        const base = parseInt(tile[1]);
        const suit = tile[0];
        meldTiles = [
          `${suit}${base}`,
          `${suit}${base + 1}`,
          `${suit}${base + 2}`,
        ];
      } else {
        setErrMsg("チーは順子の中で最小のものを選択してください。");
        return false;
      }
    } else if (meldType === "ポン") {
      meldTiles = Array(3).fill(tile);
    } else if (meldType === "カン") {
      meldTiles = Array(4).fill(tile);
    } else {
      setErrMsg("先にチー・ポン・カンのいずれかを選択してください");
      return false;
    }

    const newMeld : Meld = {meldType: meldType, meldTiles: meldTiles};

    setMelds([...melds,newMeld]);

    if (situational) {
      setSituational && setSituational(
        situational?.filter(
          (sit) => sit != SITUATIONALS.RICHI && sit != SITUATIONALS.W_RICHI
        )
      );
    }
    setErrMsg("");
  };

  const deleteMeld = (index:number) => {
    setMelds(melds?.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header title="副露入力" className="text-center text-lg py-3"></Header>
      <Box className="flex justify-center">
        <HStack wrap="wrap" className="w-5/6">
          {tiles.map((tile:string, index:number) => (
            <Tile key={index} tile={tile} onClick={addMeld} className={null}/>
          ))}
        </HStack>
      </Box>

      <Box className="py-1">
        <ErrorMsg msg={errMsg}></ErrorMsg>
      </Box>

      <Box className="flex justify-center py-2">
        <ButtonGroup>
          <Button
            bgColor={meldType === "チー" ? "red" : "grey"}
            _hover=""
            onClick={() => {
              setMeldType("チー");
            }}
          >
            チー
          </Button>
          <Button
            bgColor={meldType === "ポン" ? "red" : "grey"}
            _hover=""
            onClick={() => {
              setMeldType("ポン");
            }}
          >
            ポン
          </Button>
          <Button
            bgColor={meldType === "カン" ? "red" : "grey"}
            _hover=""
            onClick={() => {
              setMeldType("カン");
            }}
          >
            カン
          </Button>
        </ButtonGroup>
      </Box>
      <Box className="py-3">
        <VStack>
          {melds?.map((meld, index) => (
            <div key={index}>
              <strong>{meld.meldType}:</strong>
              <HStack>
                {meld.meldTiles?.map((tile, idx) => (
                  <Tile
                    className={idx == 0 ? "rotate-90 " : ""}
                    key={idx}
                    tile={tile}
                    onClick={() => {}}
                  />
                ))}
                <button onClick={() => deleteMeld(index)}>削除</button>
              </HStack>
            </div>
          ))}
        </VStack>
      </Box>
    </div>
  );
};

export { MeldInput };
export type {Meld};
