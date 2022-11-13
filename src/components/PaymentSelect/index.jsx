import React from "react"
import { Stack, Text, Pressable, Image } from 'native-base'
import { useSelector, useDispatch } from "react-redux"
import { paymentSelected } from "../../redux/reducer/payMethod"

const PaymentSelect = ({ index, src, label, fee}) => {

    const dispatch = useDispatch()
    const isSelected = useSelector(state => state.payMethod.value)

    return (
        <Pressable onPress={() => dispatch(paymentSelected(index))}>
            <Stack direction='row' py={2} px={3} my={2} borderRadius='xl' alignItems='center'
                borderWidth={1} borderColor={isSelected === index ? '#1aa270' : 'white'}>
                <Image mr={3} borderRadius={100}
                    source={src}
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