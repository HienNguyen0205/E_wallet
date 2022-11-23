import React, { useState, useRef } from 'react'
import { Stack, Text, IconButton, Icon, Input, FormControl, Button, Pressable, Modal } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import { useForm, Controller } from 'react-hook-form'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ChangePass = () => {

    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { control, handleSubmit, formState: { errors, isValid }, reset, register, setValue, watch } = useForm({mode: 'onChange'})
    const [showOldPwd, setShowOldPwd] = useState(false)
    const [showNewPwd, setShowNewPwd] = useState(false)
    const oldPass = useRef({})
    const newPass = useRef({})
    oldPass.current = watch('old_pass', '')
    newPass.current = watch('new_pass', '')
    const [showModal, setShowModal] = useState(false)

    const returnSetting = () => {
        dispatch(toggleLoading())
        navigate('Setting')
        setTimeout(() => {
            dispatch(toggleLoading())
        }, 700)
    }

    const onSubmit = data => {
        setShowModal(false)
        reset()
    }

    const confirm = () => {
        if(isValid){
            setShowModal(true)
        }
    }

    return (
        <Stack space={6} flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center'>
                <IconButton size='md' variant='solid' onPress={() => returnSetting()}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white' />}
                    bg='#2e303c' borderRadius="md" />
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Change Password</Text>
            </Stack>
            <Stack borderRadius='2xl' p={4} bg='#2e303c' space={3}>
                <FormControl isRequired isInvalid={'old_pass' in errors}>
                    <Controller control={control}
                        render={({ field }) => (
                            <Input
                                type={showOldPwd ? "text" : "password"}
                                variant='fill'
                                placeholder="Enter old password"
                                {...field}
                                onChangeText={text => field.onChange(text)}
                                InputRightElement={
                                    <Pressable onPress={() => setShowOldPwd(!showOldPwd)}>
                                        <Icon as={Ionicons} name={showOldPwd ? "eye" : "eye-off"} size={5} mr="2" color='#ffffff' />
                                    </Pressable>
                                }
                            />
                        )}
                        name='old_pass'
                        rules={{
                            required: 'Please enter password',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'Wrong password'
                            }
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444" />}>
                        {errors.old_pass?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'new_pass' in errors}>
                    <Controller control={control}
                        render={({ field }) => (
                            <Input
                                type={showNewPwd ? "text" : "password"}
                                variant='fill'
                                placeholder="Enter new password"
                                {...field}
                                onChangeText={text => field.onChange(text)}
                                InputRightElement={
                                    <Pressable onPress={() => setShowNewPwd(!showNewPwd)}>
                                        <Icon as={Ionicons} name={showNewPwd ? "eye" : "eye-off"} size={5} mr="2" color='#ffffff' />
                                    </Pressable>
                                }
                            />
                        )}
                        name='new_pass'
                        rules={{
                            required: 'Please enter password',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'Wrong password'
                            },
                            validate: value => oldPass.current !== newPass.current || 'New password is similar to old password'
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={2} color="#ef4444" />}>
                        {errors.new_pass?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'confirmPwd' in errors}>
                    <Controller control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                variant={'fill'}
                                placeholder="Confirm new password"
                                {...field}
                                onChangeText={text => field.onChange(text)}
                            />
                        )}
                        name='confirmPwd'
                        rules={{
                            required: 'Please enter confirm password',
                            validate: value => value === newPass.current || 'Confirm Password is not match with password'
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<Icon as={Ionicons} name="warning" size={3} color="#ef4444" />}>
                        {errors.confirmPwd?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
            </Stack>
            <Button bg='#e11d48' onPress={() => confirm()}>Change Password</Button>
            <Stack alignItems='center'>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Change Password</Modal.Header>
                        <Modal.Body>
                            Are you sure you want to change your password.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setShowModal(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={handleSubmit(onSubmit)}>
                                    Change
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Stack>
        </Stack>
    )
}

export default ChangePass