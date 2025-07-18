import { Button, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { getDocumentAsync, DocumentPickerResult } from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { generateQuizes } from 'utils/generateQuiz';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GenerateNavigationType } from 'utils/types';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal'

type ResponseType = {
  numPages: number;
  title: string;
  author: string;
  text: string;
};

const QuizWithPdf = () => {
  const [selectedFile, setSelectedFile] = useState<DocumentPickerResult | null>(null);
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<NavigationProp<GenerateNavigationType>>()

  const handleSelectPdf = async () => {
    const result = await getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedFile(result);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleStartQuiz = async () => {
    try {
      setModalVisible(true)
      const formData = new FormData();

      if (selectedFile && selectedFile.assets) {
        formData.append('file', {
          uri: selectedFile.assets[0].uri,
          name: selectedFile.assets[0].name,
          type: 'application/pdf',
        } as any)
      }

      const textData = await axios.post('https://developershubham-audio-transcribe.hf.space/extract-text-from-pdf', formData, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const result = await generateQuizes({ input: textData.data.text })

      if (result) {
        navigation.navigate('QuizPage', { data: result });
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setModalVisible(false)
    }
  };

  return (
    <View style={styles.container}>
      {!selectedFile && (
        <View>
          <Text style={styles.title}>Quiz Generator from PDF</Text>

          {/* File Picker Button */}
          <TouchableOpacity style={styles.button} onPress={handleSelectPdf}>
            <Text style={styles.buttonText}>Select PDF File</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Display selected file */}
      {selectedFile && selectedFile.assets && (
        <View style={{ gap: 10 }}>
          <Text style={{ color: 'white' }}>Selected Pdf</Text>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName}>{selectedFile.assets[0].name ?? 'Unknown file'}</Text>
            <TouchableOpacity onPress={handleRemoveFile}>
              <Ionicons name="trash-bin" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Start Quiz Button */}
      {selectedFile && (
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 20
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View />
            <TouchableOpacity onPress={handleStartQuiz} style={styles.quizButton}>
              <MaterialIcons name='timer' color={'white'} size={22} />
              <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Nunito-Bold' }}>Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}


      <Modal
        isVisible={modalVisible}
        onBackButtonPress={() => {
          setModalVisible(prev => !prev)
          navigation.goBack()
        }}
        backdropOpacity={1}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        style={{
          backgroundColor: 'black',
          flex: 1,
          padding: 0,
          margin: 0,
          width: "100%"
        }}
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
  );
};

export default QuizWithPdf;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    flex: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#999',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 8,
  },
  fileName: {
    flex: 1,
    color: '#2c3e50',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultText: {
    color: '#2c3e50',
    marginTop: 20,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
