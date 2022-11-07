import React from "react"
import { Box, Text, Stack, ZStack, Avatar, Image, ScrollView, Divider } from "native-base"
import BtnAndText from "../../components/BtnAndText"
import TransHis from "../../components/TransHistory"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

const data = [
    {
        imgSrc: require('../../assets/Images/spotify_logo.png'),
        label: 'Spotify Subcription',
        dateTime: '12:01 am   21 Jun 2021',
        amount: 100,
    },
    {
        imgSrc: require('../../assets/Images/spotify_logo.png'),
        label: 'Spotify Subcription',
        dateTime: '12:01 am   21 Jun 2021',
        amount: -100,
    },
]

const Home = () => {

    return (
        <ScrollView w='100%' h='full' p="4" py="6" bg='#171928'>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Stack>
                    <Text fontSize={18} color='#9f9fa5'>Welcome back</Text>
                    <Text fontSize={24} fontWeight='bold' color='#ffffff'>Wjbu rách</Text>
                </Stack>
                <Avatar size='lg'
                    source={require('../../assets/Images/User.png')}
                    bg='#2e303c'
                />
            </Stack>
            <Box height={300}>
                <ZStack>
                    <Box height={300} alignItems='center'>
                        <Image source={require('../../assets/Images/card.png')} alt='Card' resizeMode="contain" flex={1}/>
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
                    color='#20a5f2' bg='#17344f' text='Deposit'/>
                <BtnAndText iconType={Feather} name='dollar-sign'
                    color='#ee3356' bg='#411c2d' text='Withdraw'/>
                <BtnAndText iconType={Feather} name='send'
                    color='#1aa270' bg='#163436' text='Transfer'/>
                <BtnAndText iconType={MaterialCommunityIcons} name='cellphone-check'
                    color='#ff8d3a' bg='#422d28' text='Top-up card'/>
            </Stack>
            <Stack alignItems={'center'} my='6'>
                <Divider thickness={2} bg='#f66d97'/>
                <Text color='#f66d97' fontSize={22} fontWeight='bold'>Recent Transaction</Text>
                <Divider thickness={2} bg='#f66d97'/>
            </Stack>
            <Stack space={5} mb='32'>
                {data?.map((item, index) =>
                    <TransHis key={index} imgSrc={item.imgSrc}
                        label={item.label} dateTime={item.dateTime}
                        amount={item.amount}
                    />
                )}
            </Stack>
        </ScrollView>
    )
}

export default Home