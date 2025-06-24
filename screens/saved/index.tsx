import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated, Pressable } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { databases } from 'utils/appwrite';
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID } from '@env';
import Entypo from 'react-native-vector-icons/Entypo'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useFocusEffect, useNavigation, NavigationProp } from "@react-navigation/native";
import { useCallback } from 'react';
import { BottomTabNavigationType, GenerateNavigationType } from 'utils/types';

type QuizData = {
  id: string;
  title: string;
  options: any;
};

const SavedScreen = () => {
  const insets = useSafeAreaInsets();
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const navigation = useNavigation<NavigationProp<BottomTabNavigationType>>()

  const fetchData = async () => {
    const response = await databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID);
    const allQuizzes = response.documents.map((doc) => ({
      id: doc.$id,
      title: doc.title,
      options: JSON.parse(doc.quizes),
    }));

    setQuizData(allQuizzes);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const RenderQuiz = ({ quiz }: { quiz: QuizData }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{quiz.title}</Text>
          <Menu>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" size={18} color="#666" />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  backgroundColor: '#1a1a1a',
                  padding: 8,
                  borderRadius: 8,
                  borderColor: "#333",
                  borderWidth: 1
                },
                optionText: {
                  fontSize: 14,
                  padding: 8,
                },
              }}
            >
              <MenuOption onSelect={() => {
                navigation.navigate('Generate', { screen: 'QuizPage', params: { data: quiz.options } })
              }}>
                <Text style={{ color: 'white', padding: 8 }}>Start Quiz</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Saved`)}>
                <Text style={{ color: 'white', padding: 8 }}>Edit</Text>
              </MenuOption>
              <MenuOption onSelect={async () => {
                await databases.deleteDocument(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, quiz.id)
                fetchData()
              }}>
                <Text style={{ color: 'red', padding: 8 }}>Delete</Text>
              </MenuOption>

            </MenuOptions>
          </Menu>
        </View>
      </View>
    );
  };

  if (quizData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>No saved quizzes</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', paddingTop: insets.top }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Quizes</Text>
      </View>

      {quizData.map((item, index) => (
        <RenderQuiz key={index} quiz={item} />
      ))}
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
  },
  list: {
    flex: 1,
    backgroundColor: '#000000',
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 12,
    elevation: 2,
    borderColor: '#333',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#cccccc',
    fontSize: 13,
    marginTop: 8,
  },
});
