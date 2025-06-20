import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './drawer';
import { ScrollContextProvider } from 'context/scrollContext';
import { RootStackNavigationType } from 'utils/types';
import AuthStackNavigation from './auth';
import SplashScreen from 'screens/splash';
import { navigationRef } from 'utils/navigation';


const Stack = createNativeStackNavigator<RootStackNavigationType>();

export default function RootStack() {
  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'black',

    },
  };

  return (
    <ScrollContextProvider>
      <NavigationContainer ref={navigationRef} theme={myTheme}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'black'
          }
        }}
          initialRouteName="Splash"

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

        </Stack.Navigator>
      </NavigationContainer>
    </ScrollContextProvider>
  );
}
