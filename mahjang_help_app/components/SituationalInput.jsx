import React from 'react';
import { HStack,VStack ,Box} from '@chakra-ui/react';

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
    ];

    return (
        <div>
            <h2 className='text-center'>状況役入力</h2>
            <HStack className='flex justify-center py-3 w-screen'>
                {SituationalRoles.map(role=>{
                    return (
                        <label key={role}>
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
