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
import Animated, { useAnimatedKeyboard, useAnimatedStyle, KeyboardState, withSpring, withTiming, Easing } from 'react-native-reanimated';

const AuthSignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>()
  const { control, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: zodResolver(signupSchema)
  })
  const [policyAgree, setPoliyAgree] = useState<boolean>(false)
  const keyboard = useAnimatedKeyboard();

  const translateStyle = useAnimatedStyle(() => {
    const isOpen = keyboard.state.value === KeyboardState.OPEN;
    return {
      transform: [
        {
          translateY: withSpring(isOpen ? -keyboard.height.value + 90 : 0, {
            damping : 80,
            stiffness : 900
          }),

        },
      ],
    };
  });

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
      style={{ flex: 1 }}
    >
      <StatusBar translucent backgroundColor={'black'} />
      <SafeAreaView style={{ flex: 1, }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">
            <Animated.View style={[{ flex: 1, paddingHorizontal: 20, gap: 20 }, translateStyle]}>
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

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 8, // Slightly tighter gap
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity onPress={() => setPoliyAgree(prev => !prev)} activeOpacity={0.8}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      borderWidth: policyAgree ? 0 : 1,
                      borderColor: '#dadada',
                      backgroundColor: policyAgree ? Colors.primary : 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 2, // Align better with multi-line text
                    }}
                  >
                    {policyAgree && <EntypoIcon name="check" size={14} color="white" />}
                  </View>
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white', fontSize: 13, lineHeight: 18 }}>
                    By registering, you are agreeing with{' '}
                    <Text style={{ color: Colors.primary, textDecorationLine: 'underline' }}>
                      Terms of Use
                    </Text>{' '}
                    and{' '}
                    <Text style={{ color: Colors.primary, textDecorationLine: 'underline' }}>
                      Privacy Policy
                    </Text>.
                  </Text>
                </View>
              </View>

              <View>
                <Button customBgColor={policyAgree ? '#0D9276' : '#999999'} disabled={!policyAgree} title='Sign Up' onPress={handleSubmit(OnSubmit)} />
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
            </Animated.View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default AuthSignUpScreen;