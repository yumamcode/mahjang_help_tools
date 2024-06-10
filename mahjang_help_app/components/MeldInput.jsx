// components/MeldInput.js
import React, { useState } from 'react';
import Tile from './Tile';

const haiArraySupplier = require("../src/haiArraySupplier.js");

const tiles = haiArraySupplier();
const MeldInput = ({ melds, setMelds }) => {
    const [selectedTiles, setSelectedTiles] = useState([]);
    const [meldType, setMeldType] = useState(null);

    const addTile = (tile) => {
        if ((meldType === 'chi' && selectedTiles.length < 3) ||
            (meldType === 'pon' && selectedTiles.length < 1) ||
            (meldType === 'kan' && selectedTiles.length < 1)) {
            setSelectedTiles([...selectedTiles, tile]);
        }
    };

    const confirmMeld = () => {
        let valid = true;
        if (meldType === 'chi') {
            const sortedTiles = selectedTiles.slice().sort();
            const isValidChi = sortedTiles[2] === sortedTiles[1] + 1 && sortedTiles[1] === sortedTiles[0] + 1;
            valid = selectedTiles.length === 3 && isValidChi;
        } else if (meldType === 'pon') {
            valid = selectedTiles.length === 1;
        } else if (meldType === 'kan') {
            valid = selectedTiles.length === 1;
        }

        if (valid) {
            const meldTiles = meldType === 'chi' ? selectedTiles :
                Array(meldType === 'kan' ? 4 : 3).fill(selectedTiles[0]);
            setMelds([...melds, { type: meldType, tiles: meldTiles }]);
            setSelectedTiles([]);
            setMeldType(null);
        }else{
          setMeldType(null);
          setSelectedTiles([]);
        }
    };

    const deleteMeld = (index) => {
        setMelds(melds.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h2>副露入力</h2>
            <div className='flex flex-wrap justify-center'> 
                {tiles.map((tile) => (
                    <Tile key={tile} tile={tile} onClick={addTile} />
                ))}
            </div>
            <div>
                {selectedTiles.map((tile, index) => (
                    <Tile key={index} tile={tile} onClick={() => {}} />
                ))}
            </div>
            <div className='flex flex-wrap'>
                <button onClick={() => setMeldType('chi')}>チー</button>
                <button onClick={() => setMeldType('pon')}>ポン</button>
                <button onClick={() => setMeldType('kan')}>カン</button>
                <button onClick={confirmMeld}>確定</button>
            </div>
            <div>
                {melds.map((meld, index) => (
                    <div key={index}>
                        <strong>{meld.type.toUpperCase()}:</strong>
                        {meld.tiles.map((tile, idx) => (
                            <Tile key={idx} tile={tile} onClick={() => {}} />
                        ))}
                        <button onClick={() => deleteMeld(index)}>削除</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeldInput;
