import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackNavigationType } from '../../utils/types';
import { account } from 'utils/appwrite';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackNavigationType, 'Splash'>>();
  const [imageLoaded, setImageLoaded] = useState(false);

  const scaleAnim = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslate = useSharedValue(20);

  const checkUser = async () => {
    const user = await account.get();
    return user;
  };

  useEffect(() => {
    if (imageLoaded) {

      scaleAnim.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });

      // Animate text with delay
      textOpacity.value = withDelay(
        400,
        withTiming(1, { duration: 600 })
      );
      textTranslate.value = withDelay(
        400,
        withTiming(0, { duration: 600 })
      );
    }
  }, [imageLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          const user = await checkUser();
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
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslate.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedImageStyle]}>
        <Image
          source={{ uri: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1750523793/playstore_c8viks.jpg" }}
          style={styles.image}
          onLoadEnd={() => setImageLoaded(true)}
        />
      </Animated.View>
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        Quizkr
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Bungee-Regular',
    marginTop: 20,
  },
});
