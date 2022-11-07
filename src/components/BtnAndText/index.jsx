import React from 'react'
import { Box, IconButton, Text, Icon } from 'native-base'

const BtnAndText = ({iconType, name, color, bg, text}) => {
    return (
        <Box alignItems='center'>
            <IconButton size='lg' variant='solid'
                icon={<Icon as={iconType} name={name} color={color}/>}
                bg={bg} borderRadius="full"/>
            <Text mt='2' color='#ffffff'>{text}</Text>
        </Box>
    )
}

export default BtnAndText