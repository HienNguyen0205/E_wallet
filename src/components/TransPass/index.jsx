import React, { useState, useEffect } from 'react'
import { Stack, Modal, useToast, Text } from 'native-base'
import { Animated, StyleSheet } from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { useSelector, useDispatch } from 'react-redux'
import { baseURL } from '../../api'
import { setCode, setModalState } from '../../redux/reducer/transPassModal'
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

const TransPass = () => {

    const isOpen = useSelector(state => state.transPassModal.isOpen)
    const { email } = useSelector(state => state.userInfo.value)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const ref = useBlurOnFulfill({ value, cellCount: 6 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    })
    const toast = useToast()

    const onSubmit = () => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/checkpasstrans.php`,
            data: {
                email: email,
                passtrans: value
            }
        })
        .then(response => {
            if(response.data.code === 0){
                dispatch(setCode(value))
                dispatch(setModalState(false))
            }
            setValue('')
            toast.show({
                title: response.data.data,
                duration: 2500
            })
        })
    }

    const styles = StyleSheet.create({
        codeFieldRoot: {
            height: 60,
            justifyContent: 'center',
            marginTop: 18,
        },
        cell: {
            marginHorizontal: 8,
            height: 36,
            width: 36,
            lineHeight: 36 - 5,
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

    const handleClode = () => {
        dispatch(setCode(''))
        dispatch(setModalState(false))
    }

    useEffect(() => {
        if(value.length === 6){
            onSubmit()
        }
    }, [value])

    return (
        <Stack alignItems='center'>
            <Modal isOpen={isOpen} onClose={() => handleClode()} closeOnOverlayClick={false} size='lg'>
                <Modal.Content maxWidth="400px" bg='#d6ccf9'>
                    <Modal.CloseButton style={{ position: 'absolute', right: 8, top: 6 }}/>
                    <Modal.Header bg="#a8a5ec" style={{ position: 'relative', height: 40 }}>
                        <Text fontSize={18} style={{ position: 'absolute', left: 40, top: 6 }}>Enter transaction password</Text>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Stack>
    )
}

export default TransPass