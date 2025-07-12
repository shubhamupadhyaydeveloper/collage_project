import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HorizontalSlider from './HorizontalSlider';
import Modal from 'react-native-modal';
import { FilterValuesTypes } from 'screens/generateHome';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import GorhomModal from './GorhomModal';
import { scale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type FiltersProps = {
    onValueChange: (values: FilterValuesTypes) => void;
    defaultValues: FilterValuesTypes;
};

const Filters = ({ onValueChange, defaultValues }: FiltersProps) => {
    const [quizType, setQuizType] = useState<'Text' | 'Image' | 'Pdf' | 'Audio'>(
        defaultValues.type
    );
    const [questionType, setQuestionType] = useState<string>(
        defaultValues.difficulty
    );
    const [questionNumbers, setQuestionNumbers] = useState<string>(
        defaultValues.noOfQuestions
    );

    const bottomSheetRef = useRef<BottomSheetModal>(null) as React.RefObject<BottomSheetModal>;
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('Text')


    // Handle open
    const handleOpen = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const customData = [
        'Filters',
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
                        onPress={handleOpen}
                    >
                        {item === 'Filters' ? (
                            <View
                                style={{
                                    padding: 4,
                                    paddingHorizontal: 8,
                                    backgroundColor: 'white',
                                    borderRadius: 25,
                                    minHeight: moderateScale(30),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Nunito-Medium',
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {item}
                                </Text>
                            </View>
                        ) : (
                            <View
                                style={{
                                    backgroundColor: '#1a1a1a',
                                    minHeight: moderateScale(30),
                                    padding: 4,
                                    paddingHorizontal: 8,
                                    borderRadius: 25,
                                    elevation: 2,
                                    borderColor: '#333',
                                    borderWidth: 1,
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 4,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Nunito-Medium',
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {item}
                                    </Text>
                                    <Ionicons
                                        color={'white'}
                                        size={24}
                                        name='close-circle'

                                    />
                                </View>
                            </View>
                        )}

                    </TouchableOpacity>
                )}
                horizontal
                ItemSeparatorComponent={() => (
                    <View style={{ width: moderateScale(10) }} />
                )}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={{ width: moderateScale(15) }} />
                )}
            />

            <GorhomModal
                bottomSheetRef={bottomSheetRef}
                customSnapPoints={['50%']}


            >
                <View
                    style={{
                        height: moderateScale(400)
                    }}
                >
                    <View style={styles.modalWrapper}>

                        <View style={styles.modalContent}>
                            <View style={{
                                gap: 25
                            }}>
                                <View style={{}}>
                                    <Text style={styles.label}>Select Format</Text>
                                    <DropDownPicker
                                        open={open}
                                        value={value}
                                        items={
                                            [
                                                { label: 'Text', value: 'Text' },
                                                { label: 'Image', value: 'Image' },
                                                { label: 'Pdf', value: 'Pdf' },
                                                { label: 'Audio', value: 'Audio' },
                                            ]
                                        }
                                        setOpen={setOpen}
                                        setValue={(value) => {
                                             setValue(value)
                                             setQuizType(value)
                                        }}
                                        placeholder="Select format"
                                        style={{
                                            borderColor: '#ccc',
                                            height: moderateScale(40),
                                            zIndex: 1000, // needed if inside a scroll view or bottom sheet
                                        }}
                                        dropDownContainerStyle={{
                                            zIndex: 1000,
                                        }}
                                    />
                                    {/* <HorizontalSlider
                                        defaultValue={quizType}
                                        height={moderateScale(31)}
                                        data={['Text', 'Image', 'Pdf','Audio']}
                                        onChange={(value: any) => setQuizType(value)}
                                    /> */}
                                </View>

                                <View style={{}}>
                                    <Text style={styles.label}>Question Level</Text>
                                    <HorizontalSlider
                                        defaultValue={questionType}
                                        height={moderateScale(31)}
                                        data={['Hard 🔥', 'Medium 💪', 'Easy 😄']}
                                        onChange={setQuestionType}
                                    />
                                </View>

                                <View style={{}}>
                                    <Text style={styles.label}>Number Of Questions</Text>
                                    <HorizontalSlider
                                        defaultValue={questionNumbers}
                                        height={moderateScale(31)}
                                        data={['Below 5', 'Only 5', 'Above 5']}
                                        onChange={setQuestionNumbers}
                                    />
                                </View>
                            </View>

                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                marginBottom: moderateScale(55)
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onValueChange({
                                            difficulty: questionType,
                                            noOfQuestions: questionNumbers,
                                            type: quizType,
                                        });
                                        bottomSheetRef.current?.close()
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.saveButton}
                                >
                                    <Text style={styles.saveButtonText}>Save Changes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </GorhomModal>

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
        flex: 1
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 1
    },

    filterGroup: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 12,
    },

    label: {
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
        color: 'black',
        marginBottom: 8,
    },

});
