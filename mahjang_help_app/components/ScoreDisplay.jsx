// components/ScoreDisplay.js
import React,{useState} from 'react';
import {Box, VStack} from '@chakra-ui/react';
import SubmitButton from '../components/SubmitButton';
import ErrorMsg from './ErrorMsg';
const Majiang = require('@kobalab/majiang-core');
const winds = ['east', 'south', 'west', 'north'];

const ScoreDisplay = ({ roundWind,seatWind,holaTile,holaType, hand, melds, kans, situational }) => {

  const [result,setResult] = useState({});
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

            const playerSituational = [];
            if (richi) playerSituational.push('立直');
            if (ippatsu) playerSituational.push('一発');
            if (rinshan) playerSituational.push('嶺上開花');
            if (chankan) playerSituational.push('槍槓');
            if (haitei) playerSituational.push('海底撈月');
            if (houtei) playerSituational.push('河底撈魚');
            if (wRichi) playerSituational.push('ダブル立直');

            const result = Majiang.Util.hule(
              Majiang.Shoupai.fromString(allTiles)
              , holaType === "ツモ" ? null : holatile + "-"
              ,{
                rule:Majiang.rule(),
                zhuangfeng:
                roundWind === 'east' ? 0
                : roundWind === 'south' ? 1
                : roundWind === 'west' ? 2
                : 3,
                menfeng:
                seatWind === 'east' ? 0
                : seatWind === 'south' ? 1
                : seatWind === 'west' ? 2
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

            setMsg("");

            setResult(result);

            return result;
        } catch (error) {
            console.log(error);
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
