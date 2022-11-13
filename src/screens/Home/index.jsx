import React from "react"
import { Box, Text, Stack, ZStack, Avatar, Image, Divider } from "native-base"
import { Dimensions } from "react-native"
import Carousel from 'react-native-reanimated-carousel'
import BtnAndText from "../../components/BtnAndText"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

const carouselSrc = [
    require('../../assets/Images/Banner/ads.png'),
    require('../../assets/Images/Banner/ads1.png'),
    require('../../assets/Images/Banner/ads2.png'),
    require('../../assets/Images/Banner/ads3.png'),
]

const Home = () => {

    return (
        <Stack flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Stack>
                    <Text fontSize={18} color='#9f9fa5'>Welcome back</Text>
                    <Text fontSize={24} fontWeight='bold' color='#ffffff'>Wjbu rách</Text>
                </Stack>
                <Avatar size='lg'
                    source={require('../../assets/Images/User_Image/User.png')}
                    bg='#2e303c'
                />
            </Stack>
            <Box height={300}>
                <ZStack>
                    <Box height={300} alignItems='center'>
                        <Image source={require('../../assets/Images/UI_Bg/card.png')} alt='Card' resizeMode="contain" flex={1}/>
                    </Box>
                    <Text mt='20' ml='8' color='#ffffff' fontSize={24} fontWeight='bold'>Wjbu rách</Text>
                    <Box mt='40' ml='8'>
                        <Text color='#ffffff' fontSize={18}>Available balance</Text>
                        <Text mt='2' color='#ffffff' fontSize={32} fontWeight='bold'>$10000000000</Text>
                    </Box>
                </ZStack>
            </Box>
            <Stack direction='row' justifyContent='space-around'>
                <BtnAndText iconType={MaterialCommunityIcons} name='tray-arrow-down'
                    color='#20a5f2' bg='#17344f' text='Deposit' screen='Deposit'/>
                <BtnAndText iconType={Feather} name='dollar-sign'
                    color='#ee3356' bg='#411c2d' text='Withdraw' screen='Deposit'/>
                <BtnAndText iconType={Feather} name='send'
                    color='#1aa270' bg='#163436' text='Transfer' screen='Deposit'/>
                <BtnAndText iconType={MaterialCommunityIcons} name='cellphone-check'
                    color='#ff8d3a' bg='#422d28' text='Top-up card' screen='Deposit'/>
            </Stack>
            <Stack alignItems={'center'} my='2'>
                <Divider thickness={1} bg='#f66d97'/>
                <Text color='#f66d97' fontSize={16} fontWeight='bold'>E-wallet News</Text>
                <Divider thickness={1} bg='#f66d97'/>
            </Stack>
            <Box flex={1}>
                <Carousel
                    width={Dimensions.get('window').width - 50}
                    height={Dimensions.get('window').width / 2 - 48}
                    autoPlay={true}
                    data={carouselSrc}
                    mode='parallax'
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 48,
                    }}
                    scrollAnimationDuration={4000}
                    renderItem={({ item }) => (
                        <Box flex={1}>
                            <Image source={item} alt='Ads' resizeMode="stretch" flex={1}
                                borderRadius='2xl'/>
                        </Box>
                    )}
                />
            </Box>
        </Stack>
    )
}

export default Home