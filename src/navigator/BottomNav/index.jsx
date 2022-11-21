import React from 'react'
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { CurvedBottomBar } from 'react-native-curved-bottom-bar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../../screens/Home'
import History from '../../screens/History'
import Statistic from '../../screens/Statistic'
import Setting from '../../screens/Setting'

export const BottomNav = () => {

  const styles = StyleSheet.create({
    btnCircle: {
      width: 60,
      height: 60,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2e303c',
      padding: 10,
      bottom: 30,
    }
  })

  const _renderIcon = (routeName, selectedTab) => {
    let icon = ''

    switch (routeName) {
      case 'Home':
        icon = 'ios-home-outline'
        break
      case 'History':
        icon = 'ios-newspaper-outline'
        break
      case 'Statistic':
        icon = 'ios-bar-chart-outline'
        break
      case 'Setting':
        icon = 'person-outline'
        break
    }

    return (
      <Ionicons
        name={icon}
        size={24}
        color={routeName === selectedTab ? '#f66d97' : '#4b4b53'}
      />
    )
  }

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <CurvedBottomBar.Navigator
        type='DOWN'
        borderTopLeftRight
        height={55}
        circleWidth={55}
        bgColor="#2e303c"
        initialRouteName="Home"
        renderCircle={() => (
          <View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={() => Alert.alert('This feather will available soon')}>
              <Ionicons name={'qr-code-outline'} color="#ffffff" size={24} />
            </TouchableOpacity>
          </View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          options={{ headerShown: false }}
          name="Home"
          position="LEFT"
          component={Home}
        />
        <CurvedBottomBar.Screen
          options={{ headerShown: false }}
          name="History"
          position="LEFT"
          component={History}
        />
        <CurvedBottomBar.Screen
          options={{ headerShown: false }}
          name="Statistic"
          position="RIGHT"
          component={Statistic}
        />
        <CurvedBottomBar.Screen
          options={{ headerShown: false }}
          name="Setting"
          position="RIGHT"
          component={Setting}
        />
      </CurvedBottomBar.Navigator>
    </View>
  )
}