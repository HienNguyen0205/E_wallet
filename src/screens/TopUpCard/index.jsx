import React, { useState, useRef } from 'react'
import { Stack , Text, IconButton, Icon, Button, Image } from 'native-base'
import { StyleSheet, View,  Image as ReactImage } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducer/loading'
import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const operatorName = [
    {
        title: 'Viettel',
        logo: require('../../assets/Images/Logo/Viettel_logo.png'),
    },
    {
        title: 'Mobifone',
        logo: require('../../assets/Images/Logo/Mobifone_logo.png'),
    },
    {
        title: 'Vinaphone',
        logo: require('../../assets/Images/Logo/Vinaphone_logo.png'),
    },
]

const cardTypes = ['$ 10','$ 25', '$ 35', '$ 50', '$75']

const TopUpCard = () => {

    const dispatch = useDispatch()
    const [operator, setOperator] = useState('')
    const [type, setType] = useState('')
    const { navigate } = useNavigation()

    const returnHome = () => {
        dispatch(toggleLoading())
        navigate('Home')
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
                    <Text fontSize={32} fontWeight='bold'>$ 10000000000</Text>
                </Stack>
            </Stack>
            <Stack borderRadius='xl' bg='#2e303c' py={2} px={3} space={3}>
                <Stack space={3}>
                    <Stack>
                        <Text color='white' fontSize={14} mb={2}>Select network operator</Text>
                        <SelectDropdown
                            data={operatorName}
                            onSelect={item => setOperator(item)}
                            buttonStyle={styles.dropdownBtn}
                            renderCustomizedButtonChild={selectedItem => {
                                return (
                                    <View style={styles.dropdownChild}>
                                    {operator ? (
                                        <ReactImage source={selectedItem.logo} style={styles.dropdownBtnImage}/>
                                    ) : (
                                        <MaterialCommunityIcons name="access-point-network" color={'#444'} size={28} style={{marginRight: 4}}/>
                                    )}
                                        <Text color='black' mr={6} fontSize={18}>{selectedItem ? selectedItem.title : 'Select network operator'}</Text>
                                        <FontAwesome name="chevron-down" color={'#444'} size={18} />
                                    </View>
                                )
                            }}
                            dropdownStyle={styles.dropdownBg}
                            rowStyle={{height: 46}}
                            renderCustomizedRowChild={item => {
                                return (
                                    <View style={styles.dropdownRow}>
                                        <Image source={item.logo} style={styles.dropdownBtnImage} alt=''/>
                                        <Text color='black'>{item.title}</Text>
                                    </View>
                                )
                            }}
                        />
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
            </Stack>
            <Button variant={operator && type ? 'solid' : 'outline'} fontSize={18}>
                Top-up card
            </Button>
        </Stack>
    )
}

export default TopUpCard