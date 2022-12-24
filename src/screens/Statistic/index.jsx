import React, { useState , useEffect} from 'react'
import { Stack, Box, Button, Text, Icon } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit'
import { useSelector } from 'react-redux'
import { baseURL } from '../../api'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

const selectItems = ['Daily','Monthly']

const chartConfig = {
    backgroundGradientFrom: "#2e303c",
    backgroundGradientTo: "#2e303c",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(246, 109, 151, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "white"
    }
}

var pieData = [
    {
        name: "% Deposit",
        percent: 0,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
    {
        name: "% Withdraw",
        percent: 0,
        color: "blue",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
    {
        name: "% Transfer",
        percent: 0,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
    {
        name: "% Top-up card",
        percent: 0,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
]

const Statistic = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    const [chartType, setChartType] = useState('Daily')
    const { email, balance } = useSelector(state => state.userInfo.value)
    const [dataLine, setDataLine] = useState({income: [0,0,0,0,0], expend: [0,0,0,0,0]})

    const getFiveDays = () => {
        const date = new Date()
        date.setDate(date.getDate() - 5)
        const fiveDays = []
        for(let i = 0; i < 5;i++){
            date.setDate(date.getDate() + 1)
            fiveDays.push(date.getDate()+'/'+(date.getMonth() + 1))
        }
        return fiveDays
    }

    const getFiveMonths = () => {
        const month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"]
        const date = new Date()
        date.setMonth(date.getMonth() - 5)
        const fiveMonths = []
        for(let i = 0; i < 5;i++){
            date.setMonth(date.getMonth() + 1)
            fiveMonths.push(month[date.getMonth()])
        }
        return fiveMonths
    }

    useEffect(() => {
        axios({
            method: 'post',
            url: `http://${baseURL}:80/E_Wallet_API/api/user/getchart.php`,
            data: {
                email: email,
                datetype: chartType
            }
        })
        .then(response => {
            if(response.data.code === 0){
                const data = response.data.data.reverse()
                const lastedData = data[data.length - 1]
                const total = lastedData.deposit + lastedData.withdraw + lastedData.transferIn + lastedData.transferOut + lastedData.topupcard
                let pie = [0,0,0,0,0]
                let sum = 0
                if(total !== 0){
                    pie = [lastedData.deposit, lastedData.withdraw, (lastedData.transferIn + lastedData.transferOut), lastedData.topupcard]
                    pieData.map((item, index) => {
                        if(index === pieData.length - 1){
                            item.percent = 100 - sum
                        }else{
                            item.percent = Math.round(pie[index]/total*100)
                            sum += item.percent
                        }
                    })
                }
                let income = []
                let expend = []
                if(activeIndex === 0){
                    data.forEach(item => {
                        income.push(item.deposit + item.transferIn)
                    })
                    setDataLine({...dataLine, income: income})
                }else{
                    data.forEach(item => {
                        expend.push(item.withdraw + item.transferOut + item.topupcard)
                    })
                    setDataLine({...dataLine, expend: expend})
                }
            }
        })
    }, [email, chartType, activeIndex, balance])

    const styles = StyleSheet.create({
        dropdownBtn: {
            maxWidth: 150,
            height: 46,
            backgroundColor: '#2e303c',
            borderRadius: 8,
        },
        dropdownText: {
            color: 'white',
        },
        dropdownBg: {
            backgroundColor: '#2e303c',
            borderRadius: 8,
        },
        dropdownRow: {
            backgroundColor: '#2e303c',
            borderBottomColor: 'black'
        }
    })

    return (
        <Box bg='#171928' flex={1} p="4" py="6" mb='3'>
            <Stack direction='row' p={3} bg='#2e303c' borderRadius='2xl' my={3} justifyContent='space-around'>
                <Button onPress={() => setActiveIndex(0)} w='48%' bg={activeIndex === 0 ? '#f66d97' : '#2e303c'}>Income</Button>
                <Button onPress={() => setActiveIndex(1)} w='48%' bg={activeIndex === 1 ? '#f66d97' : '#2e303c'}>Expend</Button>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
                <Text color='white' fontSize={28} fontWeight='bold'>$ {balance}</Text>
                <SelectDropdown  data={selectItems} onSelect={item => {setChartType(item)}}
                    buttonTextAfterSelection={selectedItem => selectedItem} buttonStyle={styles.dropdownBtn}
                    rowTextForSelection={item => item} defaultValue='Daily' buttonTextStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdownBg} rowStyle={styles.dropdownRow} rowTextStyle={styles.dropdownText}
                    renderDropdownIcon={isOpened => {
                        return <Icon as={FontAwesome} name={isOpened ? 'chevron-up' : 'chevron-down'} color='white' mr={2}/>
                    }}
                    dropdownIconPosition='right'
                />
            </Stack>
            <Stack space={3}>
                <LineChart
                    data={{
                        labels: chartType === 'Daily' ? getFiveDays() : getFiveMonths(),
                        datasets: [
                            {
                                data: activeIndex === 0 ? dataLine.income : dataLine.expend
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width -30}
                    height={Dimensions.get('window').height - 520}
                    yAxisLabel="$"
                    yAxisInterval={1}
                    withVerticalLines={false}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        borderRadius: 12,
                    }}
                />
                <PieChart
                    data={pieData}
                    width={Dimensions.get("window").width -30}
                    height={Dimensions.get('window').height - 520}
                    chartConfig={chartConfig}
                    accessor={"percent"}
                    backgroundColor={"#2e303c"}
                    center={[10, 0]}
                    absolute
                    style={{
                        borderRadius: 12,
                    }}
                />
            </Stack>
        </Box>
    )
}

export default Statistic