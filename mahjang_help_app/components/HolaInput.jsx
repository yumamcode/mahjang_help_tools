import React from "react";
import { Tile } from "./Tile";
import Header from "./Header.jsx";
import { HStack, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";

const tiles = HAI_ARRAY;

const HolaInput = ({ holaTile, setHolaTile, holaType, setHolaType }) => {
  const addTile = (t) => {
    setHolaTile(t);
  };

  const deleteTile = () => {
    setHolaTile("");
  };

  const tumoButtonOnClick = () => {
    setHolaType("ツモ");
  };

  const ronButtonOnClick = () => {
    setHolaType("ロン");
  };

  return (
    <div>
      <Header
        title="上がり情報入力"
        className="text-center text-lg py-3"
      ></Header>
      <Box className="flex justify-center">
        <HStack wrap="wrap" className="w-5/6">
          {tiles.map((tile, index) => (
            <Tile key={index} tile={tile} onClick={addTile} />
          ))}
        </HStack>
      </Box>
      <Box className="flex justify-center py-1">
        {holaTile && <Tile tile={holaTile} onClick={deleteTile} />}
      </Box>
      <Box className="flex justify-center">
        <ButtonGroup>
          <Button
            bgColor={holaType === "ツモ" ? "red" : "grey"}
            onClick={tumoButtonOnClick}
            _hover=""
          >
            ツモ
          </Button>
          <Button
            bgColor={holaType === "ロン" ? "red" : "grey"}
            onClick={ronButtonOnClick}
            _hover=""
          >
            ロン
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export { HolaInput };
