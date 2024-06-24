// components/ScoreDisplay.js
import React,{useState} from 'react';
import {Box, ButtonGroup, HStack,VStack,Center} from '@chakra-ui/react';
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
          <Box className='bg-green-400'>
            <VStack>
              <Box>入力一覧</Box>
              <Box>
                <Center>
                  牌姿
                </Center>
                <HStack className='py-2'>
                  <HStack className='flex-wrap justify-center space-x-3'>
                    <HStack spacing="0px">
                      {hand.map((tile, index) => (
                          <Tile key={index} tile={tile} onClick={()=>{}} />
                      ))}
                    </HStack>
                    {melds.map((meld, index) => (
                      <HStack key={index} ml="10px" spacing="0px">
                        {meld.tiles.map((tile, idx) => (
                          <Tile className={idx == 0 ? 'rotate-90 mr-2' : ''} key={idx} tile={tile} onClick={() => {}} />
                          ))}
                      </HStack>
                      ))}
                  </HStack>
                </HStack>
                <Center>
                  暗槓
                </Center>
                <HStack className='flex-wrap justify-center space-x-3'>
                {kans.map((kan,index) => (
                  <HStack key={index} spacing="0px">
                  {kan.map((tile, idx) => {
                      if(idx == 0 || idx == 3){
                        tile = 'turnoverdTile';
                      }
                    return <Tile key={idx} tile={tile} onClick={() => {}} />
                  }
                    )
                    }
                  </HStack>
                      )
                    )
                }
                </HStack>
              </Box>
            </VStack>
          </Box>
          <Box className='flex justify-center'>
            <ErrorMsg msg={errorMsg}></ErrorMsg>
          </Box>
          <Box className='flex justify-center'>
            <label>シャンテン数:</label>
            {shantenResult != -1 && shantenResult != 0 && shantenResult}
            {shantenResult == -1 ? "上がり形" : shantenResult == 0 ? "テンパイ" : ""}
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
