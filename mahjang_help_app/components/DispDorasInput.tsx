import { Header } from "./Header";
import { Box, HStack } from "@chakra-ui/react";
import { Tile } from "./Tile";
import { HAI_ARRAY } from "@/src/AllHaiArrayConstant";
import { Dispatch, SetStateAction } from "react";
import { MAX_DISP_DORAS_LENGTH } from "@/src/Constant";

const tiles = HAI_ARRAY;

const DispDorasInput = ({
  dispDoras,
  setDispDoras,
}: {
  dispDoras: string[];
  setDispDoras: Dispatch<SetStateAction<string[]>>;
}) => {
  const addTile = (tile: string) => {
    if (dispDoras.length < MAX_DISP_DORAS_LENGTH) {
      setDispDoras([...dispDoras, tile]);
    }
  };

  const deleteTile = (index: number) => {
    setDispDoras(dispDoras.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header
        title="ドラ表示牌入力"
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
        {dispDoras.map((tile, index) => (
          <Tile key={index} tile={tile} onClick={() => deleteTile(index)} />
        ))}
      </Box>
    </div>
  );
};

export { DispDorasInput };
