import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { GenerateNavigationType } from "utils/types";
import { Button } from "components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "utils/responsive";
import { toast } from 'burnt'

const QuizResultScreen = () => {
    const navigation = useNavigation<NavigationProp<GenerateNavigationType, 'ResultPage'>>();
    const route = useRoute<RouteProp<GenerateNavigationType, 'ResultPage'>>();
    const insets = useSafeAreaInsets()
    const {score , totalQuestions } = route.params;

    return (
        <View
            style={[styles.container, { paddingTop: insets.top + 100 }]}
        >
            <Animated.View entering={FadeIn.duration(800)} style={styles.content}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginTop: 40
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',  
                                gap: 4,
                            }}
                            onPress={() => {
                                 toast({
                                    title : "Sorry now its not available, we are working on this feature",
                                 })
                            }}
                        >
                            <Feather name="star" color="white" size={24} />
                            <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Result Header */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: 'https://res.cloudinary.com/dlv1uvt41/image/upload/v1750658094/10511561-removebg-preview_zuesag.png' }} style={{ width: horizontalScale(200), height: verticalScale(200) }} />
                        <Animated.Text
                            entering={FadeInUp.duration(1000)}
                            style={[styles.resultCategory, { color: 'white' }]}
                        >
                            Quiz Completed
                        </Animated.Text>
                    </View>

                    {/* Score Circle */}
                    <Animated.View entering={FadeInDown.duration(1000)} style={styles.scoreContainer}>
                        <View>
                            <Text style={{ color: 'white' }}>Score</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', // use alignItems for row alignment
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 40, fontFamily: 'Nunito-Regular' }}>{score} / </Text>
                                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Nunito-Bold' }}>{totalQuestions}</Text>
                            </View>

                        </View>
                    </Animated.View>

                    {/* Score Breakdown */}
                    {/* <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.breakdownContainer}>
                        <View style={styles.breakdownItem}>
                            <View style={[styles.breakdownDot, { backgroundColor: "#16C47F" }]} />
                            <Text style={styles.breakdownText}>Correct: {score}</Text>
                        </View>
                        <View style={styles.breakdownItem}>
                            <View style={[styles.breakdownDot, { backgroundColor: "#FF6B6B" }]} />
                            <Text style={styles.breakdownText}>Wrong: {totalQuestions - score}</Text>
                        </View>
                        <View style={styles.breakdownItem}>
                            <View style={[styles.breakdownDot, { backgroundColor: "#4A90E2" }]} />
                            <Text style={styles.breakdownText}>Total: {totalQuestions}</Text>
                        </View>
                    </Animated.View> */}
                </View>

                {/* Action Buttons */}
                <Animated.View entering={FadeInUp.delay(600).duration(800)} style={styles.buttonContainer}>
                    <Button
                        title="Back To Home"
                        onPress={() => navigation.reset({ index: 0, routes: [{ name: "GenerateHome" }] })}
                    />
                </Animated.View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30
    },
    content: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
    resultCategory: {
        fontSize: 14,
        fontFamily: "Bungee-Regular",
        marginBottom: 20,
        textAlign: 'center'
    },
    scoreContainer: {
        position: "relative",
        marginBottom: 40,
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#999999',
        padding: 40,
        borderRadius: 12
    },
    scoreCircle: {
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    emoji: {
        fontSize: 50,
        marginBottom: 10,
    },
    scorePercentage: {
        fontSize: 48,
        fontFamily: "Nunito-Bold",
        color: "white",
    },
    scoreText: {
        fontSize: 16,
        fontFamily: "Nunito-Regular",
        color: "#D1D5DB",
        marginTop: 5,
    },
    iconContainer: {
        position: "absolute",
        top: -30,
        backgroundColor: "#28323E",
        borderRadius: 50,
        padding: 10,
        borderWidth: 5,
        borderColor: "#1A1F24",
    },
    breakdownContainer: {
        width: "80%",
        marginBottom: 40,
    },
    breakdownItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    breakdownDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 10,
    },
    breakdownText: {
        fontSize: 18,
        fontFamily: "Nunito-SemiBold",
        color: "white",
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        width: "100%",
    },
    button: {
        padding: 18,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        color: "white",
        fontFamily: "Nunito-Bold",
        fontSize: 16,
    },
});

export default QuizResultScreen;