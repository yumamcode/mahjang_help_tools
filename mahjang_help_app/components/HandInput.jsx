import React from 'react';
import Tile from './Tile';

const haiArraySupplier = require("../src/haiArraySupplier.js");


const tiles = haiArraySupplier();

const HandInput = ({ hand, setHand }) => {
    const addTile = (tile) => {
        if (hand.length < 13) {
            setHand([...hand, tile]);
        }
    };

    return (
        <div>
            <h2>手牌入力</h2>
            <div className='flex flex-wrap justify-center'>
                {tiles.map((tile) => (
                    <Tile key={tile} tile={tile} onClick={addTile} />
                ))}
            </div>
            <div className='flex flex-wrap'>
                {hand.map((tile, index) => (
                    <Tile key={index} tile={tile} onClick={() => {}} />
                ))}
            </div>
        </div>
    );
};

export default HandInput;
