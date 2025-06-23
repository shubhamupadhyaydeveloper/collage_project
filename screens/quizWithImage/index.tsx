import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Linking, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { CameraPermissionResponse, CameraType, launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

import Modal from 'react-native-modal'
import { horizontalScale, verticalScale } from '../../utils/responsive';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import * as Clipboard from 'expo-clipboard';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IcoIcons from 'react-native-vector-icons/Ionicons'
import { moderateScale } from 'react-native-size-matters';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GenerateNavigationType } from 'utils/types';
import { toast } from 'burnt';
import { generateQuizes } from 'utils/generateQuiz';
import LottieView from 'lottie-react-native';

const QuizWithImage = () => {
  const [cameraImage, setCameraImage] = useState<any>('')
  const [processedText, setProcessedText] = useState<string | null>('')
  const [modalVisible, setModalVisible] = useState(false)
  const [textCopy, setTextCopy] = useState(false)
  const [extractTextLoading, setExtractTextLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationProp<GenerateNavigationType>>()

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs access to your camera",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleExtractText = async ({ imageUrl, showModal }: { imageUrl: string, showModal: boolean }) => {
    setExtractTextLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', {
        uri: imageUrl,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);

      const textData = await axios.post('https://quizkrbackend.onrender.com/user/ocr', formData, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setProcessedText(textData.data.data)
      if (showModal) {
        setModalVisible(true)
      }

      return textData.data.data
    } catch (error) {
      console.log('error', error)
    } finally {
      setExtractTextLoading(false)
    }
  }

  const handleTakeImage = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to take a photo.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings();
              }
            },
          ]
        );
        return;
      }

      const result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        cameraType: CameraType.back,
        quality: 1,
      });


      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setCameraImage(imageUri)
      }

      console.log("Camera result:", result);

    } catch (error) {
      console.error("Error launching camera:", error);
    }
  };


  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setCameraImage(imageUri)
      }


    } catch (error) {
      console.error("Error launching camera:", error);
    }
  }

  const handleGenerateQuiz = async () => {
    setLoading(true)
    try {
      if (!cameraImage) {
        toast({
          title: "Please select an image"
        })
        return;
      }
      if (processedText) {
        if (processedText.length < 50) {
          toast({
            title: 'Unable to generate questions, please provide a longer context.'
          })
          return
        }
        const result = await generateQuizes({ input: processedText })
        if (result) {
          navigation.navigate('QuizPage', { data: result });
        }
      } else {
        const text = await handleExtractText({ imageUrl: cameraImage, showModal: false })
        const result = await generateQuizes({ input: text })
        if (result) {
          navigation.navigate('QuizPage', { data: result });
        }
      }
    } catch (error: any) {
      toast({
        title: error
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: "center", marginBottom: 20 }}>
        {cameraImage ? (
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              onPress={() => {
                setCameraImage('')
                setProcessedText('')
              }}
              style={[styles.container, {
                backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 10,
                right: 0,
                top: -verticalScale(10),
                width: 40,
                height: 40,
                alignItems: 'center',
              }]}>
              <View >
                <IcoIcons name='trash-sharp' size={20} color={'white'} />
              </View>
            </TouchableOpacity>
            <Image
              source={{ uri: cameraImage }}
              style={{
                width: horizontalScale(300),
                height: verticalScale(300),
                borderRadius: 12, borderColor: '#d2d2d2',
                borderWidth: 1,
              }}
            />
          </View>
        ) : (
          <View style={styles.emptyImageContainer}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dlv1uvt41/image/upload/v1750663213/gallery_10054335_ft4em8.png'
              }}
              style={{
                height: moderateScale(150),
                width: moderateScale(150)
              }}
            />
          </View>
        )}
      </View>

      <View style={{ gap: 10 }}>
        {!cameraImage && (
          <View style={{ paddingHorizontal: 20 }}>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleTakeImage}>
              <Text style={styles.secondaryButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleSelectImage}>
              <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>

          </View>
        )}

        {cameraImage && (
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleExtractText({ imageUrl: cameraImage, showModal: true })}
              style={[styles.secondaryButton, {}]}
            >
              {extractTextLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={{ color: 'white', fontFamily: 'Nunito-Bold', fontSize: 16 }}>Get Text</Text>}
            </TouchableOpacity>
          </View>

        )}
      </View>



      <View style={{ flex: 1, justifyContent: 'flex-end', }} >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View />
          <View style={[styles.buttonContainer]}>
            <TouchableOpacity onPress={handleGenerateQuiz} style={styles.quizButton}>
              <MaterialIcon name='timer' color={'white'} size={22} />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        onBackdropPress={() => setModalVisible(prev => !prev)}
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(prev => !prev)}
        backdropOpacity={0.6}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ gap: 10 }}>

            <TouchableOpacity activeOpacity={.8} onPress={() => setModalVisible(prev => !prev)}>
              <View style={styles.container}>
                <AntDesignIcon name='close' size={20} color={'black'} />
              </View>
            </TouchableOpacity>

            <View style={{ backgroundColor: 'white', width: horizontalScale(320), height: verticalScale(600), borderRadius: 8, paddingHorizontal: 20 }}>
              <ScrollView style={{ flex: 1 }}>
                <Text style={{ color: 'black', marginTop: 10, marginBottom: 10, fontFamily: 'Nunito-Bold', fontSize: 16 }}>
                  {processedText}
                </Text>
              </ScrollView>
            </View>

            <View>
              <TouchableOpacity onPress={() => {
                Clipboard.setStringAsync(processedText!)
                setTextCopy(true)
                setTimeout(() => {
                  setTextCopy(false)
                }, 2000)
              }} activeOpacity={.8} style={{ padding: 10, backgroundColor: '#0D9276', borderRadius: 12 }}>
                <Text style={{ color: 'white', fontFamily: 'Bungee-Regular', fontSize: 12, lineHeight: 14, textAlign: 'center' }}> {textCopy ? 'Copied' : 'Copy'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <Modal
        isVisible={loading}
        backdropOpacity={1}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        style={{
           backgroundColor : 'black',
           flex : 1,
           padding : 0,
           margin : 0,
           width : "100%"
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
  )
}

export default QuizWithImage;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: '#E2E3E5',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyImageContainer: {
    width: horizontalScale(200),
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImageContainerText: {
    fontFamily: 'Bungee-Regular',
    fontSize: 12
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
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
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center'
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})