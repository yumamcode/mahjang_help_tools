import React from 'react';
import { HStack,VStack ,Box} from '@chakra-ui/react';
import Header from './Header';

const SituationalInput = ({ situational, setSituational }) => {
    const toggleSituational = (key) => {
        setSituational({ ...situational, [key]: !situational[key] });
    };

    const SituationalRoles = [
        {
            roleName :  'richi'
            ,roleNameJpn :'立直'
            ,checked : situational.richi
        },
        {
            roleName :  'ippatsu'
            ,roleNameJpn :'一発'
            ,checked : situational.ippatsu
        },
        {
            roleName :  'chankan'
            ,roleNameJpn :'槍槓'
            ,checked : situational.chankan
        },
        {
            roleName :  'haitei'
            ,roleNameJpn :'ハイテイ'
            ,checked : situational.haitei
        },
        {
            roleName :  'houtei'
            ,roleNameJpn :'ホウテイ'
            ,checked : situational.houtei
        },
        {
            roleName :  'wRichi'
            ,roleNameJpn :'ダブル立直'
            ,checked : situational.wRichi
        },
        {
            roleName : 'rinshan'
            ,roleNameJpn : "嶺上開花"
            ,checked : situational.rinshan
        }
    ];

    return (
        <div>
            <Header title="状況役入力" className="text-center text-lg py-3"></Header>
            <HStack className='flex justify-center py-3 flex-wrap'>
                {SituationalRoles.map(role=>{
                    return (
                        <label key={role.roleName}>
                        <input type="checkbox" checked={role.checked} onChange={() => toggleSituational(role.roleName)} />
                        {role.roleNameJpn}
                    </label>
                    )
                })}
            </HStack>
        </div>
    );
};

export default SituationalInput;
