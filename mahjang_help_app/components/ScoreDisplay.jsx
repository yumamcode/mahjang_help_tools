// components/ScoreDisplay.js
import React,{useState} from 'react';
import {Box, VStack} from '@chakra-ui/react';
import SubmitButton from '../components/SubmitButton';
import ErrorMsg from './ErrorMsg';
const Majiang = require('@kobalab/majiang-core');

const ScoreDisplay = ({ hola, hand, melds, kans, situational }) => {

  const [result,setResult] = useState({});
  const [msg,setMsg] = useState("");

    const calculateScore = () => {
        try {
            let handTiles = hand.join('');
            if(hola.holaType === "ツモ"){
              handTiles += hola.tile;
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
            // console.log(allTiles);

            const { richi, ippatsu, rinshan, chankan, haitei, houtei, wRichi } = situational;

            const playerSituational = [];
            if (richi) playerSituational.push('立直');
            if (ippatsu) playerSituational.push('一発');
            if (rinshan) playerSituational.push('嶺上開花');
            if (chankan) playerSituational.push('槍槓');
            if (haitei) playerSituational.push('海底撈月');
            if (houtei) playerSituational.push('河底撈魚');
            if (wRichi) playerSituational.push('ダブル立直');

            console.log(hola);

            // console.log(Majiang.Shoupai.fromString(allTiles));
            // console.log(hola.holaType === "ツモ" ? null : hola.tile + "-")

            const result = Majiang.Util.hule(
              Majiang.Shoupai.fromString(allTiles)
              // console.log(Majiang.Shoupai.fromString("s7s8s9p9,p1p2p3-,m1m2m3-,s1s2s3-"))
              , hola.holaType === "ツモ" ? null : hola.tile + "-"
              ,{
                rule:Majiang.rule(),
                zhuangfeng:0,
                menfeng:3,
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
                      <p>役 : {result.hupai?.map(yaku => `${yaku.name} ${yaku.fanshu}翻 ` )}</p>
                    </VStack>
                  </Box>
                  }
                  <ErrorMsg msg={msg}></ErrorMsg>
                <Box className='py-5'></Box>
        </div>
    );
};

export default ScoreDisplay;
