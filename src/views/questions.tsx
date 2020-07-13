import React, {useEffect, useState} from 'react';
import {AsyncStorage, Dimensions, StyleSheet, View} from "react-native";
import QuestionView from "../components/questionView";
import {resetQuestions, shuffle} from "../utils/functions";
import {IsAnswered} from "../enums/isAnswered";

const Questions = (props) => {

    const [counterForQuestions, setCounterForQuestions] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [questionsBeingUsed, setQuestionsBeingUsed] = useState<[]>([]);
    const [dispalyScoreBoard, setDispalyScoreBoard] = useState<boolean>(false);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
    const [savedQuestions, setSavedQuestions] = useState<[]>([]);

    const questionsBeingUsedRef = React.useRef(questionsBeingUsed);

    const updateQuestionsBeingUsed = (questionsToSet: []): void => {
        questionsBeingUsedRef.current = questionsToSet;
        setQuestionsBeingUsed(questionsToSet);
    };

    useEffect(() => {

        const allQuestions = props.route.params.questions;
        updateQuestionsBeingUsed(allQuestions);

        async function load() {
            const storedQuestions = await AsyncStorage.getItem(props.route.params.id.toString());

            if (storedQuestions !== null) {
                const storedAreNowReset = resetQuestions(JSON.parse(storedQuestions));
                shuffle(storedAreNowReset);
                setSavedQuestions(storedAreNowReset);
                return setNumberOfQuestions(JSON.parse(storedQuestions).length);
            } else {
                setSavedQuestions([]);
                setNumberOfQuestions(allQuestions.length);
            }

            resetQuestions(allQuestions);
            shuffle(allQuestions);
            allQuestions.forEach(question => shuffle(question.options));
            displayFirstQuestion();
        }

        load();
    }, []);

    function displayFirstQuestion(): void {
        setCurrentQuestion(questionsBeingUsedRef.current[0]);
        setCounterForQuestions(counterForQuestions + 1);
    }

    function checkLengthOfQuestionsLeft(): void {

        if (counterForQuestions === numberOfQuestions) {
            return setDispalyScoreBoard(true);
        }

        return displayCorrectQuestion();
    }

    function displayCorrectQuestion(): void {
        if (savedQuestions.length !== 0) {
            setCurrentQuestion(savedQuestions[counterForQuestions]);
        } else {
            setCurrentQuestion(questionsBeingUsed[counterForQuestions]);
        }
        setCounterForQuestions(counterForQuestions + 1);
    }

    const viewPreviousQuestions = (): void => {
        if (savedQuestions.length !== 0) {
            setCurrentQuestion(savedQuestions[counterForQuestions - 2]);
        } else {
            setCurrentQuestion(questionsBeingUsed[counterForQuestions - 2]);
        }
        setCounterForQuestions(counterForQuestions - 1);
    };

    function viewNextQuestion(nextQuestion: any): void {
        setCounterForQuestions(counterForQuestions + 1);
        setCurrentQuestion(nextQuestion);
    }

    function isNextQuestionAnswered(): boolean | void {
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

        if (nextQuestion.answered === IsAnswered.no) {
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

        return nextQuestion.answered !== IsAnswered.no;


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
                    displayNextQuestion={checkLengthOfQuestionsLeft}
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

export default Questions;
