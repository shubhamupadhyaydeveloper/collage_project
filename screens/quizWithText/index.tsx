import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { verticalScale } from '../../utils/responsive';
import { screenHeight } from '../../utils/constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GenerateNavigationType } from '../../utils/types';
import LottieView from 'lottie-react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import { jsonrepair } from "jsonrepair";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'burnt';



const apiKey = 'AIzaSyBtMByO1hrHxfA6KIZF-RTMkquFCqZhqqA';
const gemini = new GoogleGenerativeAI(apiKey)

async function getGeminiResponse(prompt: string) {
  try {
    const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const response = result.response.text()
    return response
  } catch (error: any) {
    console.error('Gemini Api error', error)
    return 'Error fetching response'
  }
}

const QuizWithText = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const navigation = useNavigation<NavigationProp<GenerateNavigationType>>()
  const [isLoading, setIsLoading] = useState(false)
  const insets = useSafeAreaInsets();


  // useEffect(() => {
  //   const getInput = mmkvStorage.getItem('textinput');
  //   if (getInput) {
  //     setInput(getInput);
  //   }

  // }, []);

  const handleTextInput = (e: string) => {
    setInput(e);
    // mmkvStorage.setItem('textinput', e);
  };

  const handleRemove = () => {
    setInput('')
    // mmkvStorage.removeItem('textinput')
  }

  const handleSubmit = async () => {
    try {
      if (input.length > 100) {
        setIsLoading(true);
        const result = await getGeminiResponse(
          input +
          ' Generate a quiz based on the above text. The response should ONLY be a JSON array containing objects with the fields: "question" (string), "options" (array of 4 strings), and "answer" (string). Do NOT include any extra text, explanation, or code block syntax like ```.'
        );

        try {
          const parsedResult = jsonrepair(result);
          const actualData = JSON.parse(parsedResult)

          if (Array.isArray(actualData) && actualData.length > 0) {
            navigation.navigate('QuizPage', { data: actualData });
          } else {
            toast({
              title: 'Unable to generate meaningful quiz questions. Try providing a clearer context.'
            })
          }
        } catch (error) {
          toast({
            title: 'The AI could not generate valid quiz questions. Try again with a better input.'
          })
        }
      } else {
        toast({
          title: 'Unable to generate questions, please provide a longer context.'
        })
      }
    } catch (error) {
      console.error('Error in handleSubmit', error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top + 40}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
            <TextInput
              value={input}
              onChangeText={handleTextInput}
              multiline
              style={{
                color: 'white',
                minHeight: verticalScale(screenHeight * 0.7),
                maxHeight: verticalScale(screenHeight * 0.7),
                textAlignVertical: 'top',
                padding: 10,
                borderRadius: 10,
              }}
              placeholder='Write any Context here to generate Questions'
              placeholderTextColor='white'
            />
          </ScrollView>



          <View style={[styles.buttonContainer]}>
            <TouchableOpacity onPress={handleRemove}>
              <Text style={{ color: 'white' }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.quizButton}>
              <MaterialIcon name='timer' color={'white'} size={22} />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Quiz</Text>
            </TouchableOpacity>
          </View>



          <Modal
            isVisible={isLoading}
            backdropOpacity={0.4}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={styles.modalContainer}
            >
              <LottieView
                speed={1.7}
                source={require('../../assets/gif/loader.json')}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
              />
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )

}

export default QuizWithText;

const styles = StyleSheet.create({

  buttonContainerKeyboardVisible: {
    // bottom: 10, // Move up when keyboard is open
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
  },
  quizButton: {
    paddingVertical: 12,
    backgroundColor: '#0D9276',
    borderRadius: 30,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 8,
  },

});
