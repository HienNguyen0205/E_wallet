import React, { useState, useEffect } from 'react'
import { Stack , Text, IconButton, Icon, Button, Image, Pressable, useToast } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector ,useDispatch } from 'react-redux'
import { setCode, setModalState } from '../../redux/reducer/transPassModal'
import { baseURL } from '../../api'
import { setUserInfo } from '../../redux/reducer/userInfo'
import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import TransPass from '../../components/TransPass'

const operatorName = [
    {
        title: 'viettel',
        logo: require('../../assets/Images/Logo/Viettel_logo.png'),
    },
    {
        title: 'mobifone',
        logo: require('../../assets/Images/Logo/Mobifone_logo.png'),
    },
    {
        title: 'vinaphone',
        logo: require('../../assets/Images/Logo/Vinaphone_logo.png'),
    },
]

const cardTypes = ['$ 10','$ 25', '$ 35', '$ 50', '$ 75']

const TopUpCard = () => {

    const dispatch = useDispatch()
    const [operator, setOperator] = useState(0)
    const [type, setType] = useState('')
    const [showCard, setShowCard] = useState({isShow: false, cardSeri: '', cardCode: ''})
    const { navigate } = useNavigation()
    const toast = useToast()
    const { email, balance, tel } = useSelector(state => state.userInfo.value)
    const code = useSelector(state => state.transPassModal.code)

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

    const topupCard = () => {

        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/topupcard.php`,
            data: {
                email: email,
                passtrans: code,
                networkname: operatorName[operator].title,
                price: type.slice(2),
            }
        })
        .then(response => {
            if(response.data.code === 0){
                updateBalance()
                const { cardseri, cardcode } = response.data.data
                setShowCard({
                    isShow: true,
                    cardSeri: cardseri,
                    cardCode: cardcode
                })
            }
            dispatch(setCode(''))
        })
    }

    useEffect(() => {
        if(code.length === 6){
            topupCard()
        }
    }, [code])

    const returnHome = () => {
        navigate('Home')
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
                <IconButton size='md' variant='solid' onPress={() => returnHome()}
                    icon={<Icon as={MaterialIcons} name='keyboard-arrow-left' color='white'/>}
                    bg='#2e303c' borderRadius="md"/>
                <Text flex={1} fontSize={24} fontWeight='bold' textAlign='center' color='white' mr={5}>Top-up Card</Text>
            </Stack>
            <Stack style={{position: 'relative'}}>
                <Image h={200} source={require('../../assets/Images/UI_Bg/amount_bg.jpg')} alt=''
                    resizeMode='contain' borderRadius='xl'/>
                <Stack space={2} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text fontSize={22}>Available balance</Text>
                    <Text fontSize={32} fontWeight='bold'>$ {balance}</Text>
                </Stack>
            </Stack>
            {!showCard.isShow ? <Stack borderRadius='xl' bg='#2e303c' py={2} px={3} space={3}>
                <Stack space={3}>
                    <Stack space={2} direction='row' mt={2}>
                        {operatorName.map((item, index) =>
                            <Stack key={index} borderColor={operator === index ? '#20a5f2' : '#fff'} borderWidth={1} flex={1} style={{height: 48}} borderRadius='lg'>
                                <Pressable onPress={() => setOperator(index)}>
                                    <Image source={item.logo} alt="" resizeMode='contain' style={{height: 48}}/>
                                </Pressable>
                            </Stack>
                        )}
                    </Stack>
                    <Stack>
                        <Text color='white' fontSize={14} mb={2}>Select type</Text>
                        <SelectDropdown
                            data={cardTypes}
                            onSelect={item => setType(item)}
                            buttonStyle={styles.dropdownBtn}
                            renderCustomizedButtonChild={selectedItem => {
                                return (
                                    <View style={styles.dropdownChild}>
                                        <Text color='black' mr={6} fontSize={18}>{selectedItem ? selectedItem : 'Select card type'}</Text>
                                        <FontAwesome name="chevron-down" color={'#444'} size={18} />
                                    </View>
                                )
                            }}
                            dropdownStyle={styles.dropdownBg}
                            rowStyle={{height: 46}}
                            renderCustomizedRowChild={item => {
                                return (
                                    <View style={styles.dropdownRow}>
                                        <Text color='black'>{item}</Text>
                                    </View>
                                )
                            }}
                        />
                    </Stack>
                </Stack>
            </Stack> : <Stack borderRadius='xl' bg='#2e303c' py={2} px={3} space={3}>
                <Stack>
                    <Text color='white' fontWeight={14} mb={2}>Card seri</Text>
                    <Stack borderRadius='xl' bg='white' py={2} px={1}>
                        <Text fontSize={16}>{showCard.cardSeri}</Text>
                    </Stack>
                </Stack>
                <Stack>
                    <Text color='white' fontWeight={14} mb={2}>Card number</Text>
                    <Stack borderRadius='xl' bg='white' py={2} px={1}>
                        <Text fontSize={16}>{showCard.cardCode}</Text>
                    </Stack>
                </Stack>
            </Stack>}
            {showCard.isShow ? <Button fontSize={18} onPress={() => setShowCard({isShow: false, cardSeri: '', cardCode: ''})}>
                Buy another card
            </Button> : <Button isDisabled={type === ''} fontSize={18} onPress={() => dispatch(setModalState(true))}>
                Top-up card
            </Button>}
            <TransPass/>
        </Stack>
    )
}

export default TopUpCard