import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GoBack from 'components/GoBack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from 'components/CustomTextInput';
import { Button } from 'components/Button';
import { account } from 'utils/appwrite';
import { toast } from 'burnt'

const ForgetPasswordScreen = () => {
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const { control, handleSubmit, formState: { isLoading }, reset } = useForm({

    });

    const onSubmit = async (data: FieldValues) => {
        try {

            await account.updatePassword(data.newPassword, data.oldPassword); // correct order: newPassword, oldPassword

            toast({
                title: 'Password Reset Successfully',

            });

            navigation.goBack();
        } catch (error: any) {
            console.error('Password update failed:', error);

            toast({
                title: 'Failed to reset password',
                message: error?.message || 'Something went wrong',
                preset: 'error',
            });
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} backgroundColor={'#222'} />
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#222', paddingTop: insets.top + 15, paddingBottom: 10 }}>
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                    <FeatherIcon name='arrow-left' color={'white'} size={24} />
                </TouchableOpacity>
                <View style={{ width: "75%" }}>
                    <Text style={{ fontSize: 20, color: 'white', fontFamily: "Nunito-Bold", textAlign: 'center' }}>Forget Password</Text>
                </View>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <View style={{ gap: 10, }}>
                    <CustomInput control={control} name="oldPassword" placeholder="Enter Old Password" protected={true} />
                    <CustomInput control={control} name="newPassword" placeholder="Enter New Password" protected={true} />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20, paddingBottom: 20 }}>
                <Button title='Reset Password' onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}

export default ForgetPasswordScreen;

const styles = StyleSheet.create({})