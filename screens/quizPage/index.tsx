import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { GenerateNavigationType } from "../../utils/types";
import { useEffect, useState } from "react";
import { jsonrepair } from "jsonrepair";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import GoBack from "../../components/GoBack";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, LinearTransition } from "react-native-reanimated";
import { horizontalScale } from "../../utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const optionHeadingColor = '#787D86'
const optionHeadingbg = '#F2F3F5'
const optionTitleColor = '#28323E'

type DataType = {
    answer: string,
    options: string[],
    question: string
}

const QuizPageScreen = () => {
    const navigation = useNavigation<NavigationProp<GenerateNavigationType, 'QuizPage'>>()
    const route = useRoute<RouteProp<GenerateNavigationType, 'QuizPage'>>();
    const { data } = route.params;
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [quiz, setQuiz] = useState<DataType[]>([]);
    const insets = useSafeAreaInsets()
    const [showResult, setShowResult] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [totalScored, setTotalScored] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | null }>({});

    const QuizProgressBar = ({ currentQuizIndex, totalQuiz }: { currentQuizIndex: number, totalQuiz: number }) => {
        return (
            <Animated.View layout={LinearTransition.springify().damping(80).stiffness(200)} style={styles.progressBarContainer}>
                <Animated.View layout={LinearTransition.springify().damping(80).stiffness(200)} style={[styles.progressBar, { width: `${100 * (currentQuizIndex / totalQuiz)}%` }]} />
            </Animated.View>
        );
    };

    useEffect(() => {
        if (showResult) {
            let newScore = 0;
            Object.keys(selectedAnswers).forEach(questionIndex => {
                const index = Number(questionIndex);
                const selectedOption = quiz[index]?.options[selectedAnswers[index]!];
                if (selectedOption === quiz[index]?.answer) {
                    newScore++;
                }
            });
            setTotalScored(newScore);
        }
    }, [showResult, selectedAnswers, quiz]);


    useEffect(() => {
        try {
            if (Array.isArray(data)) {
                setQuiz(data);
            } else {
                console.error("Data is not an array:", data);
            }
        } catch (error) {
            console.error("Error parsing quiz data:", error);
        }
    }, [data]);

    const handleClickContinue = () => {
        if (quiz.length - 1 === currentQuizIndex) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'ResultPage', params: { score: totalScored, totalQuestions: quiz.length } }]
            });
        }

        if (showResult === false) {
            if (activeIndex !== null) {
                setSelectedAnswers(prev => ({
                    ...prev,
                    [currentQuizIndex]: activeIndex
                }));
                setShowResult(true);
            }
        } else {
            setShowResult(false);
            setActiveIndex(null);
            setCurrentQuizIndex(prev => Math.min(quiz.length - 1, prev + 1));
        }
    };


    const RenderOptionContainer = () => {
        return (
            <View style={{ marginTop: 20, gap: 20, flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <GoBack />
                    <View style={{ flex: 1 }}>
                        <QuizProgressBar currentQuizIndex={currentQuizIndex} totalQuiz={quiz.length} />
                    </View>
                    <Text style={{ color: 'white', fontFamily: 'Nunito-Bold', fontSize: 16 }}>{currentQuizIndex + 1}/{quiz.length}</Text>
                </View>
                <Text style={styles.headingText}>{quiz[currentQuizIndex]?.question}</Text>
                <View style={{ gap: 25 }}>
                    {quiz[currentQuizIndex]?.options?.map((item: string, index: number) => {
                        const isSelected = activeIndex === index;
                        const isCorrectAnswer = item === quiz[currentQuizIndex]?.answer;
                        const isWrongSelection = isSelected && !isCorrectAnswer;

                        let bgColor = 'transparent';
                        let textColor = 'white';
                        let icon = '';

                        if (showResult) {
                            if (isCorrectAnswer) {
                                bgColor = '#16C47F';
                                icon = '✅';
                            } else if (isWrongSelection) {
                                bgColor = '#D94242';
                                icon = '❌';
                            }
                        } else if (isSelected) {
                            bgColor = '#999999';
                            textColor = 'black';
                        }

                        return (
                            <TouchableOpacity
                                key={`${item}-${index}`}
                                activeOpacity={0.7}
                                onPress={() => !showResult && setActiveIndex(index)}
                                disabled={showResult}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 20,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: "#d2d2d2",
                                    padding: 10,
                                    borderRadius: 20,
                                    backgroundColor: bgColor,
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 5,
                                        borderRadius: 15,
                                        width: 40,
                                        height: 40,
                                        backgroundColor: optionHeadingbg
                                    }}>
                                        <Text style={{ color: optionHeadingColor, fontFamily: 'Nunito-Bold', fontSize: 16 }}>
                                            {index + 1}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: textColor, fontFamily: 'Nunito-Bold', fontSize: 16 }}>
                                            {item}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        )
    }

    return (
        <View style={{ paddingHorizontal: 20, flex: 1, paddingTop: insets.top + 20, gap: 20 }}>
            {quiz.length > 0 && currentQuizIndex < quiz.length ? (
                <RenderOptionContainer />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading quiz...</Text>
                </View>
            )}

            <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: 20 }}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={handleClickContinue}
                    style={{
                        padding: 15,
                        backgroundColor: activeIndex !== null || showResult ? '#16C47F' : '#999999',
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    disabled={!showResult && activeIndex === null}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, fontFamily: 'Bungee-Regular', lineHeight: 15 }}>
                        {showResult ? 'Continue' : 'Submit'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 22,
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    progressBarContainer: {
        width: "100%",
        height: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#8EA3A6",
        borderRadius: 5,
    },
    counter: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
})

export default QuizPageScreen;