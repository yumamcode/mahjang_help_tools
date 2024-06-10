import styles from "@/components/HaiInputForm.module.css";
import React, { useState } from "react";
import { Provider } from "@/providers/Provider.jsx";
import { Center, HStack, Box, Image } from "@chakra-ui/react";
import SubmitButton from "@/components/SubmitButton.jsx";
import ErrorMsg from "@/components/ErrorMsg.jsx";
import Result from "@/components/Result.jsx";

const haiConverterTextToArray = require('../src/haiConverterTextToArray.js');
const haiArraySupplier = require('../src/haiArraySupplier.js');
const Majiang = require('@kobalab/majiang-core');

export default function HaiInputForm() {
  const [haiInputState, setHaiInputState] = useState("");
  const [overallHaiInputState,setOverallHaiInputState] = useState([]);
  const CALC_PHASE = ["pureHai","otherHai","checkStateRole"];
  const [phaseState,setPhaseState] = useState(CALC_PHASE[0]);
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");

  const addHiddenHaiInput = (e) => {
    if (haiInputState.length < 2 * 14) {
      setHaiInputState(prev => prev + e.target.getAttribute("data-hai"));
    }
  };

  const reductHiddenHaiInput = (e) => {
    setHaiInputState(prev => prev.replace(e.target.getAttribute("data-hai"), ""));
  };

  const submitButtonOnClick = () => {
    setPhaseState(prev => CALC_PHASE[CALC_PHASE.findIndex(prev) + 1]);
    setOverallHaiInputState(prev => prev.join(haiInputState));
  };

  const renderHaiImages = () => {
    return haiArraySupplier().map((hai, index) => {
      const src = `/haiImg/${hai}.jpg`;
      return (
        <Image
          src={src}
          width="40px"
          height="50px"
          data-hai={hai}
          alt=""
          key={index}
          onClick={addHiddenHaiInput}
        />
      );
    });
  };

  const renderUserInputHaiImages = () => {
    const input_hai_array = haiConverterTextToArray(haiInputState);
    return Object.values(input_hai_array).map((input_hai, index) => {
      const src = `/haiImg/${input_hai}.jpg`;
      return (
        <Image
          src={src}
          width="40px"
          height="50px"
          alt=""
          key={index}
          data-hai={input_hai}
          onClick={reductHiddenHaiInput}
        />
      );
    });
  };

  return (
    <Provider>
      <Center>
        <HStack spacing="20px" wrap="wrap" width="280px" maxWidth="150%">
          {renderHaiImages()}
        </HStack>
      </Center>
      <SubmitButton name="次へ" id="hai_submit_button" input={haiInputState} onClick={submitButtonOnClick} />
      <ErrorMsg msg={msg} />
      <Center>
        <Box>入力した牌:</Box>
        <HStack spacing="3px" wrap="wrap" width="280px" id="disp_hai_area">
          {renderUserInputHaiImages()}
        </HStack>
      </Center>
      <Result className="py-10 text-center" result={result} />
    </Provider>
  );
}