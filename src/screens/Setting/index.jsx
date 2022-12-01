import React from 'react'
import { Stack, Text, Avatar, Pressable, Switch, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useSelector ,useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { signOut } from '../../redux/reducer/isSignIn'
import { toggleLoading } from '../../redux/reducer/loading'
import { clearUserInfo } from '../../redux/reducer/userInfo'

const Setting = () => {

    const { navigate } = useNavigation()
    const dispatch = useDispatch()
    const name = useSelector(state => state.userInfo.name)

    const signout = () => {
        return new Promise(resolve => {
            dispatch(signOut())
            dispatch(clearUserInfo())
            resolve()
        })
    }

    async function backLogin() {
        await signout()
        dispatch(toggleLoading())
        navigate('Login')
        setTimeout(() => {
            dispatch(toggleLoading())
        }, 700)
    }

    return (
        <Stack flex={1} p="4" py="6" backgroundColor='#171928' space={3}>
            <Pressable onPress={() => navigate('UserInfo')}>
                <Stack direction='row' borderRadius='xl' bg='#2e303c' p={4} alignItems='center'>
                    <Avatar source={require('../../assets/Images/User_Image/User.png')} mr={3}/>
                    <Stack justifyContent='space-around' flex={1}>
                        <Text color='white' fontSize={18}>{name}</Text>
                        <Text color='#1aa270' fontSize={16}>Verified</Text>
                    </Stack>
                    <Icon name='keyboard-arrow-right' size={32} color='white'/>
                </Stack>
            </Pressable>
            <Stack borderRadius='xl' bg='#2e303c' p={4} space={5}>
                <Pressable onPress={() => navigate('ChangePass')}>
                    <Stack direction='row' alignItems='center'>
                        <Text color='white' fontSize={18} flex={1}>Change password</Text>
                        <Icon name='keyboard-arrow-right' size={32} color='white'/>
                    </Stack>
                </Pressable>
                <Stack direction='row' alignItems='center'>
                    <Text color='white' fontSize={18} flex={1}>Change transaction password</Text>
                    <Icon name='keyboard-arrow-right' size={32} color='white'/>
                </Stack>
                <Stack direction='row' alignItems='center'>
                    <Text color='white' fontSize={18} flex={1}>Dark mode</Text>
                    <Switch defaultIsChecked colorScheme="secondary" />
                </Stack>
                <Stack direction='row' alignItems='center'>
                    <Text color='white' fontSize={18} flex={1}>About us</Text>
                    <Icon name='keyboard-arrow-right' size={32} color='white'/>
                </Stack>
            </Stack>
            <Button mt={3} bg='#ee3356' px={2} onPress={() => backLogin()}>Log out</Button>
        </Stack>
    )
}

export default Setting