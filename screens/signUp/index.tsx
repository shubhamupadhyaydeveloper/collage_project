import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';

import AntIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { Colors, signupImage } from '../../utils/constants';
import CustomInput from '../../components/CustomTextInput';
import { AuthStackNavigationType } from '../../utils/types';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../utils/schema';
import { Button } from 'components/Button';
import { account, ID } from 'utils/appwrite';

const AuthSignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>()
  const { control, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: zodResolver(signupSchema)
  })
  const [policyAgree, setPoliyAgree] = useState<boolean>(false)

  const OnSubmit = async (value: FieldValues) => {
    try {
      console.log('this is value', value)
      const user = await account.create(ID.unique(), value.email, value.password, value.name)

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'App' }],
        })
      );

    } catch (error: any) {
      return { success: false, message: error.message || 'Signup failed' };
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'black'} />
      <SafeAreaView style={{ flex: 1, }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, gap: 20 }}
            keyboardShouldPersistTaps="handled">

            <Image source={signupImage} style={{ width: "100%", height: 250 }} />

            <View>
              <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 18 }}>Create account!</Text>
              <Text style={{ color: '#999999', fontWeight: 'bold', fontSize: 18 }}>Sign up to get started.</Text>
            </View>
            <View style={{ gap: 5 }}>
              <CustomInput control={control} name='name' placeholder='Name' />
              <CustomInput control={control} name='email' placeholder='Email Address' />
              <CustomInput control={control} name='password' placeholder='Password' protected={true} />
              <CustomInput control={control} name='confirmPassword' placeholder='Confirm Password' protected={true} />
            </View>


            <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setPoliyAgree(prev => !prev)}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 8,
                    borderWidth: policyAgree ? 0 : 1,
                    borderColor: '#dadada',
                    backgroundColor: policyAgree ? Colors.primary : 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {policyAgree ? (
                    <EntypoIcon name="check" size={16} color="white" />
                  ) : null}
                </View>
              </TouchableOpacity>

              <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  By registering, you are agreeing with
                  <Text style={{ color: Colors.primary, textDecorationLine: 'underline' }}> Terms of Use</Text>
                  {' '}and
                  <Text style={{ color: Colors.primary, textDecorationLine: 'underline' }}> Privacy Policy</Text>.
                </Text>
              </View>

            </View>
            <View>
              <Button title='Sign Up' onPress={handleSubmit(OnSubmit)} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: Colors.primary, textDecorationLine: 'underline' }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default AuthSignUpScreen;