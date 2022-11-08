import React from 'react'
import { Stack , Text, IconButton, Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Deposit = () => {

    const { navigate } = useNavigation()

    return (
        <Stack flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => navigate('Home')}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white'/>}
                    bg='#2e303c' borderRadius="md"/>
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Deposit</Text>
            </Stack>
            <Stack borderRadius='2xl'>
                <Text></Text>
                <Text></Text>
            </Stack>
        </Stack>
    )
}

export default Deposit