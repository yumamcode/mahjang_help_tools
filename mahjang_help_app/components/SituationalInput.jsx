import React from 'react';
import { HStack,VStack ,Box} from '@chakra-ui/react';
import Header from './Header';

const SituationalInput = ({ melds,situational, setSituational }) => {

    const addSituational = (newSituational) => {
        setSituational([...situational,newSituational]);
    };

    const deleteSituational = (targetSituational) => {
        setSituational(situational.filter(sit => sit != targetSituational));
    };

    const SituationalRoles = [
        {
            roleName :'立直'
        },
        {
            roleName :'ダブル立直'
        },
        {
            roleName :'一発'
        },
        {
            roleName :'槍槓'
        },
        {
            roleName :'ハイテイ'
        },
        {
            roleName :'ホウテイ'
        },
       
        {
            roleName : "嶺上開花"
        }
    ];

    return (
        <div>
            <Header title="状況役入力" className="text-center text-lg py-3"></Header>
            <HStack className='flex justify-center py-3 flex-wrap'>
                {SituationalRoles.map((role,idx)=>{
                    return (
                        <label key={role.roleName}>
                        <input type="checkbox" 
                        disabled={melds?.length > 0 && (role.roleName == "立直" || role.roleName == "ダブル立直")} 
                        checked={situational.includes(role.roleName)} 
                        onChange={() => 
                            situational.includes(role.roleName) ?  deleteSituational(role.roleName) : addSituational(role.roleName)
                            } />
                        {role.roleName}
                    </label>
                    )
                })}
            </HStack>
        </div>
    );
};

export default SituationalInput;
