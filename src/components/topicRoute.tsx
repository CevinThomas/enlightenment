import React, {useEffect, useState} from 'react';
import {AsyncStorage, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import QuestionView from "./questionView";
import {resetQuestions, shuffle} from "../utils/functions";
import {IsAnswered} from "../enums/isAnswered";

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
            let counter: number, numberOfQuestions: number;

            if (value !== null) {
                const questionsReset = resetQuestions(JSON.parse(value));
                shuffle(questionsReset);
                setSavedQuestions(questionsReset);
                numberOfQuestions = JSON.parse(value).length;
                setNumberOfQuestions(JSON.parse(value).length);
            } else {
                setSavedQuestions([]);
                numberOfQuestions = props.route.params.questions.length;
                setNumberOfQuestions(props.route.params.questions.length);
            }

            resetQuestions(props.route.params.questions);
            shuffle(props.route.params.questions);
            props.route.params.questions.forEach(question => shuffle(question.options));
            displayFirstQuestion();
        }
        load();
    }, []);

    function displayFirstQuestion(): void {
        setCurrentQuestion(props.route.params.questions[0]);
        setCounterForQuestions(counterForQuestions + 1);
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


            if (currentQuestion.answered === IsAnswered.yes && isLastQuestionComing === 1) {
                return viewNextQuestion(nextQuestion);
            }

            if (currentQuestion.answered === IsAnswered.no) {
                return false;
            }

            if (nextQuestion.answered === IsAnswered.no && secondNextQuestion.answered === IsAnswered.no) {
                viewNextQuestion(nextQuestion);
            }

            if (nextQuestion.answered === IsAnswered.no ) {
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


        if (currentQuestion.answered === IsAnswered.yes && isLastQuestionComing === 1) {
            return true;
        }

        if (currentQuestion.answered === IsAnswered.no) {
            return false;
        }

        if (nextQuestion.answered === IsAnswered.no && secondNextQuestion.answered === IsAnswered.no) {
            return true;
        }

        if (nextQuestion.answered === IsAnswered.no ) {
            return false;
        }

        return true;
    }

    return (
        <View style={styles.container}>

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

        </View>
    );
};

const {width} = Dimensions.get('window');

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
        shadowOpacity: 0.1,
        width: width * 0.8,
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export default TopicRoute;
