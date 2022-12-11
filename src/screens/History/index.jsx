import React, { useState, useEffect } from 'react'
import { ScrollView, Stack, Box, Text, Icon } from 'native-base'
import { useSelector } from 'react-redux'
import { baseURL } from '../../api'
import TransHis from '../../components/TransHistory'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'

const History = () => {

    const { email, balance } = useSelector(state => state.userInfo.value)
    const [data, setData] = useState([])
    const [balanceInfo, setBalanceInfo] = useState({})

    useEffect(() => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/gettrans.php`,
            data: {
                email: email
            }
        })
        .then(response => {
            if(response.data.code === 0){
                setData(response.data.data.reverse())
            }
        })
    }, [balance, email])

    useEffect(() => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/getchart.php`,
            data: {
                email: email,
                datetype: 'Daily'
            }
        })
        .then(response => {
            if(response.data.code === 0){
                const { deposit, withdraw, transferIn, transferOut, topupcard } = response.data.data[0]
                setBalanceInfo({
                    income: deposit + transferIn,
                    expend: withdraw + transferOut + topupcard
                })
            }
        })
    }, [email, balance])

    return (
        <Stack flex={1} w='100%' p="4" py="6" bg='#171928'>
            <Box borderRadius='2xl' p={3} bg='#2e303c'>
                <Box mb={4} alignItems='center'>
                    <Text color='#9f9fa5' fontSize={18} mb={3}>My balance</Text>
                    <Text color='white' fontSize={32}>$ {balance}</Text>
                </Box>
                <Stack direction='row' justifyContent='space-around'>
                    <Box w='46%' borderRadius='2xl' p={3} bg='#163436'>
                        <Stack direction='row'>
                            <Box w={50} h={50} bg='#1aa270' justifyContent='center' alignItems='center' mr={3} borderRadius='2xl'>
                                <Icon as={Feather} name='arrow-up-right' size={23} color='white'/>
                            </Box>
                            <Stack justifyContent='space-between'>
                                <Text color='#9f9fa5'>Income</Text>
                                <Text color='white' fontSize={18}>$ {balanceInfo.income}</Text>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box w='46%' borderRadius='2xl' p={3} bg='#411c2d'>
                        <Stack direction='row'>
                            <Box w={50} h={50} bg='#ee3356' justifyContent='center' alignItems='center' mr={3} borderRadius='2xl'>
                                <Icon as={Feather} name='arrow-down-right' size={23} color='white'/>
                            </Box>
                            <Stack justifyContent='space-between'>
                                <Text color='#9f9fa5'>Expend</Text>
                                <Text color='white' fontSize={18}>$ {balanceInfo.expend}</Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Stack style={{height: 416}} mt={3}>
                <ScrollView>
                    {data?.map((item, index) => {

                        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'].reverse()
                        const displayMonth = months[index]

                        return (
                            <Stack key={index}>
                                {item.length > 0 && index === 0 && <Stack direction='row' mt={5} justifyContent='space-between' alignItems='center'>
                                    <Text color='white' fontSize={20} fontWeight='bold'>{displayMonth}</Text>
                                    <Text color='#9f9fa5'>({item.length} Transaction)</Text>
                                </Stack>}
                                {item.length > 0 && item.map((transaction, index) => 
                                    <TransHis key={index} transferType={transaction.approval}
                                        label={transaction.transtype} 
                                        dateTime={transaction.datetrans}
                                        amount={transaction.amount}
                                    />
                                )}
                            </Stack>
                        )
                    })}
                </ScrollView>
            </Stack>
        </Stack>
    )
}

export default History