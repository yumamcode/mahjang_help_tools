import React from 'react';

const SituationalInput = ({ situational, setSituational }) => {
    const toggleSituational = (key) => {
        setSituational({ ...situational, [key]: !situational[key] });
    };

    return (
        <div>
            <h2>状況役入力</h2>
            <div>
                <label>
                    <input type="checkbox" checked={situational.riichi} onChange={() => toggleSituational('riichi')} />
                    立直
                </label>
                <label>
                    <input type="checkbox" checked={situational.ippatsu} onChange={() => toggleSituational('ippatsu')} />
                    一発
                </label>
                <label>
                    <input type="checkbox" checked={situational.rinshan} onChange={() => toggleSituational('rinshan')} />
                    嶺上開花
                </label>
                <label>
                    <input type="checkbox" checked={situational.chankan} onChange={() => toggleSituational('chankan')} />
                    搶槓
                </label>
                <label>
                    <input type="checkbox" checked={situational.haitei} onChange={() => toggleSituational('haitei')} />
                    海底
                </label>
                <label>
                    <input type="checkbox" checked={situational.houtei} onChange={() => toggleSituational('houtei')} />
                    河底
                </label>
                <label>
                    <input type="checkbox" checked={situational.daburuRiichi} onChange={() => toggleSituational('daburuRiichi')} />
                    ダブル立直
                </label>
            </div>
        </div>
    );
};

export default SituationalInput;
