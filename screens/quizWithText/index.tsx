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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import BottomSheet from '@gorhom/bottom-sheet';
import GorhomModal from 'components/GorhomModal';
import { generateQuizes } from 'utils/generateQuiz';


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
    if (input.length < 100) {
      toast({
        title: 'Unable to generate questions, please provide a longer context.'
      })
      return
    }
    try {
      setIsLoading(true);
      const result = await generateQuizes({ input })
      if (result) {
        navigation.navigate('QuizPage', { data: result });
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
                fontFamily: "Nunito-Regular",
                fontSize: 18
              }}
              placeholder='Write any Context here to generate Questions'
              placeholderTextColor='#999'
            />
          </ScrollView>



          <View style={[styles.buttonContainer]}>
            <TouchableOpacity onPress={handleRemove}>
              <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Nunito-Bold' }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.quizButton}>
              <MaterialIcon name='timer' color={'white'} size={22} />
              <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Nunito-Bold' }}>Quiz</Text>
            </TouchableOpacity>
          </View>

          <Modal
            isVisible={isLoading}
            backdropOpacity={1}
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
                style={{ width: 400, height: 400 }}
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
    paddingVertical: 13,
    paddingHorizontal: 24,
    backgroundColor: '#0D9276',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 8,

    // ✅ Shadow (iOS)
    shadowColor: '#0D9276',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,

    // ✅ Shadow (Android)
    elevation: 10,
  }


});
