import React, { useRef } from 'react'
import { Stack , Text, IconButton, Icon, Image, Pressable, Input, FormControl, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { paymentSelected } from "../../redux/reducer/payMethod"
import { toggleLoading } from '../../redux/reducer/loading'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PaymentSelect from '../../components/PaymentSelect'

const data = [
    {
        src: require('../../assets/Images/Logo/Paypal_logo.png'),
        label: 'Paypal',
        fee: 'Free payment',
    },
    {
        src: require('../../assets/Images/Logo/Payeer_logo.png'),
        label: 'Payeer',
        fee: 'Free payment',
    },
]

const Deposit = () => {

    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { control , handleSubmit, formState: {errors}, reset, register, setValue, watch } = useForm()
    const amount = useRef({})
    amount.current = watch('amount', '')

    const returnHome = () => {
        dispatch(toggleLoading())
        dispatch(paymentSelected(0))
        navigate('Home')
        setTimeout(() => {
            dispatch(toggleLoading())
        }, 700)
    }

    return (
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => returnHome()}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white'/>}
                    bg='#2e303c' borderRadius="md"/>
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Deposit</Text>
            </Stack>
            <Stack style={{position: 'relative'}}>
                <Image h={200} source={require('../../assets/Images/UI_Bg/amount_bg.jpg')} alt=''
                    resizeMode='contain' borderRadius='xl'/>
                <Stack space={2} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text fontSize={22}>Available balance</Text>
                    <Text fontSize={32} fontWeight='bold'>$ 10000000000</Text>
                </Stack>
            </Stack>
            <Stack borderRadius='xl' bg='#2e303c' py={2} px={3}>
                <Text color='white' fontSize={14} mb={2}>Enter amount</Text>
                <FormControl isRequired isInvalid={'amount' in errors} mb={2}>
                    <Controller control={control}
                        render = {({field}) => (
                            <Input type='text'
                                variant='fill'
                                keyboardType='numeric'
                                {...field}
                                onChangeText={text => field.onChange(text)}
                            />
                        )}
                        name='amount'
                        rules={{
                            required: 'Please enter amount',
                            validate: value => Number(value) >= 1 || 'Amount is invalid'
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                        {errors.amount?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
            </Stack>
            <Stack borderRadius='xl' bg='#2e303c' py={2} px={3} mb={2}>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={14}>Payment method</Text>
                    <Pressable onPress={() => navigate('AddPayment')}>
                        <Text color='#20a5f2' fontSize={14}>Add payment method</Text>
                    </Pressable>
                </Stack>
                {data?.map((item, index) =>
                    <PaymentSelect key={index} index={index} src={item.src}
                        label={item.label} fee={item.fee}
                    />
                )}
            </Stack>
            <Button variant={amount.current ? 'solid' : 'outline'} fontSize={18}>Deposit</Button>
        </Stack>
    )
}

export default Deposit