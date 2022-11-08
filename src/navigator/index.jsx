import React from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomNav } from './BottomNav'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Deposit from '../screens/Deposit'

const Stack = createNativeStackNavigator()
  
function AppNavigator() {

    const navigationRef = useNavigationContainerRef()

    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name="Deposit" component={Deposit} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default AppNavigator