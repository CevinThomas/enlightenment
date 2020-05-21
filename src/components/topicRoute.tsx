import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import QuestionView from "./questionView";
import {shuffle} from "../utils/functions";

const TopicRoute = (props) => {

    const [counterForQuestions, setCounterForQuestions] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [dispalyScoreBoard, setDispalyScoreBoard] = useState<boolean>(false);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
    const [savedQuestions, setSavedQuestions] = useState<[]>([]);
    const [questionsAreShowing, setQuestionsAreShowing] = useState<boolean>(false);

    useEffect(() => {
        async function load() {
            const value: string = await AsyncStorage.getItem(props.route.params.id.toString());

            if (value !== null) {
                setNumberOfQuestions(JSON.parse(value).length);
                setSavedQuestions(JSON.parse(value));
            } else {
                setNumberOfQuestions(props.route.params.questions.initialQuestions.length);
            }
            shuffle(props.route.params.questions.initialQuestions);
            props.route.params.questions.initialQuestions.forEach(question => shuffle(question.options));
        }

        load();
    }, []);

    function displayCorrectQuestion(): void {
        if (counterForQuestions === numberOfQuestions) {
            return setDispalyScoreBoard(true);
        }

        return checkLengthOfQuestionsLeft();
    }

    function checkLengthOfQuestionsLeft(): void {
        if (savedQuestions.length !== 0) {

            setCurrentQuestion(savedQuestions[counterForQuestions]);
            setCounterForQuestions(counterForQuestions + 1);
            return;
        }

        setCurrentQuestion(props.route.params.questions.initialQuestions[counterForQuestions]);
        setCounterForQuestions(counterForQuestions + 1);
    }

    function questionsAreBeingShownHandler(beingShown: boolean): void {
        setQuestionsAreShowing(beingShown);
    }

    return (
        <View style={styles.container}>
            {questionsAreShowing !== true ? <Text style={styles.heading}>{props.route.params.name}</Text> : null}


            <View>{currentQuestion !== undefined ?

                <QuestionView
                    id={props.route.params.id}
                    allQuestions={savedQuestions.length !== 0 ? savedQuestions : props.route.params.questions.initialQuestions}
                    counter={counterForQuestions}
                    totalQuestions={savedQuestions.length !== 0 ? savedQuestions.length : props.route.params.questions.initialQuestions.length}
                    navigation={props.navigation} scoreBoard={dispalyScoreBoard}
                    displayNextQuestion={displayCorrectQuestion}
                    question={currentQuestion}
                /> : null}

            </View>

            {counterForQuestions === 0 ?

                <TouchableOpacity onPress={() => {
                    questionsAreBeingShownHandler(true);
                displayCorrectQuestion()
                }
                } style={styles.startedButtonContainer}>
                    <Text style={styles.getStarted}>Let's Get Started!</Text>
                </TouchableOpacity>

                : null}

        </View>
    );
};

const styles = StyleSheet.create({
    getStarted: {
        color: "green",
    },
    container: {
        padding: 20,
    },
    heading: {
        margin: 20,
        color: "green",
        textAlign: "center",
        fontSize: 25
    },
    startedButtonContainer: {
        width: "100%",
        display: "flex",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        height: 50,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    }
});

export default TopicRoute;
