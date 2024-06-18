import { Box, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

const AkaDorasInput = ({akaDoras,setAkaDoras}) =>{
  return (
    <>
      <Box className="flex justify-center py-3">
        赤ドラ枚数入力
      </Box>
      <Box className="flex justify-center w-2/3 h-10 mx-auto rounded-lg bg-lime-500">
        <input type="number" className="w-10" max="3" onChange={(e)=>setAkaDoras(e.currentTarget.value)}/>
      </Box>
    </>
  )
};

export default AkaDorasInput;