import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { BottomTabBarButtonProps, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useScrollContext } from '../../../context/scrollContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Easing, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { horizontalScale, verticalScale } from 'utils/responsive';

import BrainIcon from '../../../assets/raw-svg/brain.svg'
import SavedIcon from '../../../assets/raw-svg/star.svg'
import HomeFillIcon from '../../../assets/raw-svg/home.svg'


const CustomTabBar = ({ state, navigation, descriptors, }: BottomTabBarProps) => {
    const { resetScroll, scrollY } = useScrollContext()
    const lastScrollDirection = useSharedValue<'up' | 'down' | null>(null)
    const lastScrollY = useSharedValue(0)

    // useAnimatedReaction(
    //     () => scrollY.value,
    //     (current, previous) => {
    //         if (previous === undefined || previous === null) return

    //         if (current > previous) {
    //             lastScrollDirection.value = 'down'
    //         } else if (current < previous) {
    //             lastScrollDirection.value = 'up'
    //         }

    //         lastScrollY.value = current
    //     }
    // )

    // const animatedStyle = useAnimatedStyle(() => {
    //     const shouldShow = lastScrollY.value <= 1 || lastScrollDirection.value === 'up'

    //     return {
    //         transform: [{
    //             translateY: withTiming(shouldShow ? 0 : 100, {
    //                 duration: 250,
    //                 easing: Easing.out(Easing.cubic)
    //             })
    //         }],
    //         height: withTiming(shouldShow ? 70 : 0, {
    //             duration: 250,
    //             easing: Easing.out(Easing.cubic)
    //         }),

    //     }
    // })

    function CustomTabBarButton({ children, onPress, onLayout }: BottomTabBarButtonProps) {
        return (
            <Pressable
                onLayout={onLayout}
                onPress={onPress}
                android_ripple={null}
                style={({ pressed }) => ({
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ scale: pressed ? 0.9 : 1 }],
                    opacity: pressed ? 1 : 1,
                })}
            >
                {children}
            </Pressable>
        );
    }

    return (
        <Animated.View style={[,
            {
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: '#333',
            }

        ]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const isFocused = state.index === index;

                const onPress = () => {
                    resetScroll();
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <View key={route.key} style={{ flex: 1 }}>
                        <CustomTabBarButton
                            onPress={onPress}
                        >
                            {
                               route.name === 'Home' && (
                                <HomeFillIcon width={horizontalScale(28)} height={verticalScale(28)}  color={'#16C47F'} /> 
                               )
                            } 
                            {
                               route.name === 'Generate' && (
                                   <BrainIcon width={horizontalScale(28)} height={verticalScale(28)} fill={isFocused ? '#16C47F' : '#fff'} />
                               )
                            } 
                            {
                               route.name === 'Profile  ' && (
                                 <SavedIcon width={horizontalScale(26)} height={verticalScale(26)} fill={isFocused ? '#16C47F' : '#fff'} />
                               )
                            } 

                            <Text style={{ color: isFocused ? '#16C47F' : '#fff', fontSize: 12, fontFamily: 'Nunito-Medium' }}>
                                {options.title || route.name}
                            </Text>
                        </CustomTabBarButton>
                    </View>
                )
            })}
        </Animated.View>
    )
}

export default CustomTabBar;

const styles = StyleSheet.create({})