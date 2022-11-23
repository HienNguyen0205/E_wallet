import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Center, Text, Link, Stack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Logo from '../../components/Logo'

const OTP = () => {

    const [code, setCode] = useState('')
    const { navigate } = useNavigation()

    const styles = StyleSheet.create({
        underlineStyleBase: {
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,
        },

        underlineStyleHighLighted: {
            borderColor: "#03DAC6",
        },
    })

    const verifyOTP = code => {
        navigate('SetTransPass')
    }

    return (
        <Center w="100%" flex={1} backgroundColor='#272a3f' justifyContent='center'>
            <Logo />
            <Text color='white' fontSize={32} fontWeight='bold' mt={6}>Enter OTP</Text>
            <OTPInputView
                style={{ width: '80%', height: 200 }}
                pinCount={6}
                onCodeChanged={code => setCode(code)}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                    verifyOTP(code)
                })}
            />
            <Stack space={4} alignItems='center'>
                <Link _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "md"
                }}>Resend</Link>
                <Link _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "md"
                }} onPress={() => navigate('Login')}>Back to Login</Link>
            </Stack>
        </Center>
    )
}

export default OTP