import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import QuestionView from "./questionView";
import {resetQuestions, shuffle} from "../utils/functions";
import {Answered} from "../enums/answered";

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
                const questionsReset = resetQuestions(JSON.parse(value));
                shuffle(questionsReset);
                setSavedQuestions(questionsReset);
                setNumberOfQuestions(JSON.parse(value).length);
            } else {
                setSavedQuestions([]);
                setNumberOfQuestions(props.route.params.questions.length);
            }

            resetQuestions(props.route.params.questions);
            shuffle(props.route.params.questions);
            props.route.params.questions.forEach(question => shuffle(question.options));
        }
        load();
    }, []);

    function displayCorrectQuestion(): void {
        if (counterForQuestions === numberOfQuestions) {
            return setDispalyScoreBoard(true);
        }

        return checkLengthOfQuestionsLeft();
    }

    function viewPreviousQuestions(): void {
        let counter = counterForQuestions;
        let updatedCounter = counter - 1;
        if (savedQuestions.length !== 0) {

            setCurrentQuestion(savedQuestions[updatedCounter - 1]);
            setCounterForQuestions(counterForQuestions - 1);
            return;
        }

        setCounterForQuestions(counterForQuestions - 1);
        setCurrentQuestion(props.route.params.questions[updatedCounter - 1]);
    }

    function viewNextQuestion(nextQuestion: any): void {
        if (savedQuestions.length !== 0) {

            setCurrentQuestion(nextQuestion);
            setCounterForQuestions(counterForQuestions + 1);
            return;
        }

        setCounterForQuestions(counterForQuestions + 1);
        setCurrentQuestion(nextQuestion);
    }

    function checkLengthOfQuestionsLeft(): void {
        if (savedQuestions.length !== 0) {

            setCurrentQuestion(savedQuestions[counterForQuestions]);
            setCounterForQuestions(counterForQuestions + 1);
            return;
        }

        setCurrentQuestion(props.route.params.questions[counterForQuestions]);
        setCounterForQuestions(counterForQuestions + 1);
    }

    function isNextQuestionAnswered(): boolean | void  {
        let secondNextQuestion, isLastQuestionComing, questionIndex, nextQuestion;
        questionIndex = counterForQuestions;
        if (savedQuestions.length !== 0) {

            isLastQuestionComing = savedQuestions.length - counterForQuestions;
            nextQuestion = savedQuestions[questionIndex];
        } else {
            isLastQuestionComing = props.route.params.questions.length - counterForQuestions;
            nextQuestion = props.route.params.questions[questionIndex];
        }

        if (isLastQuestionComing > 1) {
            secondNextQuestion = props.route.params.questions[questionIndex + 1];
        }


            if (currentQuestion.answered === Answered.yes && isLastQuestionComing === 1) {
                return viewNextQuestion(nextQuestion);
            }

            if (currentQuestion.answered === Answered.no) {
                return false;
            }

            if (nextQuestion.answered === Answered.no && secondNextQuestion.answered === Answered.no) {
                viewNextQuestion(nextQuestion);
            }

            if (nextQuestion.answered === Answered.no ) {
                return false;
            }

            viewNextQuestion(nextQuestion);
    }

    function canWeViewNextQuestion(): boolean {
        let secondNextQuestion, isLastQuestionComing, questionIndex, nextQuestion;
        questionIndex = counterForQuestions;
        if (savedQuestions.length !== 0) {

            isLastQuestionComing = savedQuestions.length - counterForQuestions;
            nextQuestion = savedQuestions[questionIndex];
        } else {
            isLastQuestionComing = props.route.params.questions.length - counterForQuestions;
            nextQuestion = props.route.params.questions[questionIndex];
        }

        if (isLastQuestionComing > 1) {
            secondNextQuestion = props.route.params.questions[questionIndex + 1];
        }


        if (currentQuestion.answered === Answered.yes && isLastQuestionComing === 1) {
            return true;
        }

        if (currentQuestion.answered === Answered.no) {
            return false;
        }

        if (nextQuestion.answered === Answered.no && secondNextQuestion.answered === Answered.no) {
            return true;
        }

        if (nextQuestion.answered === Answered.no ) {
            return false;
        }

        return true;
    }

    function questionsAreBeingShownHandler(beingShown: boolean): void {
       setQuestionsAreShowing(beingShown)
    }

    return (
        <View style={styles.container}>
            {questionsAreShowing !== true ? <Text style={styles.heading}>{props.route.params.name}</Text> : null}


            <View>{currentQuestion !== undefined ?

                <QuestionView
                    id={props.route.params.id}
                    allQuestions={savedQuestions.length !== 0 ? savedQuestions : props.route.params.questions}
                    counter={counterForQuestions}
                    totalQuestions={savedQuestions.length !== 0 ? savedQuestions.length : props.route.params.questions.length}
                    navigation={props.navigation} scoreBoard={dispalyScoreBoard}
                    displayNextQuestion={displayCorrectQuestion}
                    viewPreviousQuestion={viewPreviousQuestions}
                    viewNextQuestion={isNextQuestionAnswered}
                    isNextQuestionViewable={canWeViewNextQuestion}
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
