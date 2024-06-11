import styles from "@/components/HaiInputForm.module.css";
import React, { useState } from "react";
import { Provider } from "@/providers/Provider.jsx";
import { Center, HStack, Box, Image, ButtonGroup,Button } from "@chakra-ui/react";
import SubmitButton from "@/components/SubmitButton.jsx";
import ErrorMsg from "@/components/ErrorMsg.jsx";
import Result from "@/components/Result.jsx";

const haiConverterTextToArray = require('../src/haiConverterTextToArray.js');
const haiArraySupplier = require('../src/haiArraySupplier.js');
const Majiang = require('@kobalab/majiang-core');

export default function HaiInputForm() {
  const [haiInputState, setHaiInputState] = useState("");
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
    if (haiInputState === "") {
      setMsg("入力欄が空です。");
      setResult("");
      return;
    }

    const input_hai_array = haiConverterTextToArray(haiInputState);
    let shoupai;

    try {
      shoupai = new Majiang.Shoupai(input_hai_array);
      setMsg("");
      setResult(`シャンテン数は ${Majiang.Util.xiangting(shoupai)} です。`);
    } catch (err) {
      setMsg("牌の形式が不正です。");
      setResult("");
    }
  };

  const resetButtonOnClick = () => {
    setHaiInputState("");
    setMsg("");
    setResult("");
  } 

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
        <HStack spacing="10px" wrap="wrap" width="280px">
          {renderHaiImages()}
        </HStack>
      </Center>
      <ErrorMsg msg={msg} />
      <Center>
        <Box className="py-20">入力した牌:</Box>
        <HStack spacing="3px" wrap="wrap" width="280px" id="disp_hai_area">
          {renderUserInputHaiImages()}
        </HStack>
      </Center>
      <Box className="flex justify-center py-3">
        <ButtonGroup>
          <Button onClick={resetButtonOnClick}>リセット</Button>
          <Button onClick={submitButtonOnClick}>決定</Button>
        </ButtonGroup>
      </Box>
      <Result className="py-3 text-center" result={result} />
    </Provider>
  );
}