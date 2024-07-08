import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

const AkaDorasInput = ({
  akaDoras,
  setAkaDoras,
}: {
  akaDoras: number;
  setAkaDoras: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <Box className="flex justify-center py-3">赤ドラ枚数入力</Box>
      <NumberInput
        className="mx-auto w-20"
        value={akaDoras}
        min={0}
        max={3}
        onChange={(_: string, n: number) => setAkaDoras(n)}
        bgColor="white"
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

export { AkaDorasInput };
