import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Linking } from 'react-native'
import React, { useState } from 'react'
import { CameraPermissionResponse, CameraType, launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import TextRecognition from '@react-native-ml-kit/text-recognition';
import Modal from 'react-native-modal'
import { horizontalScale, verticalScale } from '../../utils/responsive';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import * as Clipboard from 'expo-clipboard';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IcoIcons from 'react-native-vector-icons/Ionicons'

const QuizWithImage = () => {
  const [cameraImage, setCameraImage] = useState<any>('')
  const [processedText, setProcessedText] = useState<string | null>('')
  const [modalVisible, setModalVisible] = useState(false)
  const [textCopy, setTextCopy] = useState(false)

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

  const handleExtractText = async (imageUrl: string) => {
    console.log('this is working')
    const result = await TextRecognition.recognize(imageUrl);
    setProcessedText(result.text)
    setModalVisible(prev => !prev)
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: "center", marginBottom: 20 }}>
        {cameraImage ? (
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              onPress={() => setCameraImage('')}
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
            <Text style={styles.emptyImageContainerText}>No Image Selected</Text>
          </View>
        )}
      </View>

      <View style={{ gap: 10 }}>
        {!cameraImage && (
          <View style={{ gap: 10 }}>
            <TouchableOpacity activeOpacity={.8} onPress={handleTakeImage}>
              <View style={{ padding: 15, borderRadius: 10, backgroundColor: '#0D9276', }}>
                <Text style={{ textAlign: 'center', fontSize: 12, lineHeight: 14, fontFamily: 'Bungee-Regular', color: 'white' }}>Click Image</Text>
              </View>
            </TouchableOpacity>
            {/* <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Bold', fontSize: 14 }}>Or</Text> */}
            <TouchableOpacity activeOpacity={.8} onPress={handleSelectImage}>
              <View style={{ padding: 15, borderRadius: 10, backgroundColor: '#0D9276', }}>
                <Text style={{ textAlign: 'center', fontSize: 12, lineHeight: 14, fontFamily: 'Bungee-Regular', color: 'white' }}>Select Image</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {cameraImage && (
          <TouchableOpacity activeOpacity={.8} onPress={() => handleExtractText(cameraImage)}>
            <View style={{ padding: 15, borderRadius: 10, backgroundColor: '#0D9276', }}>
              <Text style={{ textAlign: 'center', fontSize: 12, lineHeight: 14, fontFamily: 'Bungee-Regular', color: 'white' }}>Get Text</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>



      <View style={{ flex: 1, justifyContent: 'flex-end', }} >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View />
          <View style={[styles.buttonContainer]}>
            <TouchableOpacity style={styles.quizButton}>
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
    borderRadius: 12
    , borderColor: '#d2d2d2',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7F8'
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
})