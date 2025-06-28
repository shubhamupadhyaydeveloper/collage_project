import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './drawer';
import { ScrollContextProvider } from 'context/scrollContext';
import { RootStackNavigationType } from 'utils/types';
import AuthStackNavigation from './auth';
import SplashScreen from 'screens/splash';
import { navigate, navigationRef } from 'utils/navigation';
import { useEffect, useState } from 'react';
import DeepLinkingPage from 'screens/deepLink';
import * as Linking from 'expo-linking'


const Stack = createNativeStackNavigator<RootStackNavigationType>();

export const linking = {
  prefixes: [Linking.createURL('/')], // Handles expo://yourapp/
  config: {
    screens: {
      Splash: 'splash',
      App: {
        screens: {
          Home: 'home',
          Profile: 'profile/:username',
        },
      },
      Auth: 'auth',
    },
  },
};

export default function RootStack() {
  const [initialRoute, setInitialRoute] = useState<'Splash' | 'DeepLinking' | null>(null)
  const [initialParams, setInitialParams] = useState<any>(null);

  useEffect(() => {
    const checkInitialUrl = async () => {
      const url = await Linking.getInitialURL();

      if (url) {
        const route = url.replace(/.*?:\/\//g, '');
        const routeName = route.split('/')[0];
        const param = route.split('/')[1];

        if (routeName === 'deepLinking') {
          setInitialRoute('DeepLinking');
          setInitialParams({ id: param || '1223' });
          return;
        }
      }

      setInitialRoute('Splash');
    }

    checkInitialUrl()
  }, [])

  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'black',

    },
  };

  if (!initialRoute) {
    // Show a loading screen or nothing until we determine the initial route
    return null;
  }

  return (
    <ScrollContextProvider>
      <NavigationContainer ref={navigationRef} theme={myTheme}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'black'
          },
          animation: 'ios_from_right'
        }}
          initialRouteName={initialRoute}
        >
          <Stack.Screen
            name="App"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Auth'
            component={AuthStackNavigation}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Splash'
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='DeepLinking'
            component={DeepLinkingPage}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ScrollContextProvider>
  );
}
