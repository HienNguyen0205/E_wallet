import React, { useState, useEffect } from 'react'
import { Center, Text, Stack, useToast, IconButton, Icon } from 'native-base'
import { Animated, StyleSheet } from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { useNavigation } from '@react-navigation/native'
import { useSelector ,useDispatch } from 'react-redux'
import { signIn } from '../../redux/reducer/isSignIn'
import { baseURL } from '../../api'
import axios from 'axios'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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

const changPassState = ['Enter Old Transaction Password', 'Enter New Transaction Password', 'Confirm New Transaction Password']

const ChangeTransPass = () => {

    const { email } = useSelector(state => state.userInfo.value)
    const [value, setValue] = useState('')
    const [state, setState] = useState(0)
    const [newPass, setNewPass] = useState('')
    const { navigate } = useNavigation()
    const dispatch = useDispatch()
    const ref = useBlurOnFulfill({ value, cellCount: 6 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    })
    const toast = useToast()

    const returnSetting = () => {
        navigate('Setting')
    }

    const checkTransPass = () => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/checkpasstrans.php`,
            data: {
                email: email,
                passtrans: value
            }
        })
        .then(response => {
            if(response.data.code === 0) {
                setState(1)
            }
            setValue('')
            toast.show({
                title: response.data.data,
                duration: 2500
            })
        })
    }

    const handleNewPass = () => {
        setNewPass(value)
        setState(2)
        setValue('')
    }

    const handleConfirm = () => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/changpasstrans.php`,
            data: {
                email: email,
                newpasstrans: value
            }
        })
        .then(response => {
            if(response.data.code === 0){
                setState(0)
            }
            setValue('')
            toast.show({
                title: response.data.data,
                duration: 2500
            })
        })
    }

    useEffect(() => {
        if(value.length === 6){
            if(state === 0){
                checkTransPass()
            }
            if(state === 1){
                handleNewPass()
            }
            if(state === 2 && newPass === value){
                handleConfirm()
            }
        }
    }, [value])

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
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => returnSetting()}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white' />}
                    bg='#2e303c' borderRadius="md" />
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Change Trans Password</Text>
            </Stack>
            <Stack justifyContent='space-around' alignItems='center' space={4}>
                <Text color='white' fontSize={32} textAlign='center' mt={6}>{changPassState[state]}</Text>
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
            </Stack>
        </Stack>
    )
}

export default ChangeTransPass