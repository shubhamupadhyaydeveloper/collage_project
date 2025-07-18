import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationType } from 'utils/types';
import { Colors } from 'utils/constants';
import { horizontalScale, iosDevice, verticalScale } from 'utils/responsive';
import GenerateScreen from 'screens/generate';
import HomeScreen from 'screens/home';
import BrainIcon from '../../assets/raw-svg/brain.svg'
import SavedIcon from '../../assets/raw-svg/star.svg'
import HomeFillIcon from '../../assets/raw-svg/home.svg'
import StarIcon from '../../assets/raw-svg/star-solid.svg'
import { Pressable, StyleSheet } from 'react-native';
import ProfileStack from 'screens/profileHome';
import SavedScreen from 'screens/saved';
import { moderateScale } from 'react-native-size-matters';
import { BlurView } from 'expo-blur'

const Tab = createBottomTabNavigator<BottomTabNavigationType>();
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
                tabBarInactiveTintColor: '#999999',
                tabBarActiveTintColor: '#ffffff',
                tabBarStyle: {
                    ...StyleSheet.absoluteFillObject,
                    // height: iosDevice ? verticalScale(80) : verticalScale(95),
                    backgroundColor: Colors.lightText,
                    paddingTop: verticalScale(10),
                    borderColor: "#dadada",
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    position: 'relative'
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: 'Nunito-Medium',
                    // marginTop: verticalScale(2),
                },
                tabBarPosition: "bottom",


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
                        <HomeFillIcon width={moderateScale(28)} height={moderateScale(28)} fill={color} color={"red"} />
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
                        <BrainIcon width={moderateScale(28)} height={moderateScale(28)} fill={color} />
                    )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileStack}
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),
                    tabBarIcon: ({ focused, color }) => (
                        <SavedIcon width={moderateScale(25)} height={moderateScale(25)} fill={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Saved'
                component={SavedScreen}
                options={{
                    headerShown: false,
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),
                    tabBarIcon: ({ focused, color }) => (
                        <StarIcon width={moderateScale(28)} height={moderateScale(28)} fill={color} />
                    )
                }}
            />



        </Tab.Navigator>
    );
}
