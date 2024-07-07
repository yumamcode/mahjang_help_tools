// components/WindInput.js
import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { WINDS } from "@/src/Constant";

const winds = Object.values(WINDS);

const WindInput = ({
  roundWind,
  setRoundWind,
  seatWind,
  setSeatWind,
}: {
  roundWind: string;
  setRoundWind: Dispatch<SetStateAction<string>>;
  seatWind: string;
  setSeatWind: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Box className="text-center">
      <Box className="py-3">風の情報入力</Box>
      <Box className="py-1 text-red-400 font-bold">
        初期値は場風は東、自風は北です。
      </Box>
      <Box>
        <h3>場風</h3>
        <ButtonGroup className="py-1">
          {winds.map((wind) => (
            <Button
              key={wind}
              bgColor={roundWind === wind ? "red" : "grey"}
              _hover=""
              onClick={() => setRoundWind(wind)}
            >
              {wind}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box className="py-3">
        <h3>自風</h3>
        <ButtonGroup className="py-1">
          {winds.map((wind) => (
            <Button
              key={wind}
              bgColor={seatWind === wind ? "red" : "grey"}
              _hover=""
              onClick={() => setSeatWind(wind)}
            >
              {wind}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export { WindInput };
