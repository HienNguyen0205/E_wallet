import React from 'react'
import { Stack, Text } from 'native-base'

const TransHis = ({Icon, name, label, dateTime, amount}) => {

    const style = {}

    if(amount >= 0){
        amount = '$' + amount
    }else{
        temp = '' + amount
        amount = temp.replace('-', '-$')
    }

    if(name === 'tray-arrow-down'){
        style.color = '#20a5f2'
        style.bg = '#17344f'
    }else if(name === 'dollar-sign'){
        style.color = '#ee3356'
        style.bg = '#411c2d'
    }else if(name === 'send'){
        style.color = '#1aa270'
        style.bg = '#163436'
    }else{
        style.color = '#ff8d3a'
        style.bg = '#422d28'
    }

    return (
        <Stack direction='row' bg='#2e303c' py={3} px={4} borderRadius='3xl' alignItems='center' my={3}>
            <Stack borderRadius='full' p={4} bg={style.bg} mr={3}>
                <Icon name={name} color={style.color} size={18}/>
            </Stack>
            <Stack flex={1}>
                <Text color='white' fontSize={18} fontWeight='bold'>{label}</Text>
                <Text color='white' fontSize={14}>{dateTime}</Text>
            </Stack>
            <Text color='white' fontSize={16} fontWeight='bold'>{amount}</Text>
        </Stack>
    )
}

export default TransHis