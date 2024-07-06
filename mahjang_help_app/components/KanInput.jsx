import React from "react";
import { Tile } from "./Tile";
import { Box, HStack, VStack } from "@chakra-ui/react";
import Header from "./Header.jsx";
import { ErrorMsg } from "./ErrorMsg";
import { useState } from "react";

const haiArraySupplier = require("../src/haiArraySupplier.js");

const tiles = haiArraySupplier();

const KanInput = ({ kans, setKans, melds }) => {
  const [msg, setMsg] = useState("");

  const addKan = (tile) => {
    const NumOfMeldsAndKans = melds?.length + kans?.length;
    if (NumOfMeldsAndKans >= 4) {
      setMsg("これ以上暗槓出来ません。");
      return false;
    }
    setKans([...kans, [tile, tile, tile, tile]]);
  };

  const deleteKan = (index) => {
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
                if (idx == 0 || idx == 3) {
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
