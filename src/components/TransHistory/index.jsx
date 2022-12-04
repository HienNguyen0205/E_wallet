import React from 'react'
import { Stack, Text, Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

const TransHis = ({label, dateTime, amount, transferType}) => {

    const style = {}

    if(label === 'deposit'){
        label = 'Deposit'
        amount = '$' + amount
        style.color = '#20a5f2'
        style.bg = '#17344f'
        style.name = 'tray-arrow-down'
        style.Icon = MaterialCommunityIcons
    }else if(label === 'withdraw'){
        label = 'Withdraw'
        amount = '-$' + amount
        style.color = '#ee3356'
        style.bg = '#411c2d'
        style.name = 'dollar-sign'
        style.Icon = Feather
    }else if(label === 'transfer'){
        label = 'Transfer'
        style.color = '#1aa270'
        style.bg = '#163436'
        style.name = 'send'
        style.Icon = Feather
        if(transferType === 0){
            amount = '$' + amount
        }else{
            amount = '-$' + amount
        }
    }else{
        label = 'Top-up card'
        amount = '-$' + amount
        style.color = '#ff8d3a'
        style.bg = '#422d28'
        style.name = 'cellphone-check'
        style.Icon = MaterialCommunityIcons
    }

    return (
        <Stack direction='row' bg='#2e303c' py={3} px={4} borderRadius='3xl' alignItems='center' my={2}>
            <Stack borderRadius='full' p={4} bg={style.bg} mr={3}>
                <Icon as={style.Icon} name={style.name} color={style.color} size={18}/>
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