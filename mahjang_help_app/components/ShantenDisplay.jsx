// components/ScoreDisplay.js
import React,{useState} from 'react';
import {Box, ButtonGroup, VStack} from '@chakra-ui/react';
import SubmitButton from '../components/SubmitButton';
import ErrorMsg from './ErrorMsg';
import Tile from './Tile';
const Majiang = require('@kobalab/majiang-core');
const winds = ['東', '南', '西', '北'];

const ShantenDisplay = ({ hand,setHand, melds,setMelds, kans,setKans }) => {
  const [shantenResult,setShantenResult] = useState(null);
  const [usefulTileResult,setUsefulTileResult] = useState(null);
  const [errorMsg,setErrorMsg] = useState("");

  const calcShanten = () =>{

    try {
      const handTiles = hand.join('');
      const meldTiles = melds.flatMap(meld => meld.tiles[0][0] + meld.tiles.join('').replace(/[a-zA-Z]/g,"") + "-").join(',');
      const kanTiles = kans.flatMap(kan => kan[0][0] + kan.join('').replace(/[a-zA-Z]/g,"")).join(',');

      let allTiles = handTiles;

      if(meldTiles != []){
        allTiles += `,${meldTiles}`
      }

      if(kanTiles != []){
        allTiles += `,${kanTiles}`;
      }

      const shoupai = Majiang.Shoupai.fromString(allTiles);

      setShantenResult(Majiang.Util.xiangting(shoupai));
      setUsefulTileResult(Majiang.Util.tingpai(shoupai));
      setErrorMsg("");

    }catch(error){

      setShantenResult(null);
      setUsefulTileResult(null);
      setErrorMsg("入力に問題があります。")

    }

  };

  const copyInputTiles = () =>{
    localStorage.setItem("handInput",JSON.stringify(hand));
    localStorage.setItem("meldsInput",JSON.stringify(melds));
    localStorage.setItem("kansInput",JSON.stringify(kans));

    alert("牌情報をコピーしました。");
  };

  const pasteInputTiles = () =>{

    const handInputOnLocalStorage = localStorage.getItem("handInput");
    const meldsInputOnLocalStorage = localStorage.getItem("meldsInput");
    const kansInputOnLocalStorage = localStorage.getItem("kansInput");

    setHand(JSON.parse(handInputOnLocalStorage));
    setMelds(JSON.parse(meldsInputOnLocalStorage));
    setKans(JSON.parse(kansInputOnLocalStorage));

    alert("牌情報を貼り付けました。");

  };

    return (
        <div>
          <Box className='text-center'>
            <ButtonGroup className='justify-center'>
              <SubmitButton name="シャンテン数表示" onClick={calcShanten}></SubmitButton>
              <SubmitButton name="牌情報コピー" onClick={copyInputTiles}></SubmitButton>
              <SubmitButton name="牌情報貼付" onClick={pasteInputTiles}></SubmitButton>
            </ButtonGroup>
          </Box>
          <Box className='flex justify-center'>
            <ErrorMsg msg={errorMsg}></ErrorMsg>
          </Box>
          <Box className='flex justify-center'>
            <label>シャンテン数:</label>
            {shantenResult}
          </Box>
          <Box className='flex justify-center py-3'>
            <label>待ち・有効牌</label>
          </Box>
          <Box className='flex flex-wrap justify-center'>
          {usefulTileResult?.map(tile => <Tile key={tile} tile={tile} onClick={() => {}}></Tile>)}
          </Box>
        </div>
    );
};

export default ShantenDisplay;
