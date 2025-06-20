import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';

import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';

import { FieldValues, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthStackNavigationType, RootStackNavigationType } from '../../utils/types';
import { loginSchema } from '../../utils/schema';
import { Colors, loginImage } from '../../utils/constants';
import CustomInput from '../../components/CustomTextInput';
import { Button } from 'components/Button';
import { account } from 'utils/appwrite';



const AuthLoginScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthStackNavigationType, 'Login'>>();

    const { control, handleSubmit, formState: { isLoading }, reset } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (value: FieldValues) => {
        try {
            console.log('this is value', value);
            
            const session = await account.createEmailPasswordSession(value.email, value.password);

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'App' }],
                })
            );
        } catch (err: any) {
            if (err.message.includes('Rate limit')) {
                Alert.alert('Too many requests', 'Please wait a few minutes and try again.');
            } else {
                Alert.alert('Login Failed', err.message ?? 'Something went wrong');
            }
        }

    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={'black'} />
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, gap: 20 }}
                        keyboardShouldPersistTaps="handled">
                        <Image source={loginImage} style={{ width: "100%", height: 250 }} />

                        <View>
                            <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 18 }}>Welcome back!</Text>
                            <Text style={{ color: '#999999', fontWeight: 'bold', fontSize: 18 }}>Enter your credentials to continue.</Text>
                        </View>

                        <View style={{ gap: 10 }}>
                            <CustomInput control={control} name="email" placeholder="Email Address" />
                            <CustomInput control={control} name="password" placeholder="Password" protected={true} />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20, gap: 10 }}>
                            {/* <CustomButton isSubmitting={isLoading} text="Log in" onPress={handleSubmit(onSubmit)} /> */}
                            <Button title='Login' onPress={handleSubmit(onSubmit)} />

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={{ color: Colors.primary, textDecorationLine: 'underline' }}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </ScrollView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default AuthLoginScreen;

const styles = StyleSheet.create({});