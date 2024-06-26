import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const AkaDorasInput = ({ akaDoras, setAkaDoras }) => {
  return (
    <>
      <Box className="flex justify-center py-3">赤ドラ枚数入力</Box>
      <NumberInput
        className="mx-auto w-20"
        value={akaDoras}
        min={0}
        max={3}
        onChange={(v) => setAkaDoras(v)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

export default AkaDorasInput;
