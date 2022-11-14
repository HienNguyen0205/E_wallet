import React, { useState } from 'react'
import { Stack, Text, Icon, IconButton, FormControl, Input, Button } from 'native-base'
import { View , Image, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const paymentOptions = [
    {
        title: 'Paypal',
        logo: require('../../assets/Images/Logo/Paypal_logo.png'),
    },
    {
        title: 'Payeer',
        logo: require('../../assets/Images/Logo/Payeer_logo.png'),
    },
]

const AddPayment = () => {

    const dispatch = useDispatch()
    const [payment, setPayment] = useState()
    const { navigate } = useNavigation()
    const { control , handleSubmit, formState: {errors}, reset, register, setValue, watch } = useForm()

    const returnDeposit = () => {
        dispatch(toggleLoading())
        navigate('Deposit')
        setTimeout(() => {
            dispatch(toggleLoading())
        }, 700)
    }

    const styles = StyleSheet.create({ 
        dropdownBtn: {
            width: '100%',
            height: 46,
            backgroundColor: 'white',
            borderRadius: 8,
        },
        dropdownBg: {
            backgroundColor: 'white',
            borderRadius: 8,
        },
        dropdownRow: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 46,
            backgroundColor: 'white',
            paddingHorizontal: 18,
        },
        dropdownBtnImage: {width: 40, height: 40, resizeMode: 'cover', marginRight: 16},
        dropdownChild: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 18,
        }
    })

    return (
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => returnDeposit()}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white'/>}
                    bg='#2e303c' borderRadius="md"/>
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Add payment method</Text>
            </Stack>
            <Stack borderRadius='xl' bg='#2e303c' py={2} px={3} mb={2} space={3}>
                <Stack>
                    <Text color='white' fontSize={16} mb={2}>Select payment method</Text>
                    <SelectDropdown
                        data={paymentOptions}
                        onSelect={item => setPayment(item)}
                        buttonStyle={styles.dropdownBtn}
                        renderCustomizedButtonChild={selectedItem => {
                            return (
                                <View style={styles.dropdownChild}>
                                {payment ? (
                                    <Image source={selectedItem.logo} style={styles.dropdownBtnImage} />
                                ) : (
                                    <FontAwesome name="credit-card" color={'#444'} size={32} />
                                )}
                                    <Text color='black' mr={6} fontSize={18}>{selectedItem ? selectedItem.title : 'Select payment method'}</Text>
                                    <FontAwesome name="chevron-down" color={'#444'} size={18} />
                                </View>
                            )
                        }}
                        dropdownStyle={styles.dropdownBg}
                        rowStyle={{height: 46}}
                        renderCustomizedRowChild={item => {
                            return (
                                <View style={styles.dropdownRow}>
                                    <Image source={item.logo} style={styles.dropdownBtnImage} />
                                    <Text color='black'>{item.title}</Text>
                                </View>
                            )
                        }}
                    />
                </Stack>
                <Stack>
                    <Text color='white' fontSize={16} mb={1}>Card ID</Text>
                    <Text color='#ff8d3a' fontSize={12} mb={2}>Card ID contain 16 number</Text>
                    <FormControl isRequired isInvalid={'card_id' in errors}>
                        <Controller control={control}
                            render={({field}) => (
                                <Input
                                    type='text'
                                    variant={'fill'}
                                    keyboardType='numeric'
                                    {...field}
                                    onChangeText={text => field.onChange(text)}
                                />
                            )}
                            name='card_id'
                            rules={{
                                required: 'Please enter card id',
                                pattern: {
                                    value: /^[0-9]{16}\b/,
                                    message: 'Invalid card id',
                                }
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                            {errors.card_id?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Stack>
                <Stack>
                    <Text color='white' fontSize={16} mb={2}>Bank account holder's name</Text>
                    <FormControl isRequired isInvalid={'name' in errors}>
                        <Controller control={control}
                            render={({field}) => (
                                <Input
                                    type='text'
                                    variant={'fill'}
                                    autoCapitalize = {"characters"}
                                    {...field}
                                    onChangeText={text => field.onChange(text)}
                                />
                            )}
                            name='name'
                            rules={{
                                required: "Please enter bank account holder's name",
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                            {errors.name?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Stack>
                <Stack>
                    <Text color='white' fontSize={16} mb={2}>Identity card number</Text>
                    <FormControl isRequired isInvalid={'id' in errors}>
                        <Controller control={control}
                            render={({field}) => (
                                <Input
                                    type='text'
                                    variant={'fill'}
                                    keyboardType='numeric'
                                    {...field}
                                    onChangeText={text => field.onChange(text)}
                                />
                            )}
                            name='id'
                            rules={{
                                required: "Please enter identity card number",
                                pattern: {
                                    value: /^[0-9]{12}\b/,
                                    message: 'Invalid card identity card number',
                                }
                            }}
                        />
                        <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444"/>}>
                            {errors.id?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Stack>
            </Stack>
            <Button fontSize={18}>Add now</Button>
        </Stack>
    )
}

export default AddPayment