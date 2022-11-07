import React from 'react'
import { Stack, Avatar, Text } from 'native-base'

const TransHis = ({imgSrc, label, dateTime, amount}) => {

    if(amount >= 0){
        amount = '$' + amount
    }else{
        temp = '' + amount
        amount = temp.replace('-', '-$')
    }

    return (
        <Stack direction='row' bg='#2e303c' py={3} px={4} borderRadius='3xl' alignItems='center'>
            <Avatar size='md' source={imgSrc} bg='#2e303c' mr={3}/>
            <Stack flex={1}>
                <Text color='white' fontSize={18} fontWeight='bold'>{label}</Text>
                <Text color='white' fontSize={14}>{dateTime}</Text>
            </Stack>
            <Text color='white' fontSize={16} fontWeight='bold'>{amount}</Text>
        </Stack>
    )
}

export default TransHis