import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HorizontalSlider from '../../components/HorizontalSlider';
import QuizWithText from '../quizWithText';
import QuizWithImage from '../quizWithImage';
import QuizWithPdf from '../quizWithPdf';
import GoBack from '../../components/GoBack';
import Filters from '../../components/Filters';
import QuizWithAudio from 'screens/quizWithAudio';

export type FilterValuesTypes = {
    noOfQuestions: string;
    difficulty: string;
    type: "Text" | "Image" | "Pdf" | 'Audio'
}

const GoogleGiminiScreen = () => {
    const [values, setValues] = useState<FilterValuesTypes>({
        difficulty: 'Hard 🔥',
        noOfQuestions: 'Only 5',
        type: 'Text'
    })
    const insets = useSafeAreaInsets()

    const RenderActiveComponent = () => {
        switch (values.type) {
            case 'Text':
                return <QuizWithText />
            case 'Image':
                return <QuizWithImage />
            case 'Pdf':
                return <QuizWithPdf />
            case 'Audio':
                return <QuizWithAudio />
        }
    }

    const handleValuesChange = (item: FilterValuesTypes) => {
        console.log('this is values', item)
        setValues({
            difficulty: item.difficulty,
            noOfQuestions: item.noOfQuestions,
            type: item.type
        })
    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 10, gap: 10, flex: 1, paddingTop: 20 }}>
            <View style={{paddingHorizontal : 20,marginBottom : 10}}>
                <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Nunito-Bold',lineHeight : 20 }}>Generate Quiz</Text>
            </View>
            <Filters defaultValues={values} onValueChange={handleValuesChange} />
             {RenderActiveComponent()}
        </SafeAreaView>
    )
}

export default GoogleGiminiScreen;

const styles = StyleSheet.create({})