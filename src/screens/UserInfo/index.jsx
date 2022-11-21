import React from 'react'
import { Stack , Text, IconButton, Icon, Avatar } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const UserInfo = () => {

    const dispatch = useDispatch()
    const { navigate } = useNavigation()

    const returnSetting = () => {
        dispatch(toggleLoading())
        navigate('Setting')
        setTimeout(() => {
            dispatch(toggleLoading())
        }, 700)
    }

    return (
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => returnSetting()}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white'/>}
                    bg='#2e303c' borderRadius="md"/>
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>User Infomation</Text>
            </Stack>
            <Stack alignItems='center'>
                <Avatar source={require('../../assets/Images/User_Image/User.png')} size='xl'>
                    <Avatar.Badge bg='amber.500'/>
                </Avatar>
            </Stack>
            <Stack borderRadius='2xl' p={4} bg='#2e303c' space={4}>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={16}>Name</Text>
                    <Text color='white' fontSize={16}>Wibu</Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={16}>Gender</Text>
                    <Text color='white' fontSize={16}>Female</Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={16}>Date of birth</Text>
                    <Text color='white' fontSize={16}>02/05/2002</Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={16}>ID No</Text>
                    <Text color='white' fontSize={16}>123456789</Text>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default UserInfo