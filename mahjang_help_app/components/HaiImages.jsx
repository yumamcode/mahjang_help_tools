import Image from "next/image";
import { createRoot } from "react-dom/client";
import styles from "@/components/HaiImages.module.css"
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Provider } from "@/providers/Provider.jsx";
import { Center, HStack ,Card, Box} from "@chakra-ui/react";
import SubmitButton from "@/components/SubmitButton.jsx"
import ErrorMsg from "@/components/ErrorMsg.jsx"

const haiConverterTextToArray = require('../src/haiConverterTextToArray.js');

const haiArraySupplier = require('../src/haiArraySupplier.js');

export default function HaiImages() {

  const [haiInputState,setHaiInputState] = useState("");

  const addHiddenHaiInput = function (e) {
    const newState = haiInputState + e.target.getAttribute("data-hai");
    setHaiInputState(newState);
  };
  
  const reductHiddenHaiInput = function (e) {
    const newState = haiInputState.replace(e.target.getAttribute("data-hai"),"")
    setHaiInputState(newState);
  }

  const images = haiArraySupplier().map(
    (hai,index)=>
      {
    const src = `/haiImg/${hai}.jpg`;
    return <Image src={src} className={styles.image} width="20" height="20" data-hai={hai} 
    onClick={
      (e)=>
        {
          addHiddenHaiInput(e);
        }
      } alt="" key={index}>
          </Image>;
  });

  const input_hai_array = haiConverterTextToArray(haiInputState);

  // const user_input_hai_images = input_hai_array.map((input_hai, index ) => {
  //   const src = `/haiImg/${input_hai}.jpg`;
  //   return (
  //     <Image src={src} width="20" height="20" alt="" key={index} />
  //   );
  // });


  /*次の処理を作成する

  //牌の文字列の配列をURLの配列に変換する。
  //input_hai_array:牌の文字列の配列
  //例:"m1"→"/haiImg/m1.jpg"

  //URLの配列から<Image>タグの配列を作成し、定数user_input_hai_imagesに格納する。

  */

  return (
    <Provider>
      <Center>
        <HStack spacing="10px" wrap="wrap" width="280px">
          {images}
        </HStack>
      </Center>
      <SubmitButton name="決定" id="hai_submit_button" input={haiInputState}>
      </SubmitButton>
      <Box py="10">
      </Box>
      <Center>
        <Box width="auto">
          入力した牌:
        </Box>
        <Box id="disp_hai_area">
          {haiInputState}
        </Box>
      </Center>
      
    </Provider>
      );
}