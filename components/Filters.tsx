import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { horizontalScale, verticalScale } from '../utils/responsive';
import HorizontalSlider from './HorizontalSlider';
import Modal from 'react-native-modal';
import { FilterValuesTypes } from 'screens/generateHome';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type FiltersProps = {
    onValueChange: (values: FilterValuesTypes) => void;
    defaultValues: FilterValuesTypes;
};

const Filters = ({ onValueChange, defaultValues }: FiltersProps) => {
    const [activeModal, setActiveModal] = useState(false);
    const [quizType, setQuizType] = useState<'Text' | 'Image' | 'Pdf'>(
        defaultValues.type
    );
    const [questionType, setQuestionType] = useState<string>(
        defaultValues.difficulty
    );
    const [questionNumbers, setQuestionNumbers] = useState<string>(
        defaultValues.noOfQuestions
    );

    const customData = [
        'Filters ✻',
        'Quiz',
        quizType,
        questionType,
        questionNumbers,
    ];

    useEffect(() => {
        onValueChange({
            noOfQuestions: questionNumbers,
            difficulty: questionType,
            type: quizType,
        });
    }, []);

    return (
        <View>
            <FlatList
                data={customData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveModal(true)}
                    >
                        <View
                            style={{
                                padding: 4,
                                paddingHorizontal: 8,
                                backgroundColor: 'white',
                                borderRadius: 25,
                                minHeight: verticalScale(30),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Nunito-Medium',
                                    color: 'black',
                                }}
                            >
                                {item}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                horizontal
                ItemSeparatorComponent={() => (
                    <View style={{ width: horizontalScale(10) }} />
                )}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={{ width: horizontalScale(15) }} />
                )}
            />

            <Modal
                isVisible={activeModal}
                backdropOpacity={0.7}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                style={{
                    padding: 0,
                    margin: 0
                }}
            >
                <View style={styles.modalWrapper}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setActiveModal(false)}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <View
                                    style={{
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        backgroundColor: 'white',
                                        borderRadius: 25,
                                        width: horizontalScale(100),
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text style={{ textAlign: 'center' }}>Close</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.modalContent}>
                            <View >
                                <View style={{ gap: 8 }}>
                                    <Text style={styles.label}>Quiz Type</Text>
                                    <HorizontalSlider
                                        defaultValue={quizType}
                                        width={horizontalScale(103)}
                                        height={verticalScale(31)}
                                        data={['Text', 'Image', 'Pdf']}
                                        onChange={(value: any) => setQuizType(value)}
                                    />
                                </View>

                                <View style={{ gap: 8 }}>
                                    <Text style={styles.label}>Question Type</Text>
                                    <HorizontalSlider
                                        defaultValue={questionType}
                                        height={verticalScale(31)}
                                        width={horizontalScale(103)}
                                        data={['Hard 🔥', 'Medium 💪', 'Easy 😄']}
                                        onChange={setQuestionType}
                                    />
                                </View>

                                <View style={{ gap: 8 }}>
                                    <Text style={styles.label}>Number Of Questions</Text>
                                    <HorizontalSlider
                                        defaultValue={questionNumbers}
                                        height={verticalScale(31)}
                                        width={horizontalScale(103)}
                                        data={['Below 5', 'Only 5', 'Above 5']}
                                        onChange={setQuestionNumbers}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    onValueChange({
                                        difficulty: questionType,
                                        noOfQuestions: questionNumbers,
                                        type: quizType,
                                    });
                                    setActiveModal(false);
                                }}
                                activeOpacity={0.8}
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Filters;

const styles = StyleSheet.create({

    saveButton: {
        padding: 15,
        backgroundColor: '#0D9276',
        borderRadius: 12,
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontFamily: 'Bungee-Regular',
        fontSize: 12,
        lineHeight: 14,
        textAlign: 'center',
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    modalContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 10,
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },

    closeButton: {
        fontSize: 22,
        color: '#888',
    },

    modalContent: {
        gap: 20,
        backgroundColor: 'white',
        padding: 10,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10
    },

    filterGroup: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 12,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },

});
