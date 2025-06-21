import 'react-native-gesture-handler';
import { useFonts } from 'expo-font'

import RootStack from './navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Bungee-Regular': require('./assets/fonts/Bungee-Regular.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter_18pt-Bold.ttf'),
  })

  if (!fontsLoaded) return null;
  return <RootStack />;
}
