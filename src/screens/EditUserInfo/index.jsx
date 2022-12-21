import React, { useState } from "react"
import { Stack, IconButton, Icon, Text, Input, Pressable, Button, useToast } from 'native-base'
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "../../redux/reducer/userInfo"
import { baseURL } from "../../api"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DatePicker from 'react-native-date-picker'
import axios from "axios"

const EditUserInfo = () => {

    const { email, address } = useSelector(state => state.userInfo.value)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [newAddress, setNewAddress] = useState(address)
    const { navigate } = useNavigation()
    const dispath = useDispatch()
    const toast = useToast()

    const formatDate = date => {
        return date.slice(8,10) + '-' + date.slice(5,7) + '-' + date.slice(0,4)
    }

    const saveInfo = () => {
        dispath(setUserInfo({
            birthday: formatDate(date.toJSON()),
            address: newAddress
        }))
    }

    const editInfo = () => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/changeinfo.php`,
            data: {
                email: email,
                address: newAddress,
                birthday: date.toJSON().slice(0,10)
            }
        })
        .then(response => {
            if(response.data.code === 0){
                saveInfo()
                navigate("UserInfo")
                toast.show({
                    title: response.data.data,
                    duration: 2500,
                })
            }
        })
    }

    return (
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => navigate("UserInfo")}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white' />}
                    bg='#2e303c' borderRadius="md"/>
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Edit User Infomation</Text>
            </Stack>
            <Stack borderRadius='2xl' p={4} bg='#2e303c' space={4}>
                <Stack>
                    <Text color='white' size={16} width='100%' height='8'>Enter date of birth</Text>
                    <Pressable onPress={() => setOpen(true)}>
                        <Stack borderRadius='sm' bg='white'>
                            <Text py={3} px={2}>{formatDate(date.toJSON())}</Text>
                        </Stack>
                    </Pressable>
                </Stack>
                <Stack>
                    <Text color='white' size={16} w='100%' height='8'>Enter Address</Text>
                    <Input variant='fill' onChangeText={text => setNewAddress(text)}/>
                </Stack>
            </Stack>
            <Button onPress={() => editInfo()}>Save change</Button>
            <DatePicker
                modal
                mode='date'
                open={open}
                date={date}
                maximumDate={new Date()}
                onConfirm={date => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </Stack>
    )
}

export default EditUserInfo