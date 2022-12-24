import React, { useState } from 'react'
import { Box, Text, VStack, FormControl, Input, Link, Button, HStack, Center, Pressable, Icon, useToast } from "native-base"
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import { signIn } from '../../redux/reducer/isSignIn'
import { setUserInfo } from '../../redux/reducer/userInfo'
import { baseURL } from '../../api'
import axios from 'axios'
import Logo from '../../components/Logo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Login = () => {

    const [showPwd, setShowPwd] = useState(false)
    const { control , handleSubmit, formState: {errors}, reset, register, setValue} = useForm()
    const {navigate} = useNavigation()
    const dispatch = useDispatch()
    const toast = useToast()

    const userSignIn = () => {
        return new Promise(resolve => {
            dispatch(signIn())
            resolve()
        })
    }

    const onSubmit = data => {

        const { tel, password } = data

        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/login.php`,
            data: {
                phone: tel,
                password: password
            }
        })
        .then(async response => {
            if(response.data.code === 0){
                await userSignIn()
                changeScreen('BottomNav')
                dispatch(setUserInfo({
                    tel: tel,
                }))
            }
            toast.show({
                title: response.data.data,
                duration: 2500
            })
        })
    }

    const changeScreen = target => {
        dispatch(toggleLoading())
        reset()
        navigate(target)
        setTimeout(() => {
            dispatch(toggleLoading())
        }, 400)
    }

    return (
        <Center w="100%" flex={1} backgroundColor='#272a3f'>
            <Box p="2" py="8" w="80%">
                <VStack space={3} mt="5">
                    <Logo/>
                    <FormControl isRequired isInvalid={'tel' in errors}>
                        <Controller control={control}
                            render = {({field}) => (
                                <Input type='text'
                                    variant='fill'
                                    placeholder="Enter phone number"
                                    keyboardType='numeric'
                                    {...field}
                                    onChangeText={text => field.onChange(text)}
                                />
                            )}
                            name='tel'
                            rules={{
                                required: 'Please enter phone number',
                                pattern: {
                                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                    message: 'Wrong phone number format'
                                }
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                            {errors.tel?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'password' in errors}>
                        <Controller control={control}
                            render={({field}) => (
                                <Input
                                    type={showPwd ? "text" : "password"}
                                    variant='fill'
                                    placeholder="Password"
                                    {...field}
                                    onChangeText={text => field.onChange(text)}
                                    InputRightElement={
                                        <Pressable onPress={() => setShowPwd(!showPwd)}>
                                            <Icon as={Ionicons} name={showPwd ? "eye" : "eye-off"} size={5} mr="2" color='#ffffff'/>
                                        </Pressable>
                                    }
                                />
                            )}
                            name='password'
                            rules={{
                                required: 'Please enter password',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                    message: 'Wrong password'
                                }
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                            {errors.password?.message}
                        </FormControl.ErrorMessage>
                        <Link _text={{
                                fontSize: "sm",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1" isUnderlined={false} onPress={() => navigate('ForgetPass')}>
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={handleSubmit(onSubmit)}>Sign in</Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="#ffffff">
                            I'm a new user?{" "}
                        </Text>
                        <Link _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} 
                            onPress={() => changeScreen('Register')}
                            isUnderlined={false}>
                                Register now
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}

export default Login