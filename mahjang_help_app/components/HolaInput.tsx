import React, { Dispatch, SetStateAction } from "react";
import { Tile } from "./Tile";
import { Header } from "./Header";
import { HStack, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";
import { HOLA_TYPE } from "@/src/Constant";
import { useHola } from "@/hooks/components/useHola";

const tiles = HAI_ARRAY;

const HolaInput = ({
  holaTile,
  setHolaTile,
  holaType,
  setHolaType,
}: {
  holaTile: string | undefined;
  setHolaTile: Dispatch<SetStateAction<string | undefined>>;
  holaType: string | undefined;
  setHolaType: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { addTile, deleteTile, tsumoButtonOnClick, rongButtonOnClick } =
    useHola({
      setHolaTile,
      setHolaType,
    });

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
            bgColor={holaType === HOLA_TYPE.TSUMO ? "red" : "grey"}
            onClick={tsumoButtonOnClick}
            _hover=""
          >
            {HOLA_TYPE.TSUMO}
          </Button>
          <Button
            bgColor={holaType === HOLA_TYPE.RONG ? "red" : "grey"}
            onClick={rongButtonOnClick}
            _hover=""
          >
            {HOLA_TYPE.RONG}
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export { HolaInput };
