import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationType } from 'utils/types';
import { Colors } from 'utils/constants';
import { horizontalScale, iosDevice, verticalScale } from 'utils/responsive';
import GenerateScreen from 'screens/generate';
import HomeScreen from 'screens/home';
import ProfilePage from 'screens/profile';
import CustomTabBar from './components/CustomTabBar';
const Tab = createBottomTabNavigator<BottomTabNavigationType>();
import BrainIcon from '../../assets/raw-svg/brain.svg'
import SavedIcon from '../../assets/raw-svg/star.svg'
import HomeFillIcon from '../../assets/raw-svg/home.svg'
import { Pressable } from 'react-native';

export default function TabLayout() {
    function CustomTabBarButton({ children, onPress, onLayout }: BottomTabBarButtonProps) {
        return (
            <Pressable
                onLayout={onLayout}
                onPress={onPress}
                android_ripple={null}
                style={({ pressed }) => ({
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ scale: pressed ? 0.9 : 1 }],
                    // opacity: pressed ? 1 : 1,
                })}
            >
                {children}
            </Pressable>
        );
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                lazy: true,
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: '#ffffff',
                tabBarActiveTintColor: '#16C47F',
                tabBarStyle: {
                    height: iosDevice ? verticalScale(80) : verticalScale(95),
                    backgroundColor: Colors.lightText,
                    paddingTop: verticalScale(15),
                    borderColor: "#dadada",
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    paddingBottom: verticalScale(5),
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: 'Nunito-Medium',
                    // marginTop: verticalScale(2),
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),
                    tabBarIcon: ({ focused, color }) => (
                        <HomeFillIcon width={horizontalScale(28)} height={verticalScale(28)} fill={color} color={"red"} />
                    )
                }}
            />
            <Tab.Screen
                name="Generate"
                component={GenerateScreen}
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),
                    tabBarIcon: ({ focused, color }) => (
                        <BrainIcon width={horizontalScale(28)} height={verticalScale(28)} fill={color} />
                    )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfilePage}
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),
                    tabBarIcon: ({ focused, color }) => (
                        <SavedIcon width={horizontalScale(25)} height={verticalScale(25)} fill={color} />
                    )
                }}
            />

        </Tab.Navigator>
    );
}
