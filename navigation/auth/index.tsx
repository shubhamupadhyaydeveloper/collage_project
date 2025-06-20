import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackNavigationType } from '../../utils/types'
import AuthLoginScreen from 'screens/signIn'
import AuthSignUpScreen from 'screens/signUp'


const AuthStackNavigation = () => {
  const AuthStack = createNativeStackNavigator<AuthStackNavigationType>()
  return (
    <AuthStack.Navigator
      screenOptions={{ 
        headerShown: false,
        animation: 'ios_from_right',
      }}
      initialRouteName='Login'
    >
      <AuthStack.Screen
        name='Login'
        component={AuthLoginScreen}
      />

      <AuthStack.Screen
        name='Register'
        component={AuthSignUpScreen}
      />

    </AuthStack.Navigator>
  )
}

export default AuthStackNavigation;

const styles = StyleSheet.create({})