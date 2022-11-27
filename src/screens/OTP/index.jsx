import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Center, Text, Link, Stack, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { baseURL } from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { setForgetPassState } from '../../redux/reducer/forgetPassState'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Logo from '../../components/Logo'
import axios from 'axios'

const OTP = () => {

    const [code, setCode] = useState('')
    const { navigate } = useNavigation()
    const { email } = useSelector(state => state.userInfo.value)
    const toast = useToast()
    const forgetPassState = useSelector(state => state.forgetPassState.value)
    const dispatch = useDispatch()

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
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/verifyotp.php`,
            data: {
                otp_code: code,
                email: email,
            }
        })
        .then(response => {
            if(response.data.code === 0){
                if(forgetPassState === 'otp'){
                    dispatch(setForgetPassState('resetPass'))
                    navigate('ForgetPass')
                }else{
                    navigate('SetTransPass')
                }
            }else{
                setCode('')
                toast.show({
                    title: response.data.data,
                    duration: 2500,
                })
            }
        })
        
    }

    return (
        <Center w="100%" flex={1} backgroundColor='#272a3f' justifyContent='center'>
            <Logo />
            <Text color='white' fontSize={32} fontWeight='bold' mt={6}>Enter OTP</Text>
            <OTPInputView
                code={code}
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
                }} onPress={() => {
                    dispatch(setForgetPassState('email'))
                    navigate('Login')
                }}>Back to Login</Link>
            </Stack>
        </Center>
    )
}

export default OTP