import React, { useState } from 'react'
import { Stack, Text, Icon, IconButton } from 'native-base'
import { StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const paymentOptions = ['Paypal', 'Payeer']

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
            maxWidth: 150,
            height: 46,
            backgroundColor: 'white',
            borderRadius: 8,
        },
        dropdownText: {
            color: '#000000',
        },
        dropdownBg: {
            backgroundColor: 'white',
            borderRadius: 8,
        },
        dropdownRow: {
            backgroundColor: 'white',
            borderBottomColor: 'black'
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
            <Stack borderRadius='xl' bg='#2e303c' py={2} px={3} mb={2}>
                <Stack>
                    <Text color='white' fontSize={16} mb={2}>Select payment method</Text>
                    <SelectDropdown  data={paymentOptions} onSelect={item => {setPayment(item)}}
                        buttonTextAfterSelection={selectedItem => selectedItem} buttonStyle={styles.dropdownBtn}
                        rowTextForSelection={item => item} defaultValue='Daily' buttonTextStyle={styles.dropdownText}
                        dropdownStyle={styles.dropdownBg} rowStyle={styles.dropdownRow} rowTextStyle={styles.dropdownText}
                        defaultButtonText='Select payment method' width='100%'
                        renderDropdownIcon={isOpened => {
                            return <Icon as={FontAwesome} name={isOpened ? 'chevron-up' : 'chevron-down'} color='white' mr={2}/>
                        }}
                        dropdownIconPosition='right'
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default AddPayment