import React, {useState} from 'react'
import { Box, Text, VStack, FormControl, Input, Link, Button, HStack, Center, Pressable, Icon } from "native-base"
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import Logo from '../../components/Logo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Login = () => {

    const [showPwd, setShowPwd] = useState(false)
    const { control , handleSubmit, formState: {errors} } = useForm()
    const {navigate} = useNavigation()
    const dispatch = useDispatch()

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
        <Center w="100%" flex={1} backgroundColor='#272a3f'>
            <Box p="2" py="8" w="80%">
                <VStack space={3} mt="5">
                    <Logo/>
                    <FormControl isRequired isInvalid={'username' in errors}>
                        <Controller control={control}
                            render = {({field: {onChange}}) => (
                                <Input type='text'
                                    variant='fill'
                                    placeholder="Enter username"
                                    onChangeText={text => onChange(text)}
                                />
                            )}
                            name='username'
                            rules={{
                                required: 'Please enter username',
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                            {errors.username?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'password' in errors}>
                        <Controller control={control}
                            render={({field: {onChange}}) => (
                                <Input
                                    type={showPwd ? "text" : "password"}
                                    variant='fill'
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
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                            {errors.password?.message}
                        </FormControl.ErrorMessage>
                        <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1" isUnderlined={false}>
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