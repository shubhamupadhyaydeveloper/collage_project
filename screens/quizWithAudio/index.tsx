import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Video, ResizeMode, Audio } from 'expo-av';
import axios from 'axios';

const QuizWithAudio = () => {
  const [media, setMedia] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const pickMedia = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*', 'video/*'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if ('assets' in result && Array.isArray(result.assets) && result.assets.length > 0) {
        setMedia(result.assets[0]);

        // Stop previously playing audio
        if (sound) {
          await sound.unloadAsync();
          setSound(null);
        }

        // If it's audio, play it
        if (result.assets[0].mimeType?.includes('audio')) {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: result.assets[0].uri },
            { shouldPlay: false }
          );
          setSound(newSound);
        }
      }
    } catch (error) {
      console.error('Error picking media:', error);
    }
  };

  const generateQuiz = async () => {
    if (!media) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: media.uri,
        name: media.name,
        type: media.mimeType,
      } as any);

      const response = await axios.post(
        'https://developershubham-audio-transcribe.hf.space/transcribe-audio',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Alert.alert('Quiz Data Received', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate quiz.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎧 Quiz with Audio/Video</Text>

      <TouchableOpacity onPress={pickMedia} style={styles.button}>
        <Text style={styles.buttonText}>Select Audio or Video</Text>
      </TouchableOpacity>

      {media && (
        <View style={styles.mediaContainer}>
          <Text style={styles.fileName}>📄 {media.name}</Text>

          {media.mimeType?.includes('video') && (
            <Video
              source={{ uri: media.uri }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={false}
              isLooping
            />
          )}

          <TouchableOpacity onPress={generateQuiz} style={[styles.button, { marginTop: 20 }]}>
            {isLoading ? (
              <ActivityIndicator color="#121212" />
            ) : (
              <Text style={styles.buttonText}>Generate Quiz</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default QuizWithAudio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#00D084',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mediaContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  fileName: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  video: {
    width: 300,
    height: 200,
    borderRadius: 12,
  },
});
