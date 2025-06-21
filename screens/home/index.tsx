import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { JSX, use, useEffect, useMemo } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useScrollContext } from 'context/scrollContext';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import Octicons from 'react-native-vector-icons/Octicons';

const mockData = [
  {
    title: 'Upload PDFs',
    background: '#252A34',
    description: 'Import PDFs and convert them into interactive quizzes instantly with smart extraction.'
  },
  {
    title: 'Capture Notes',
    background: '#252A34',
    description: 'Snap pictures of notes and let AI generate practice questions from the content.'
  },
  {
    title: 'Manual Input',
    background: '#252A34',
    description: 'Enter text manually to create topic-specific quizzes powered by AI.'
  },
  {
    title: 'Smart Quiz Generator',
    background: '#252A34',
    description: 'Automatically generate high-quality quizzes based on your study material.'
  }
];

const QuickActionButton = ({ label, icon }: { label: string; icon: JSX.Element }) => (
  <TouchableOpacity
    style={{
      backgroundColor: '#1F2937',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 12,
      marginRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    {icon}
    <Text style={{ color: '#fff', marginLeft: 8, fontFamily: 'Nunito-Medium' }}>{label}</Text>
  </TouchableOpacity>
);

const QuickActions = () => (
  <View style={{ marginBottom: 30 }}>
    <Text style={styles.sectionTitle}>Quick Actions</Text>
    <FlatList
      horizontal
      data={[
        { label: 'Create Quiz', icon: <Octicons name="diff-added" size={18} color="#fff" /> },
        { label: 'Upload PDF', icon: <Octicons name="file" size={18} color="#fff" /> },
        { label: 'Scan Notes', icon: <Octicons name="device-camera" size={18} color="#fff" /> },
        { label: 'Manual Input', icon: <Octicons name="pencil" size={18} color="#fff" /> },
      ]}
      keyExtractor={(item) => item.label}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
      renderItem={({ item }) => <QuickActionButton label={item.label} icon={item.icon} />}
    />
  </View>
);

const CommonHeader = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={{ paddingTop: insets.top + 10, marginBottom: verticalScale(40) }}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.logoText}>Quizkr</Text>
          <Text style={styles.tagline}>Smarter Learning Through Quizzes</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Octicons name="three-bars" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const topScrollValue = useSharedValue(0);
  const { scrollY } = useScrollContext();
  const insets = useSafeAreaInsets();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = Math.max(0, event.contentOffset.y);
      topScrollValue.value = event.contentOffset.y;
    }
  });

  type RenderBoxProps = {
    text: string;
    bg: string;
    description: string;
    index: number;
  };

  const RenderBox = useMemo(
    () =>
      ({ text, bg, description, index }: RenderBoxProps) => {
        const translateY = useSharedValue(20);

        useEffect(() => {
          translateY.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
        }, []);

        const renderBoxAnimatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ translateY: translateY.value }],
            opacity: interpolate(translateY.value, [20, 0], [0, 1], Extrapolation.CLAMP),
          };
        });

        return (
          <Animated.View
            style={[styles.boxContainer, renderBoxAnimatedStyle, { backgroundColor: bg }]}
          >
            <View>
              <Text style={styles.boxTitle}>{text}</Text>
              <Text style={styles.boxDescription}>{description}</Text>
            </View>
          </Animated.View>
        );
      },
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Animated.FlatList
        onScroll={onScrollHandler}
        showsVerticalScrollIndicator={false}
        
        keyExtractor={(item, index) => index.toString()}
        data={mockData}
        renderItem={({ item, index }) => (
          <RenderBox
            index={index}
            description={item.description}
            bg={item.background}
            text={item.title}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListHeaderComponent={() => (
          <View>
            <CommonHeader />
            <QuickActions />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ marginBottom: verticalScale(110), marginTop: verticalScale(30) }} >
            <View style={{ gap: -5 }}>
              <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Bungee-Regular', lineHeight: 28 }}>One Solution</Text>
              <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Bungee-Regular', lineHeight: 30 }}>for Every Exams </Text>
              <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Bungee-Regular', lineHeight: 30 }}>Quizkr <Text style={{ fontSize: 24 }}>❤️</Text>  </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: verticalScale(10) }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  boxContainer: {
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Bungee-Regular',
    lineHeight: 26,
  },
  boxDescription: {
    color: '#A0AEC0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    marginTop: 10,
    lineHeight: 20,
  },
  logoText: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'Bungee-Regular',
    color: '#FFFFFF',
  },
  avatar: {
    width: horizontalScale(45),
    height: verticalScale(45),
    borderRadius: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagline: {
    fontSize: 15,
    color: '#A0AEC0',
    fontFamily: 'Nunito-Medium',
  },
  footerContainer: {
    marginBottom: verticalScale(100),
    marginTop: verticalScale(40),
    alignItems: 'center',
  },
  footerMain: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Bungee-Regular',
  },
  footerSub: {
    fontSize: 15,
    color: '#A0AEC0',
    fontFamily: 'Nunito-Medium',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    lineHeight: 20,
  },
  sectionDesc: {
    color: '#A0AEC0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    lineHeight: 20,
  },
});
