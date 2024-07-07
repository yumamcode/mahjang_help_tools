import { Header } from "./Header";
import { Box, HStack } from "@chakra-ui/react";
import { Tile } from "./Tile";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";
import { Dispatch, SetStateAction } from "react";
import { MAX_DISP_DORAS_LENGTH } from "@/src/Constant";

const tiles = HAI_ARRAY;

const DispUraDorasInput = ({
  dispUraDoras,
  setDispUraDoras,
}: {
  dispUraDoras: string[];
  setDispUraDoras: Dispatch<SetStateAction<string[]>>;
}) => {
  const addTile = (tile: string): void => {
    if (dispUraDoras.length < MAX_DISP_DORAS_LENGTH) {
      setDispUraDoras([...dispUraDoras, tile]);
    }
  };

  const deleteTile = (index: number): void => {
    setDispUraDoras(dispUraDoras.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header
        title="裏ドラ表示牌入力"
        className="text-center text-lg py-3"
      ></Header>
      <Box className="flex justify-center">
        <HStack wrap="wrap" className="w-5/6">
          {tiles.map((tile, index) => (
            <Tile key={index} tile={tile} onClick={addTile} />
          ))}
        </HStack>
      </Box>
      <Box className="flex justify-center py-5">
        {dispUraDoras.map((tile, index) => (
          <Tile key={index} tile={tile} onClick={() => deleteTile(index)} />
        ))}
      </Box>
    </div>
  );
};

export { DispUraDorasInput };
