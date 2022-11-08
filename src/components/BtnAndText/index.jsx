import React from 'react'
import { Box, IconButton, Text, Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const BtnAndText = ({iconType, name, color, bg, text, screen}) => {

    const {navigate} = useNavigation()

    return (
        <Box alignItems='center'>
            <IconButton size='lg' variant='solid' onPress={() => navigate(screen)}
                icon={<Icon as={iconType} name={name} color={color}/>}
                bg={bg} borderRadius="full"/>
            <Text mt='2' color='#ffffff'>{text}</Text>
        </Box>
    )
}

export default BtnAndText