// components/ScoreDisplay.js
import React,{useState} from 'react';
import {Box, ButtonGroup, VStack,HStack, Center} from '@chakra-ui/react';
import SubmitButton from '../components/SubmitButton';
import Tile from './Tile';
import ErrorMsg from './ErrorMsg';
import MeldInput from './MeldInput';
import { type } from 'os';
const Majiang = require('@kobalab/majiang-core');
const winds = ['東', '南', '西', '北'];

const ScoreDisplay = ({ roundWind,seatWind,holaTile,holaType, 
  hand,setHand, melds,setMelds,kans,setKans,dispDoras,dispUraDoras,akaDoras, situational }) => {

  const [result,setResult] = useState(null);
  const [msg,setMsg] = useState("");

    const calculateScore = () => {
        try {
            let i = akaDoras;
            let handTiles = hand.join('');
            if(holaType === "ツモ"){
              handTiles += holaTile;
            }

            handTiles = handTiles.replace(/([msp])5/g,(m,p)=>{
              if(i > 0){
                i--;
                return p + '0';
              }

              return p + '5';
            });

            let meldTiles = melds.flatMap(meld => meld.tiles[0][0] + meld.tiles.join('').replace(/[a-zA-Z]/g,"") + "-").join(',');

            const replaceToAkaDora = (tilesStr,numOfReplace) => {
              return tilesStr.split(',').map(tiles => {
                if(tiles.startsWith('z')){
                  return tiles;
                }else{
                  return tiles.replace(/5/g,()=>{
                    if(numOfReplace > 0){
                      numOfReplace--;
                      return '0';
                    }

                    return '5';
                  });
                }
              }).join(',');
            };

            meldTiles = replaceToAkaDora(meldTiles,i);

            let kanTiles = kans.flatMap(kan => kan[0][0] + kan.join('').replace(/[a-zA-Z]/g,"")).join(',');

            kanTiles = replaceToAkaDora(kanTiles,i);

            let allTiles = handTiles;
            if(meldTiles != []){
              allTiles += `,${meldTiles}`
            }
            if(kanTiles != []){
              allTiles += `,${kanTiles}`;
            }

            const rule = Majiang.rule();
            
            rule.赤牌 = {
              m:3,
              p:3,
              s:3
            }

            const richi = situational.includes("立直");
            const wRichi = situational.includes("ダブル立直");
            const ippatsu = situational.includes("一発");
            const chankan = situational.includes("槍槓");
            const rinshan = situational.includes("嶺上開花");
            const haitei = situational.includes("ハイテイ");
            const houtei = situational.includes("ホウテイ");

            const result = Majiang.Util.hule(
              Majiang.Shoupai.fromString(allTiles)
              , holaType === "ツモ" ? null : holaTile + "-"
              ,{
                rule:rule,
                zhuangfeng:
                roundWind === '東' ? 0
                : roundWind === '南' ? 1
                : roundWind === '西' ? 2
                : 3,
                menfeng:
                seatWind === '東' ? 0
                : seatWind === '南' ? 1
                : seatWind === '西' ? 2
                : 3,
                hupai:{
                  lizhi:wRichi ? 2 : richi ? 1 : 0,
                  yifa:ippatsu,
                  qianggang:chankan,
                  lingshang:rinshan,
                  haidi:houtei ? 2 : haitei ? 1 : 0,
                  tianhu:0
                },
                baopai:dispDoras,
                fubaopai:richi || wRichi ? dispUraDoras : [],
                jicun:{
                  changbang:0,
                  lizhibang:0
                }
              }
            );

            if(result == undefined){
              setMsg('点数を計算するためのデータが不足しています。');
              setResult(null);
              return null;
            }

            setMsg("");
            setResult(result);

            return result;
        } catch (error) {
            setMsg('点数を計算するためのデータが不足しています。');
            setResult(null);
            return null;
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
            <Box className='bg-green-400'>
              <VStack>
                <Box className='text-lg font-semibold'>入力一覧</Box>
                <Box>{roundWind}場 {seatWind}家</Box>
                <Box>
                  <Center>
                    上がり牌:
                    {holaTile && <Tile
                    tile={holaTile}
                    onClick={()=>{}}/>
                    }
                  </Center>
                  上がり方:{holaType}
                </Box>
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
                <Box>
                  ドラ表示牌
                <HStack spacing="0px" py="3px">
                  {dispDoras.map((dora,idx) => <Tile tile={dora} key={idx} onClick={()=>{}}/>)}
                </HStack>
                </Box>
                <Box>
                  裏ドラ表示牌
                <HStack spacing="0px" py="3px">
                  {dispUraDoras.map((dora,idx) => <Tile tile={dora} key={idx} onClick={()=>{}}/>)}
                </HStack>
                </Box>
                <Box>
                  赤ドラ枚数:{akaDoras}
                </Box>
                <Box>
                  状況役:{situational.join(',')}
                </Box>
              </VStack>
            </Box>
            <Box className='flex justify-center'>
              <ButtonGroup>
                <SubmitButton name="点数表示" onClick={calculateScore}></SubmitButton>
                <SubmitButton name="牌情報コピー" onClick={copyInputTiles}></SubmitButton>
                <SubmitButton name="牌情報貼付" onClick={pasteInputTiles}></SubmitButton>
              </ButtonGroup>
            </Box>
            
                  {result && 
                  <Box className='flex justify-center'>
                    <VStack>
                      <p>符: {result.fu}</p>
                      <p>翻: {result.fanshu}</p>
                      <p>点数: {result.defen}</p>
                      <Box className='flex flex-col'>
                      <p>役 : </p>
                        {result.hupai?.map(yaku => <span key={yaku.name}>{yaku.name} {yaku.fanshu}翻 </span> )}
                      </Box>
                    </VStack>
                  </Box>
                  }
                  <ErrorMsg msg={msg}></ErrorMsg>
                <Box className='py-5'></Box>
        </div>
    );
};

export default ScoreDisplay;
