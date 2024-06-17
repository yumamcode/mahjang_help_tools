import { Box, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

const AkaDorasInput = () =>{
  return (
    <>
      <Box className="flex justify-center">
        赤ドラ枚数入力
      </Box>
      <Box className="flex justify-center">
        <input type="number" max="3"/>
      </Box>
    </>
  )
};

export default AkaDorasInput;