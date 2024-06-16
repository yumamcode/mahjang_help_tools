// components/ScoreDisplay.js
import React,{useState} from 'react';
import {Box, VStack} from '@chakra-ui/react';
import SubmitButton from '../components/SubmitButton';
import ErrorMsg from './ErrorMsg';
const Majiang = require('@kobalab/majiang-core');
const winds = ['東', '南', '西', '北'];

const ScoreDisplay = ({ roundWind,seatWind,holaTile,holaType, hand, melds, kans, situational }) => {

  const [result,setResult] = useState(null);
  const [msg,setMsg] = useState("");

    const calculateScore = () => {
        try {
            let handTiles = hand.join('');
            if(holaType === "ツモ"){
              handTiles += holaTile;
            }

            const meldTiles = melds.flatMap(meld => meld.tiles[0][0] + meld.tiles.join('').replace(/[a-zA-Z]/g,"") + "-").join(',');
            const kanTiles = kans.flatMap(kan => kan[0][0] + kan.join('').replace(/[a-zA-Z]/g,"")).join(',');

            let allTiles = handTiles;
            if(meldTiles != []){
              allTiles += `,${meldTiles}`
            }
            if(kanTiles != []){
              allTiles += `,${kanTiles}`;
            }

            const { richi, ippatsu, rinshan, chankan, haitei, houtei, wRichi } = situational;

            const result = Majiang.Util.hule(
              Majiang.Shoupai.fromString(allTiles)
              , holaType === "ツモ" ? null : holaTile + "-"
              ,{
                rule:Majiang.rule(),
                zhuangfeng:
                roundWind === '北' ? 3
                : roundWind === '南' ? 1
                : roundWind === '西' ? 2
                : 0,
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
                baopai:[],
                fubaopai:null,
                jicun:{
                  changbang:0,
                  lizhibang:0
                }
              }
            );

            console.log(result);

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
            return null;
        }

        
        
    };

    return (
        <div>
            <SubmitButton name="点数表示" onClick={calculateScore}></SubmitButton>
                  {result && 
                  <Box className='flex justify-center'>
                    <VStack>
                      <p>符: {result.fu}</p>
                      <p>翻: {result.fanshu}</p>
                      <p>点数: {result.defen}</p>
                      <Box className='flex flex-col'>
                      <p>役 : </p>
                        {result.hupai?.map(yaku => <span key={yaku}>{yaku.name} {yaku.fanshu}翻 </span> )}
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
