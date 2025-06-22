import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react'
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackNavigationType, RootStackNavigationType } from '../../utils/types'
import { account } from 'utils/appwrite';
// import { mmkvStorage } from 'utils/mmkvstore';



const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackNavigationType, 'Splash'>>();

  const checkUser = async () => {
    const user = await account.get()
    return user
  }

  // const isLogin = mmkvStorage.getItem('isLogin');

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          const user = await checkUser();
          console.log('this is user',user)
          if (user) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'App' }],
              })
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              })
            );
          }
        } catch (error) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            })
          );
        }
      })();
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image source={{uri : "https://res.cloudinary.com/dlv1uvt41/image/upload/v1750523793/playstore_c8viks.jpg"}} style={{ width: 300, height: 300 }} />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: "bold", textAlign: 'center',fontFamily : 'Bungee-Regular' }}>Quizkr</Text>
      </View>
    </View>
  );
};

export default SplashScreen;