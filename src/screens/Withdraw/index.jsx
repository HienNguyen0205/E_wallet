import React, { useRef, useEffect } from 'react'
import { Stack , Text, IconButton, Icon, Image, Pressable, Input, FormControl, Button, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { useSelector ,useDispatch } from 'react-redux'
import { setSelectedId, setCardInfo, clearCardInfo } from "../../redux/reducer/payMethod"
import { setCode, setModalState } from '../../redux/reducer/transPassModal'
import { setUserInfo } from '../../redux/reducer/userInfo'
import { baseURL } from '../../api'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PaymentSelect from '../../components/PaymentSelect'
import axios from 'axios'
import TransPass from '../../components/TransPass'
import Fontisto from 'react-native-vector-icons/Fontisto'

const Withdraw = () => {

    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { control , handleSubmit, formState: {errors}, reset, register, setValue, watch } = useForm()
    const amount = useRef({})
    amount.current = watch('amount', '')
    const { email, balance, tel } = useSelector(state => state.userInfo.value)
    const code = useSelector(state => state.transPassModal.code)
    const listBank = useSelector(state => state.payMethod.value)
    const selectedId = useSelector(state => state.payMethod.selectedId)
    const toast = useToast()

    const onSubmit = () => {
        dispatch(setModalState(true))
    }

    const updateBalance = () => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/userdetail.php`,
            data: {
                phone: tel,
            }
        })
        .then(response => {
            const { balance } = response.data.data
            dispatch(setUserInfo({
                balance: balance,
            }))
        })
    }

    const withdraw = () => {

        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/withdraw.php`,
            data: {
                email: email,
                amount: amount.current,
                passtrans: code,
                cardnumber: listBank[selectedId].cardNumber
            }
        })
        .then(response => {
            updateBalance()
            dispatch(setCode(''))
            reset()
            toast.show({
                title: response.data.data,
                duration: 2500
            })
        })
    }

    useEffect(() => {
        if(code.length === 6){
            withdraw()
        }
    }, [code])

    useEffect(() => {
        console.log(amount.current)
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/getlinkcard.php`,
            data: {
                email: email
            }
        })
        .then(response => {
            dispatch(clearCardInfo())
            response.data.data.forEach((item, index) => {
                const { type, cardnumber } = item
                dispatch(setCardInfo({
                    index: index,
                    label: type,
                    cardNumber: cardnumber,
                    fee: 'Free payment'
                }))
            })
        })
    }, [email])

    const returnHome = () => {
        reset()
        dispatch(setSelectedId(0))
        navigate('Home')
    }

    return (
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => returnHome()}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white'/>}
                    bg='#2e303c' borderRadius="md"/>
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Withdraw</Text>
            </Stack>
            <Stack style={{position: 'relative'}}>
                <Image h={200} source={require('../../assets/Images/UI_Bg/amount_bg.jpg')} alt=''
                    resizeMode='contain' borderRadius='xl'/>
                <Stack space={2} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text fontSize={22}>Available balance</Text>
                    <Text fontSize={32} fontWeight='bold'>$ {balance}</Text>
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
                                InputLeftElement={<Fontisto name='dollar' size={18} color='white' style={{marginLeft: 14}}/>}
                            />
                        )}
                        name='amount'
                        rules={{
                            required: 'Please enter amount',
                            validate: value => (Number(value) >= 1 && Number(value) < Number(balance)) || 'Amount is invalid'
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                        {errors.amount?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
            </Stack>
            {listBank.length > 0 && <Stack borderRadius='xl' bg='#2e303c' py={2} px={3} mb={2}>
                <Stack direction='row' justifyContent='space-between'>
                    <Text color='white' fontSize={14}>Payment method</Text>
                    <Pressable onPress={() => navigate('AddPayment')}>
                        <Text color='#20a5f2' fontSize={14}>Add payment method</Text>
                    </Pressable>
                </Stack>
                {listBank?.map((item, index) =>
                    <PaymentSelect key={index} index={index}
                        label={item.label} fee={item.fee}
                    />
                )}
            </Stack>}
            {listBank.length === 0 && <Button onPress={() => navigate('AddPayment')}>Add payment method</Button>}
            <Button isDisabled={!amount.current || listBank.length === 0}
                fontSize={18} onPress={handleSubmit(onSubmit)}>Withdraw</Button>
            <TransPass/>
        </Stack>
    )
}

export default Withdraw