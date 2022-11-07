import React from 'react'
import { Center, Text, Icon } from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo'

const Logo = () => {
    return (
        <Center w="100%" mb={10}>
            <Icon as={Entypo} name="wallet" size={54} color="#ffffff"/>
            <Text fontSize={'2xl'} fontWeight={'bold'} color="#ffffff">
                E-wallet
            </Text>
        </Center>
    )
}

export default Logo