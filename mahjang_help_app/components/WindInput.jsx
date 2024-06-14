// components/WindInput.js
import React from 'react';
import styles from './WindInput.module.css';
import { Box, Button, ButtonGroup } from '@chakra-ui/react';

const winds = ['east', 'south', 'west', 'north'];

const WindInput = ({ roundWind, setRoundWind, seatWind, setSeatWind }) => {
    return (
        <Box className='text-center'>
            <Box className='py-3'>風の情報入力</Box>
            <Box>
                <h3>場風</h3>
                <ButtonGroup className='py-1'>
                {winds.map((wind) => (
                    <Button
                        key={wind}
                        bgColor={roundWind === wind ? 'red' : 'grey'} _hover=""
                        className={roundWind === wind ? styles.activeButton : ''}
                        onClick={() => setRoundWind(wind)}
                    >
                        {wind}
                    </Button>
                ))}
                </ButtonGroup>
            </Box>
            <Box className='py-3'>
                <h3>自風</h3>
                <ButtonGroup className='py-1'>
                {winds.map((wind) => (
                    <Button
                        key={wind}
                        bgColor={seatWind === wind ? 'red' : 'grey'} _hover=""
                        className={seatWind === wind ? styles.activeButton : ''}
                        onClick={() => setSeatWind(wind)}
                    >
                        {wind}
                    </Button>
                ))}
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default WindInput;
