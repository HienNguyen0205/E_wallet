import React from 'react'
import { ScrollView, Stack, Box, Text, Icon } from 'native-base'
import TransHis from '../../components/TransHistory'
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
    {
        imgSrc: require('../../assets/Images/spotify_logo.png'),
        label: 'Spotify Subcription',
        dateTime: '12:01 am   21 Jun 2021',
        amount: -100,
    },
]

const History = () => {
    return (
        <ScrollView w='100%' p="4" py="6" bg='#171928'>
            <Box borderRadius='2xl' p={3} bg='#2e303c'>
                <Box mb={4} alignItems='center'>
                    <Text color='#9f9fa5' fontSize={18} mb={3}>My balance</Text>
                    <Text color='white' fontSize={32}>$ 10000000000</Text>
                </Box>
                <Stack direction='row' justifyContent='space-around'>
                    <Box w='46%' borderRadius='2xl' p={3} bg='#163436'>
                        <Stack direction='row'>
                            <Box w={50} h={50} bg='#1aa270' justifyContent='center' alignItems='center' mr={3} borderRadius='2xl'>
                                <Icon as={Feather} name='arrow-up-right' size={23} color='white'/>
                            </Box>
                            <Stack justifyContent='space-between'>
                                <Text color='#9f9fa5'>Income</Text>
                                <Text color='white' fontSize={18}>$ 1000</Text>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box w='46%' borderRadius='2xl' p={3} bg='#411c2d'>
                        <Stack direction='row'>
                            <Box w={50} h={50} bg='#ee3356' justifyContent='center' alignItems='center' mr={3} borderRadius='2xl'>
                                <Icon as={Feather} name='arrow-down-right' size={23} color='white'/>
                            </Box>
                            <Stack justifyContent='space-between'>
                                <Text color='#9f9fa5'>Outcome</Text>
                                <Text color='white' fontSize={18}>$ 1000</Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Stack direction='row' mt={5} justifyContent='space-between'>
                <Text color='white' fontSize={18} fontWeight='bold'>Today</Text>
                <Text color='#9f9fa5'>(3 Transaction)</Text>
            </Stack>
            <Stack space={3} mt={5}>
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

export default History