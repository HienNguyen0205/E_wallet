import React from 'react'
import { Stack , Text, IconButton, Icon, Avatar, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const UserInfo = () => {

    const { name, birthday, address, createAt } = useSelector(state => state.userInfo.value)
    const { navigate } = useNavigation()

    return (
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => navigate('Setting')}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white'/>}
                    bg='#2e303c' borderRadius="md"/>
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>User Infomation</Text>
            </Stack>
            <Stack alignItems='center'>
                <Avatar source={require('../../assets/Images/User_Image/User.png')} size='xl'>
                    <Avatar.Badge bg='#1aa270'/>
                </Avatar>
            </Stack>
            <Stack borderRadius='2xl' p={4} bg='#2e303c' space={7}>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={16}>Name</Text>
                    <Text color='white' fontSize={16}>{name}</Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={16}>Date of birth</Text>
                    <Text color='white' fontSize={16}>{birthday}</Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={16}>Address</Text>
                    <Text color='white' fontSize={16}>{address}</Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={16}>Create at</Text>
                    <Text color='white' fontSize={16}>{createAt}</Text>
                </Stack>
            </Stack>
            <Button onPress={() => navigate("EditUserInfo")}>Edit Infomation</Button>
        </Stack>
    )
}

export default UserInfo