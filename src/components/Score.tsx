import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ModalRemoveQuestionsTest from "./ModalRemoveQuestionsTest";
import Modal from "./Modal";

const FadeIn = props => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000
            }
        ).start();
    }, []);

    return (
        <Animated.View style={{opacity: fadeAnim}}>{props.children}</Animated.View>
    );
};

const Score = ({results, ...props}) => {

    const [percentageCorrect, setPercentageCorrect] = useState(0);
    const [categoriesWentThrough, setCategoriesWentThrough] = useState([]);
    const [questionsFormatted, setQuestionsFormatted] = useState([]);

    useEffect(() => {
        setPercentageCorrect(
            (props.firstTry / props.totalQuestions) * 100
        );

        const questionsAssoc = props.allQuestions.reduce((acc, c) => {
            const {category} = c;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
    }, []);

    return (
        <View style={styles.container}>
            <FadeIn>
                <View style={styles.headingContainer}>
                    <Text style={styles.mainheading}>Well done! This is how you did!</Text>
                </View>

                <View style={styles.textContainer}><Text style={styles.titles}>Total amount of
                    questions: {props.totalQuestions}</Text></View>
                <View style={styles.textContainer}><Text style={styles.titles}>First
                    Try Correct: {props.firstTry}</Text></View>
                <View style={styles.textContainer}><Text
                    style={styles.titles}>Percentage: {percentageCorrect}%</Text></View>
                <View style={styles.textContainer}><Text style={styles.titles}>Wrong
                    attempts: {results.wrongAnswers.length}</Text></View>
                <View style={styles.textContainer}><Text style={styles.titles}>Correct
                    attempts: {results.correctAnswers.length}</Text></View>

                <View style={styles.textContainer}>
                    <Text style={[styles.titles, {marginBottom: 10}]}>Categories used:</Text>
                    {props.categoryAnswers.map(category => {
                        return <View key={category.name}>
                            <Text style={styles.titles}>{category.name} Scored: {category.firstTry} out
                                of {category.totalQuestions}</Text>
                        </View>;
                    })}
                </View>


                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={{color: "white", textAlign: "center"}}
                          onPress={() => props.navigation.navigate("Home")}>Do it
                        again!</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Modal children={<ModalRemoveQuestionsTest {...props} />}/>
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
        borderBottomColor: "green"
    },
    mainheading: {
        fontSize: 18,
        color: "green",
        textAlign: "center",
        marginBottom: 20
    },
    titles: {
        color: "green",
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor: "green",
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
