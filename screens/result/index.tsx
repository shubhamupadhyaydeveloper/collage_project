import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { GenerateNavigationType } from "utils/types";

const QuizResultScreen = () => {
    const navigation = useNavigation<NavigationProp<GenerateNavigationType, 'ResultPage'>>();
    const route = useRoute<RouteProp<GenerateNavigationType, 'ResultPage'>>();
    const { score, totalQuestions } = route.params;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Determine result category
    let resultCategory = "";
    let resultColor = "";
    let resultEmoji = "🏆";
    let resultIcon = "star";

    if (percentage >= 80) {
        resultCategory = "Excellent!";
        resultColor = "#16C47F";
    } else if (percentage >= 50) {
        resultCategory = "Good Job!";
        resultColor = "#4A90E2";
    } else {
        resultCategory = "Keep Practicing!";
        resultColor = "#FF6B6B";
    }

    return (
        <LinearGradient
            colors={["#28323E", "#1A1F24"]}
            style={styles.container}
        >
            <Animated.View entering={FadeIn.duration(800)} style={styles.content}>
                {/* Result Header */}
                <Animated.Text
                    entering={FadeInUp.duration(1000)}
                    style={[styles.resultCategory, { color: resultColor }]}
                >
                    {resultCategory}
                </Animated.Text>

                {/* Score Circle */}
                <Animated.View entering={FadeInDown.duration(1000)} style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>
                        {score} out of {totalQuestions} correct
                    </Text>
                </Animated.View>

                {/* Score Breakdown */}
                <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.breakdownContainer}>
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
                </Animated.View>

                {/* Action Buttons */}
                <Animated.View entering={FadeInUp.delay(600).duration(800)} style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: resultColor }]}
                        onPress={() => navigation.reset({ index: 0, routes: [{ name: "GenerateHome" }] })}
                    >
                        <Text style={styles.buttonText}>Back to Home</Text>
                    </TouchableOpacity>

                </Animated.View>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    resultCategory: {
        fontSize: 36,
        fontFamily: "Nunito-Bold",
        marginBottom: 20,
    },
    scoreContainer: {
        position: "relative",
        marginBottom: 40,
        alignItems: "center",
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
        width: "100%",
        paddingHorizontal: 40,
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