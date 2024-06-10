import styles from "@/components/HaiInputForm.module.css"
import React, { useState } from "react";
import { Provider } from "@/providers/Provider.jsx";
import { Center, HStack , Box, Image} from "@chakra-ui/react";
import SubmitButton from "@/components/SubmitButton.jsx"
import ErrorMsg from "@/components/ErrorMsg.jsx"
import Result from "@/components/Result.jsx"

const haiConverterTextToArray = require('../src/haiConverterTextToArray.js');

const haiArraySupplier = require('../src/haiArraySupplier.js');

const Majiang = require('@kobalab/majiang-core');

export default function HaiInputForm() {

  const [haiInputState,setHaiInputState] = useState("");
  const [msg,setMsg] = useState("");
  const [result,setResult] = useState("");

  const addHiddenHaiInput = function (e) {
    const newState = haiInputState + e.target.getAttribute("data-hai");
    setHaiInputState(newState);
  };
  
  const reductHiddenHaiInput = function (e) {
    const newState = haiInputState.replace(e.target.getAttribute("data-hai"),"")
    setHaiInputState(newState);
  }

  const submitButtonOnClick = () =>{
    buttonHandler(haiInputState);
  }

  const buttonHandler = (haiInputState)=>{
  
    if(haiInputState === ""){
      setMsg("入力欄が空です。")
      return false;
    }
  
    const input_hai_array = haiConverterTextToArray(haiInputState);
    let shoupai;
  
    try{
     shoupai = new Majiang.Shoupai(input_hai_array);
    }catch(err){
      setMsg("牌の形式が不正です。");
      setResult("");
      return false;
    }
    
    setMsg("");

    setResult("シャンテン数は" + Majiang.Util.xiangting(shoupai) + "です。")
  };

  const images = haiArraySupplier().map(
    (hai,index)=>
      {
    const src = `/haiImg/${hai}.jpg`;
    return <Image src={src} width="40px" height="50px" data-hai={hai} alt="" key={index}
    onClick={
      (e)=>
        {
          if(haiInputState.length < 2*14){
          addHiddenHaiInput(e);
            }
        }
      }>
          </Image>;
  });

  const input_hai_array = haiConverterTextToArray(haiInputState);

  const user_input_hai_images = Object.values(input_hai_array).map((input_hai, index ) => {
    const src = `/haiImg/${input_hai}.jpg`;
    return (
      <Image src={src} width="40px" height="50px" alt="" key={index} data-hai={input_hai}
      onClick={(e)=>{
        reductHiddenHaiInput(e)
      }
      }/>
    );
  });

  return (
    <Provider>
      <Center>
        <HStack spacing="20px" wrap="wrap" width="280px" maxWidth="150%">
          {images}
        </HStack>
      </Center>
      <SubmitButton name="決定" id="hai_submit_button" input={haiInputState} onClick={submitButtonOnClick}></SubmitButton>
      <ErrorMsg msg={msg}></ErrorMsg>
      <Result result={result}></Result>
      <Box py="10">
      </Box>
      <Center>
        <Box>
          入力した牌:
        </Box>
        <HStack spacing="3px" wrap="wrap" width="280px" id="disp_hai_area">
          {user_input_hai_images}
        </HStack>
      </Center>
    </Provider>
      );
}