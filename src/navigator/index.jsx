import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomNav } from './BottomNav'
import { useSelector } from 'react-redux'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Deposit from '../screens/Deposit'
import AddPayment from '../screens/AddPayment'
import Withdraw from '../screens/Withdraw'
import Transfer from '../screens/Transfer'
import TopUpCard from '../screens/TopUpCard'
import Intro from '../screens/Intro'
import UserInfo from '../screens/UserInfo'
import ChangePass from '../screens/ChangePass'
import OTP from '../screens/OTP'
import SetTransPass from '../screens/SetTransPass'
import ForgetPass from '../screens/ForgetPass'
import ChangeTransPass from '../screens/ChangeTransPass'
import EditUserInfo from '../screens/EditUserInfo'
import QRCamera from '../screens/QRCamera'

const Stack = createNativeStackNavigator()

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

const opt = {
  headerShown: false,
  transitionSpec: {
    open: config,
    close: config,
  },
}

function AppNavigator() {

  const isFirstLauch = useSelector(state => state.firstLauch.value)
  const isSignIn = useSelector(state => state.isSignIn.value)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        {isSignIn ? (
          <>
            <Stack.Screen name="BottomNav" component={BottomNav} options={opt} />
            <Stack.Screen name="Deposit" component={Deposit} options={opt} />
            <Stack.Screen name="AddPayment" component={AddPayment} options={opt} />
            <Stack.Screen name="Withdraw" component={Withdraw} options={opt} />
            <Stack.Screen name="Transfer" component={Transfer} options={opt} />
            <Stack.Screen name="TopUpCard" component={TopUpCard} options={opt} />
            <Stack.Screen name="UserInfo" component={UserInfo} options={opt} />
            <Stack.Screen name="ChangePass" component={ChangePass} options={opt} />
            <Stack.Screen name="ChangeTransPass" component={ChangeTransPass} options={opt} />
            <Stack.Screen name="EditUserInfo" component={EditUserInfo} options={opt} />
            <Stack.Screen name="QRCamera" component={QRCamera} options={opt} />
          </>
        ) : (
          <>
            {isFirstLauch && <Stack.Screen name="Intro" component={Intro} options={opt} />}
            <Stack.Screen name="Login" component={Login} options={opt} />
            <Stack.Screen name="Register" component={Register} options={opt} />
            <Stack.Screen name="OTP" component={OTP} options={opt} />
            <Stack.Screen name="SetTransPass" component={SetTransPass} options={opt} />
            <Stack.Screen name="ForgetPass" component={ForgetPass} options={opt} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator