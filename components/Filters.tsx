import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import { horizontalScale, verticalScale } from '../utils/responsive'
import HorizontalSlider from './HorizontalSlider'
import Modal from 'react-native-modal'
import { FilterValuesTypes } from 'screens/generateHome'


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

type FiltersProps = {
    onValueChange: React.Dispatch<React.SetStateAction<FilterValuesTypes>>,
    defaultValues : FilterValuesTypes 
}

const mockData = ['Filters ✻', 'Quiz', 'Text', "hard 🔥", 'Question No']
const Filters = ({ onValueChange,defaultValues }: FiltersProps) => {
    const [activeModal, setActiveModal] = useState(false)
    const [quizType, setQuizType] = useState<string>(defaultValues.type)
    const [questionType,setQuestionType] = useState<string>(defaultValues.difficulty)
    const [questionNumbers,setQuestionNumbers] = useState<string>(defaultValues.noOfQuestions)
    const [customData, setCustomData] = useState<any>([...mockData])
    
    // const getQuestionInString

    return (
        <View>
            <FlatList
                data={customData}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={.8} onPress={() => setActiveModal(prev => !prev)}>
                        <View style={{ padding: 4, paddingHorizontal: 8, backgroundColor: '#E2E3E5', borderRadius: 25, minHeight: verticalScale(32), justifyContent: "center", alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Nunito-Medium', color: '#5D666F' }}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                horizontal
                ItemSeparatorComponent={() => <View style={{ width: horizontalScale(10) }} />}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <View style={{width : horizontalScale(15) }} />}
            />

            <Modal
                isVisible={activeModal}
                backdropOpacity={.6}
                animationIn={'fadeIn'}
                animationOut={'slideOutLeft'}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <TouchableOpacity activeOpacity={.8} onPress={() => setActiveModal(prev => !prev)}>
                            <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                                <View style={{ paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'white', borderRadius: 25, width: horizontalScale(100), marginBottom: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>Close</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: screenHeight * .4, width: screenWidth * .95, backgroundColor: 'white', borderRadius: 12, paddingHorizontal : 15, paddingVertical : 20,gap : verticalScale(20)}}>
                            <View style={{gap : 8}}>
                                <Text style={{fontWeight : '500',fontSize : 16,fontFamily : "Nunito-Medium"}}>Quiz Type</Text>
                                <HorizontalSlider defaultValue={quizType} width={horizontalScale(103)}  height={verticalScale(34)} data={['Text', 'Image', 'Pdf']} onChange={setQuizType} />
                            </View>

                            <View style={{gap : 8}}>
                                <Text style={{fontWeight : '500',fontSize : 16,fontFamily : "Nunito-Medium"}}>Question Type</Text>
                                <HorizontalSlider defaultValue={questionType} height={verticalScale(34)} width={horizontalScale(103)} data={['Hard 🔥', 'Medium 💪', 'Easy 😄']} onChange={setQuestionType} />
                            </View>

                            <View style={{gap : 8}}>
                                <Text style={{fontWeight : '500',fontSize : 16,fontFamily : "Nunito-Medium"}}>Number Of Quetions</Text>
                                <HorizontalSlider defaultValue={questionNumbers} height={verticalScale(34)} width={horizontalScale(103)} data={['Below 5', 'Only 5', 'Above 5']} onChange={setQuestionNumbers} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {
                            onValueChange({
                                difficulty : questionType,
                                noOfQuestions : questionNumbers,
                                type : quizType as any
                            })
                            setActiveModal(prev => !prev)
                        }} activeOpacity={.8} style={{ padding: 10, backgroundColor: '#0D9276', borderRadius: 12, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Bungee-Regular', fontSize: 12, lineHeight: 14, textAlign: 'center' }}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default Filters;

const styles = StyleSheet.create({})