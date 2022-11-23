import React from 'react'
import { Stack, Text, Image } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import AppIntroSlider from 'react-native-app-intro-slider'
import { turnOffIntro } from '../../redux/reducer/firstLauch'

const slides = [
    {
        key: 'one',
        title: 'Welcome to E-wallet',
        image: require('../../assets/Images/Intro/Intro1.png'),
        description: 'Easy and convenient money management application'
    },
    {
        key: 'two',
        title: 'Easy way to manage your wallet',
        image: require('../../assets/Images/Intro/Intro2.png'),
        description: 'Manage your every penny and transaction with the ease'
    },
    {
        key: 'three',
        title: 'Pay anything',
        image: require('../../assets/Images/Intro/Intro3.png'),
        description: 'Support many types of payments and pay without being complicated'
    },
]

const Intro = () => {

    const { navigate } = useNavigation()
    const dispatch = useDispatch()

    const _renderItem = ({ item }) => {
        return (
            <Stack flex={1} bg='#171928' justifyContent='space-evenly' alignItems='center' p="4" py="6">
                <Image source={item.image} alt='' resizeMode='contain'/>
                <Stack borderRadius='xl' bg='#2e303c' w='100%' py={6} px={4} alignItems='center' 
                    justifyContent='center'> 
                    <Text color='white' fontSize={20} fontWeight='bold' mb={2}>{item.title}</Text>
                    <Text color='white' fontSize={14} textAlign='center'>{item.description}</Text>
                </Stack>
            </Stack>
        )
    }

    const _onDone = () => {
        dispatch(turnOffIntro())
        navigate('Login')
    }

    return (
        <AppIntroSlider
            data={slides}
            renderItem={_renderItem}
            onDone={_onDone}
            showSkipButton
        />
    )
}

export default Intro