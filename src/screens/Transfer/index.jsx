import React, { useState, useRef, useEffect } from 'react'
import { Stack, Text, IconButton, Icon, Image, Input, FormControl, Button, Avatar, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { setCode, setModalState } from '../../redux/reducer/transPassModal'
import { baseURL } from '../../api'
import { setUserInfo } from '../../redux/reducer/userInfo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import TransPass from '../../components/TransPass'
import Fontisto from 'react-native-vector-icons/Fontisto'

const Transfer = () => {

    const [receiverInfo, setReceiverInfo] = useState({})
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { control, handleSubmit, formState: { errors }, reset, register, setValue, watch } = useForm()
    const amount = useRef({})
    const phone = useRef({})
    amount.current = watch('amount', '')
    phone.current = watch('tel', '')
    const { balance, tel, email } = useSelector(state => state.userInfo.value)
    const code = useSelector(state => state.transPassModal.code)
    const toast = useToast()

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

    const transfer = () => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/transfer.php`,
            data: {
                email: email,
                amount: amount.current,
                passtrans: code,
                note: "",
                receiver: phone.current,
            }
        })
        .then(response => {
            if(response.data.code === 0){
                updateBalance()
            }
            dispatch(setCode(''))
            setReceiverInfo({})
            reset()
            toast.show({
                title: response.data.data,
                duration: 2500
            })
        })
    }

    useEffect(() => {
        if (phone.current?.length === 10) {
            axios({
                method: 'post',
                url: `http://${baseURL}:80/E_Wallet_API/api/user/userdetail.php`,
                data: {
                    phone: phone.current
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        const { name } = response.data.data
                        setReceiverInfo({
                            name: name
                        })
                    }
                })
        }
        if (phone.current?.length === 9){
            setReceiverInfo({})
        }
    }, [phone.current])

    useEffect(() => {
        if(code.length === 6){
            transfer()
        }
    }, [code])

    const onSubmit = () => {
        dispatch(setModalState(true))
    }

    const returnHome = () => {
        reset()
        navigate('Home')
    }

    return (
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => returnHome()}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white' />}
                    bg='#2e303c' borderRadius="md" />
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Transfer</Text>
            </Stack>
            <Stack style={{ position: 'relative' }}>
                <Image h={200} source={require('../../assets/Images/UI_Bg/amount_bg.jpg')} alt=''
                    resizeMode='contain' borderRadius='xl' />
                <Stack space={2} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Text fontSize={22}>Available balance</Text>
                    <Text fontSize={32} fontWeight='bold'>$ {balance}</Text>
                </Stack>
            </Stack>
            <Stack borderRadius='xl' bg='#2e303c' py={2} px={3}>
                <Text color='white' fontSize={14} mb={2}>Receiver's phone number</Text>
                <FormControl isRequired isInvalid={'tel' in errors} mb={2}>
                    <Controller control={control}
                        render={({ field }) => (
                            <Input type='text'
                                variant='fill'
                                keyboardType='numeric'
                                {...field}
                                onChangeText={text => field.onChange(text)}
                                InputLeftElement={<MaterialIcons name='phone' size={18} color='white' style={{marginLeft: 14}}/>}
                            />
                        )}
                        name='tel'
                        rules={{
                            required: 'Please enter phone number',
                            pattern: {
                                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                message: 'Wrong phone number format'
                            }
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444" />}>
                        {errors.tel?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
            </Stack>
            {Object.keys(receiverInfo).length > 0 && <Stack space={6} borderRadius='xl' bg='#2e303c' pt={2} px={3}>
                <Stack>
                    <Text color='white' fontSize={14} mb={2}>Receiver's info</Text>
                    <Stack direction='row' py={2} px={3} borderRadius='xl' borderWidth={1} borderColor='#eecbff'>
                        <Avatar source={require('../../assets/Images/User_Image/User.png')} mr={3} />
                        <Stack justifyContent='center' space={1}>
                            <Text color='#d4ffea' fontSize={16}>{receiverInfo?.name}</Text>
                            <Text color='#d4ffea' fontSize={12}>Id: 123</Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack>
                    <Text color='white' fontSize={14} mb={2}>Amount</Text>
                    <FormControl isRequired isInvalid={'amount' in errors} mb={2}>
                        <Controller control={control}
                            render={({ field }) => (
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
                                validate: value => (Number(value) >= 1 && Number(value) < Number(balance))  || 'Amount is invalid'
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444" />}>
                            {errors.amount?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Stack>
            </Stack>}
            <TransPass/>
            <Button isDisabled={!amount.current || !phone.current} fontSize={18} onPress={handleSubmit(onSubmit)}>Transfer</Button>
        </Stack>
    )
}

export default Transfer