import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import { HeaderButton } from 'components/HeaderButton';


import TabNavigator from '../tab'
import DrawerContent from 'screens/drawerContent';
import { RootStackNavigationType } from 'utils/types';

type Props = StackScreenProps<RootStackNavigationType, 'App'>;

const Drawer = createDrawerNavigator<{
  Tabs: undefined
}>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
         headerShown : false,
         drawerType : 'slide'
      }}
    >
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  );
}
