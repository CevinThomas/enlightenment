import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FadeIn from "./fadeIn";
import GlobalStyles from "../utils/globalStyles"


const Score = (props) => {

    const [percentageCorrect, setPercentageCorrect] = useState(0);
    const [correctAttempts, setCorrectAnswers] = useState<number>(0);
    const [wrongAttempts, setWrongAttempts] = useState<number>(0);
    const [categoryAnswers, setCategoryAnswers] = useState<[]>([]);

    useEffect(() => {
        setCorrectAnswers(props.results.correctAnswers.length);
        setWrongAttempts(props.results.wrongAnswers.length);
        setCategoryAnswers(props.categoryAnswers);
        setPercentageCorrect(
            (props.firstTry / props.totalQuestions) * 100
        );
    }, []);

    return (
        <View style={styles.container}>
            <FadeIn>
                <View style={styles.headingContainer}>
                    <Text style={styles.mainheading}>Well done! This is how you did!</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.titles}>Total amount of questions: {props.totalQuestions}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.titles}>Correct attempts: {correctAttempts}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.titles}>Wrong attempts: {wrongAttempts}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text
                        style={styles.titles}>Percentage: {percentageCorrect}%</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.titles, {marginBottom: 10}]}>Categories used:</Text>

                    {categoryAnswers.map(category => {
                        return (
                            <View key={category.name}>
                                <Text style={styles.titles}>{category.name} Scored: {category.timesCorrect} out
                                    of {category.totalQuestions}</Text>
                            </View>
                        );
                    })}
                </View>


                <TouchableOpacity onPress={() => props.navigation.navigate("Home")} style={styles.buttonContainer}>
                    <Text style={{color: GlobalStyles.darkColor, textAlign: "center"}}>Do it
                        again!
                    </Text>
                </TouchableOpacity>
            </FadeIn>
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: "white",
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1

    },
    container: {
        padding: 20
    },
    headingContainer: {
        borderBottomWidth: 1,
        borderBottomColor: GlobalStyles.darkColor
    },
    mainheading: {
        fontSize: 18,
        color: GlobalStyles.darkColor,
        textAlign: "center",
        marginBottom: 20
    },
    titles: {
        color: GlobalStyles.darkColor,
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor: GlobalStyles.lightColor,
        borderRadius: 10,
        padding: 10,
        textAlign: "center",
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    }
});

export default Score;
