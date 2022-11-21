import React, { useState ,useRef } from 'react'
import { Stack , Text, IconButton, Icon, Image, Input, FormControl, Button, Avatar } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Transfer = () => {

    const [isFound, setIsFound] = useState(false)
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { control , handleSubmit, formState: {errors}, reset, register, setValue, watch } = useForm()
    const amount = useRef({})
    const tel = useRef({})
    amount.current = watch('amount', '')
    tel.current = watch('tel', '')

    const returnHome = () => {
        dispatch(toggleLoading())
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
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Transfer</Text>
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
                <Text color='white' fontSize={14} mb={2}>Receiver's phone number</Text>
                <FormControl isRequired isInvalid={'tel' in errors} mb={2}>
                    <Controller control={control}
                        render = {({field}) => (
                            <Input type='text'
                                variant='fill'
                                keyboardType='numeric'
                                {...field}
                                onChangeText={text => field.onChange(text)}
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
                    <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                        {errors.amount?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
            </Stack>
            <Stack space={6} borderRadius='xl' bg='#2e303c' py={2} px={3}>
                <Stack>
                    <Text color='white' fontSize={14} mb={2}>Receiver's info</Text>
                    <Stack direction='row' py={2} px={3} borderRadius='xl' borderWidth={1} borderColor='#eecbff'>
                        <Avatar source={require('../../assets/Images/User_Image/User.png')} mr={3}/>
                        <Stack justifyContent='center' space={1}>
                            <Text color='#d4ffea' fontSize={16}>Antj-wjbu</Text>
                            <Text color='#d4ffea' fontSize={12}>Id: 1234566</Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack>
                    <Text color='white' fontSize={14} mb={2}>Amount</Text>
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
            </Stack>
            <Button variant={amount.current && tel.current ? 'solid' : 'outline'} fontSize={18}>Transfer</Button>
        </Stack>
    )
}

export default Transfer