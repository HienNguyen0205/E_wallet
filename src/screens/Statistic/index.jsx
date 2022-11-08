import React, {useState} from 'react'
import { Stack, Box, Button, Text, Icon } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const selectItems = ['Daily','Weekly','Monthly']

const data = [
    {
        name: "% Deposit",
        percent: 25,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
    {
        name: "% Withdraw",
        percent: 25,
        color: "blue",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
    {
        name: "% Transfer",
        percent: 25,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
    {
        name: "% Top-up card",
        percent: 25,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
]

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

const Statistic = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    const [chartType, setChartType] = useState('Daily')

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
                <Text color='white' fontSize={28} fontWeight='bold'>$ 100000000</Text>
                <SelectDropdown  data={selectItems} onSelect={item => {setChartType(item)}}
                    buttonTextAfterSelection={selectedItem => selectedItem} buttonStyle={styles.dropdownBtn}
                    rowTextForSelection={item => item} defaultValue='Daily' buttonTextStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdownBg} rowStyle={styles.dropdownRow} rowTextStyle={styles.dropdownText}
                    renderDropdownIcon={isOpened => {
                        return <Icon as={FontAwesome} name={isOpened ? 'chevron-up' : 'chevron-down'} color='white' mr={2}/>
                    }}
                    dropdownIconPosition='right'/>
            </Stack>
            <Stack space={3}>
                <LineChart
                    data={{
                        labels: ["1/11", "2/11", "3/11", "4/11", "5/11", "6/11"],
                        datasets: [
                            {
                                data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                ]
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
                    data={data}
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