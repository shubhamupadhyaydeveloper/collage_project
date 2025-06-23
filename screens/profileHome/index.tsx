import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileNavigationType } from 'utils/types';
import ProfilePage from 'screens/profile';
import ForgetPasswordScreen from 'screens/forgetPassword';

const ProfileStack = () => {
    const Stack = createNativeStackNavigator<ProfileNavigationType>();
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
                animation: 'ios_from_right'
            }}
        >
            <Stack.Screen
                name='Profile'
                component={ProfilePage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='ForgetPassword'
                component={ForgetPasswordScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack

const styles = StyleSheet.create({})