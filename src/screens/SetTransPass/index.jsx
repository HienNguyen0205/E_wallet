import React, { useState, useEffect } from 'react'
import { Center, Button, Text, Link, Stack, useToast } from 'native-base'
import { Animated, StyleSheet } from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { useNavigation } from '@react-navigation/native'
import { useSelector ,useDispatch } from 'react-redux'
import { signIn } from '../../redux/reducer/isSignIn'
import { baseURL } from '../../api'
import Logo from '../../components/Logo'
import axios from 'axios'

const { Value, Text: AnimatedText } = Animated

const animationsColor = [...new Array(6)].map(() => new Value(0))
const animationsScale = [...new Array(6)].map(() => new Value(1))
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start()
}

const SetTransPass = () => {

    const { email } = useSelector(state => state.userInfo.value)
    const [value, setValue] = useState('')
    const { navigate } = useNavigation()
    const dispatch = useDispatch()
    const ref = useBlurOnFulfill({ value, cellCount: 6 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    })
    const toast = useToast()

    const userSignIn = () => {
        return new Promise(resolve => {
            dispatch(signIn())
        })
    }

    const onSubmit = () => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/setpasswordtrans.php`,
            data: {
                email: email,
                passtrans: value
            }
        })
        .then(async response => {
            if(response.data.code === 0) {
                await userSignIn()
                navigate('BottomNav')
            }else{
                setValue('')
            }
            toast.show({
                title: response.data.data,
                duration: 2500,
            })
        })
        
    }

    const styles = StyleSheet.create({
        codeFieldRoot: {
            height: 48,
            marginTop: 30,
            justifyContent: 'center',
        },
        cell: {
            marginHorizontal: 8,
            height: 48,
            width: 48,
            lineHeight: 48 - 5,
            fontSize: 24,
            textAlign: 'center',
            borderRadius: 8,
            color: '#3759b8',
            backgroundColor: '#fff',
            elevation: 3,
        },

        root: {
            minHeight: 800,
            padding: 20,
        },
        title: {
            paddingTop: 50,
            color: '#000',
            fontSize: 25,
            fontWeight: '700',
            textAlign: 'center',
            paddingBottom: 40,
        },
        icon: {
            width: 217 / 2.4,
            height: 158 / 2.4,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        subTitle: {
            paddingTop: 30,
            color: '#000',
            textAlign: 'center',
        },
        nextButton: {
            marginTop: 30,
            borderRadius: 60,
            height: 60,
            backgroundColor: '#3557b7',
            justifyContent: 'center',
            minWidth: 300,
            marginBottom: 100,
        },
        nextButtonText: {
            textAlign: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: '700',
        },
    })

    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#3557b7', '#f7fafe'],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#ffffff', '#f7fafe'],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [70, 8],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        }

        useEffect(() => {
            animateCell({ hasValue, index, isFocused })
        }, [value])

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        )
    }

    return (
        <Center w="100%" flex={1} backgroundColor='#272a3f' justifyContent='center'>
            <Stack justifyContent='space-around' alignItems='center' space={4}>
                <Logo />
                <Text color='white' fontSize={32} fontWeight='bold' mt={6}>Create transaction pass</Text>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="password"
                    renderCell={renderCell}
                />
                <Button mt={6} onPress={() => onSubmit()}>Create Password</Button>
                <Link _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "md"
                }} onPress={() => navigate('Login')}>Back to Login</Link>
            </Stack>
        </Center>
    )
}

export default SetTransPass