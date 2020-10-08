import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "@ui-kitten/components";
import FadeIn from "./fadeIn";


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
            (props.results.correctAnswers.length / props.totalQuestions) * 100
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
                    <Text style={{color: "white", textAlign: "center"}}>Do it
                        again!
                    </Text>
                </TouchableOpacity>
            </FadeIn>
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: "#233A44",
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        borderWidth: 2,
        borderColor: "#545A75"
    },
    container: {
        padding: 20
    },
    headingContainer: {
        borderBottomWidth: 2,
        borderBottomColor: "#545A75"
    },
    mainheading: {
        fontSize: 22,
        color: "white",
        marginBottom: 20
    },
    titles: {
        color: "white",
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor: "#233A44",
        borderRadius: 10,
        padding: 10,
        textAlign: "center",
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        borderWidth: 2,
        borderColor: "#545A75"
    }
});

export default Score;
