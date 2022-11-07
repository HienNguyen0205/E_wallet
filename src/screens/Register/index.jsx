import React, {useState, useRef} from 'react'
import { Box, Text, VStack, FormControl, Input, Link, Button, HStack, Center, Pressable, Icon } from "native-base"
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import Logo from '../../components/Logo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Register = () => {

    const [showPwd, setShowPwd] = useState(false)
    const { control , handleSubmit, formState: {errors}, watch } = useForm()
    const {navigate} = useNavigation()
    const dispatch = useDispatch()
    const password = useRef({})
    password.current = watch('password', '')

    const onSubmit = data => {
        changeScreen('BottomNav')
    }

    const changeScreen = target => {
        dispatch(toggleLoading())
        navigate(target)
        setTimeout(() => {
            dispatch(toggleLoading())
        }, 700)
    }

    return (
        <Center w="100%" flex={1} backgroundColor={'#272a3f'}>
            <Box p="2" py="8" w="80%">
                <VStack space={3} mt="5">
                    <Logo/>
                    <FormControl isRequired isInvalid={'username' in errors}>
                        <Controller control={control}
                            render = {({field: {onChange}}) => (
                                <Input type='text'
                                    variant={'fill'}
                                    placeholder="Enter username"
                                    onChangeText={text => onChange(text)}
                                />
                            )}
                            name='username'
                            rules={{
                                required: 'Please enter username',
                                minLength: {
                                    value: 8,
                                    message: 'Username is as least 8 characters'
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Username is no more than 30 characters'
                                },
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={3} color="#ef4444"/>}>
                            {errors.username?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'tel' in errors}>
                        <Controller control={control}
                            render = {({field: {onChange}}) => (
                                <Input type='text'
                                    variant={'fill'}
                                    placeholder="Phone number"
                                    onChangeText={text => onChange(text)}
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
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={3} color="#ef4444"/>}>
                            {errors.tel?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'password' in errors}>
                        <Controller control={control}
                            render={({field: {onChange}}) => (
                                <Input
                                    type={showPwd ? "text" : "password"}
                                    variant={'fill'}
                                    placeholder="Password"
                                    onChangeText={text => onChange(text)}
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
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'Password must contain minimum eight characters, at least one letter, one number'
                                }
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={3} color="#ef4444"/>}>
                            {errors.password?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'confirmPwd' in errors}>
                        <Controller control={control}
                            render={({field: {onChange}}) => (
                                <Input
                                    type="password"
                                    variant={'fill'}
                                    placeholder="Confirm password"
                                    onChangeText={text => onChange(text)}
                                />
                            )}
                            name='confirmPwd'
                            rules={{
                                required: 'Please enter confirm password',
                                validate: value => value === password.current || 'Confirm Password is not match with password'
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={3} color="#ef4444"/>}>
                            {errors.confirmPwd?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={handleSubmit(onSubmit)}>Register</Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="#ffffff">
                            I have an account{" "}
                        </Text>
                        <Link _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} onPress={() => changeScreen('Login')} isUnderlined={false}>
                                Login now
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}

export default Register