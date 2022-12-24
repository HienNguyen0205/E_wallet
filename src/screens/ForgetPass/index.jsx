import React, { useState, useRef } from 'react'
import { Box, Stack, FormControl, Input, Link, Button, Center, Pressable, Icon, useToast } from "native-base"
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import { signIn } from '../../redux/reducer/isSignIn'
import { setUserInfo } from '../../redux/reducer/userInfo'
import { baseURL } from '../../api'
import { setForgetPassState } from '../../redux/reducer/forgetPassState'
import axios from 'axios'
import Logo from '../../components/Logo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ForgetPass = () => {

    const [showNewPwd, setShowNewPwd] = useState(false)
    const forgetPassState = useSelector(state => state.forgetPassState.value)
    const { email } = useSelector(state => state.userInfo.value)
    const { control, handleSubmit, formState: { errors }, reset, register, setValue, watch } = useForm()
    const { navigate } = useNavigation()
    const dispatch = useDispatch()
    const toast = useToast()
    const pass = useRef({})
    pass.current = watch('pass', '')


    const userSignIn = () => {
        return new Promise(resolve => {
            dispatch(signIn())
            resolve()
        })
    }

    const checkEmail = email => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if(regex.test(email)){
            const countDown = setTimeout(() => {
                dispatch(toggleLoading())
                toast.show({
                    title: 'Can not send otp to this email address',
                    duration: 2500
                })
            }, 30000)
            dispatch(toggleLoading())
            axios({
                method: 'post',
                url: `http://${baseURL}:80/E_Wallet_API/api/user/getotp.php`,
                data: {
                    email: email
                }
            })
            .then(response => {
                if (response.data.code === 0) {
                    clearTimeout(countDown)
                    dispatch(setForgetPassState('otp'))
                    dispatch(toggleLoading())
                    changeScreen('OTP')
                    dispatch(setUserInfo({
                        email: email
                    }))
                }
            })
        }
    }

    const changePass = pass => {

        dispatch(toggleLoading())

        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/resetpassword.php`,
            data: {
                email: email,
                new_pass: pass
            }
        })
            .then(async response => {
                if (response.data.code === 0) {
                    await userSignIn()
                    dispatch(setForgetPassState('email'))
                    dispatch(toggleLoading())
                    changeScreen('BottomNav')
                }else{
                    dispatch(toggleLoading())
                }
                toast({
                    title: response.data.data,
                    duration: 2500,
                })
            })
    }

    const onSubmit = data => {

        const { pass, email } = data

        if (forgetPassState === 'email') {
            checkEmail(email)
        }

        if (forgetPassState === 'resetPass') {
            changePass(pass)
        }
    }

    const changeScreen = target => {
        reset()
        navigate(target)
    }

    return (
        <Center w="100%" flex={1} backgroundColor='#272a3f'>
            <Box p="2" py="8" w="80%">
                <Stack space={3} mt="5">
                    <Logo />
                    {forgetPassState === 'email' && <FormControl isRequired isInvalid={'email' in errors}>
                        <Controller control={control}
                            render={({ field }) => (
                                <Input type='text'
                                    variant={'fill'}
                                    placeholder="Enter email"
                                    {...field}
                                    onChangeText={text => field.onChange(text)}
                                />
                            )}
                            name='email'
                            rules={{
                                required: 'Please enter email',
                                pattern: {
                                    value: '/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g',
                                    message: 'Wrong email address format'
                                }
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={3} color="#ef4444" />}>
                            {errors.email?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>}
                    {forgetPassState === "resetPass" && <Stack space={3}>
                        <FormControl isRequired isInvalid={'pass' in errors}>
                            <Controller control={control}
                                render={({ field }) => (
                                    <Input
                                        type={showNewPwd ? "text" : "password"}
                                        variant='fill'
                                        placeholder="Enter new password"
                                        {...field}
                                        onChangeText={text => field.onChange(text)}
                                        InputRightElement={
                                            <Pressable onPress={() => setShowNewPwd(!showNewPwd)}>
                                                <Icon as={Ionicons} name={showNewPwd ? "eye" : "eye-off"} size={5} mr="2" color='#ffffff' />
                                            </Pressable>
                                        }
                                    />
                                )}
                                name='pass'
                                rules={{
                                    required: 'Please enter password',
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message: 'Wrong password'
                                    }
                                }}
                            />
                            <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444" />}>
                                {errors.pass?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={'confirmPwd' in errors}>
                            <Controller control={control}
                                render={({ field }) => (
                                    <Input
                                        type="password"
                                        variant={'fill'}
                                        placeholder="Confirm new password"
                                        {...field}
                                        onChangeText={text => field.onChange(text)}
                                    />
                                )}
                                name='confirmPwd'
                                rules={{
                                    required: 'Please enter confirm password',
                                    validate: value => value === pass.current || 'Confirm Password is not match with password'
                                }}
                            />
                            <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={3} color="#ef4444" />}>
                                {errors.confirmPwd?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Stack>}
                    <Button mt="2" colorScheme="indigo" onPress={handleSubmit(onSubmit)}>
                        {forgetPassState === 'email' ? 'Continue' : 'Change password'}
                    </Button>
                    <Stack mt={6} space={4} alignItems='center'>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "md"
                        }} onPress={() => {
                            dispatch(setForgetPassState('email'))
                            navigate('Login')
                        }}>Back to Login</Link>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    )
}

export default ForgetPass