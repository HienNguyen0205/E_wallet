import React from "react"
import { Stack, Text, Pressable, Image } from 'native-base'
import { useSelector, useDispatch } from "react-redux"
import { setSelectedId } from "../../redux/reducer/payMethod"

const PaymentSelect = ({index, label, fee}) => {

    const dispatch = useDispatch()
    const id = useSelector(state => state.payMethod.selectedId)

    const setLogo = () => {
        if(label === 'Paypal'){
            return require('../../assets/Images/Logo/Paypal_logo.png')
        }
        return require('../../assets/Images/Logo/Payeer_logo.png')
    }

    return (
        <Pressable onPress={() => dispatch(setSelectedId(index))}>
            <Stack direction='row' py={2} px={3} my={2} borderRadius='xl' alignItems='center'
                borderWidth={1} borderColor={id === index ? '#1aa270' : 'white'}>
                <Image mr={3} borderRadius={100}
                    source={setLogo()}
                    alt='' size={50}
                />
                <Stack flex={1}>
                    <Text color='white' fontSize={18}>{label}</Text>
                    <Text color='white' fontSize={14}>{fee}</Text>
                </Stack>
            </Stack>
        </Pressable>
    )
}

export default PaymentSelect