import React, {useEffect, useState} from 'react';
import {Alert, AsyncStorage, View} from "react-native";
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

        if (props.route.params.questions === undefined) {
            Alert.alert("Something went wrong with this category, please try again or another.");
            return props.navigation.navigate("Home", {});
        } else {
            const idToUse = props.route.params.id;
            updateQuestionsBeingUsed(props.route.params.questions);

            async function load() {
                const storedQuestions = await AsyncStorage.getItem(idToUse.toString());

                if (storedQuestions !== null) {
                    const storedAreNowReset = resetQuestions(JSON.parse(storedQuestions));
                    shuffle(storedAreNowReset);
                    setSavedQuestions(storedAreNowReset);
                    return setNumberOfQuestions(JSON.parse(storedQuestions).length);
                } else {
                    setSavedQuestions([]);
                    setNumberOfQuestions(questionsBeingUsedRef.current.length);
                }

                resetQuestions(questionsBeingUsedRef.current);
                shuffle(questionsBeingUsedRef.current);
                questionsBeingUsedRef.current.forEach(question => shuffle(question.options));
                displayFirstQuestion();
            }

            load();
        }
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
        let secondNextQuestion;
        const questions = calculateNextQuestion();

        if (questions.isLastQuestionComing > 1) {
            secondNextQuestion = questionsBeingUsed[counterForQuestions + 1];
        }

        if (currentQuestion.answered === IsAnswered.yes && questions.isLastQuestionComing === 1) {
            return viewNextQuestion(questions.nextQuestion);
        }

        if (questions.nextQuestion.answered === IsAnswered.no && secondNextQuestion.answered === IsAnswered.no) {
            viewNextQuestion(questions.nextQuestion);
        }

        if (currentQuestion.answered === IsAnswered.no) {
            return false;
        }

        if (questions.nextQuestion.answered === IsAnswered.no) {
            return false;
        }
        viewNextQuestion(questions.nextQuestion);
    }

    function canWeViewNextQuestion(): boolean {
        let secondNextQuestion;
        const questions = calculateNextQuestion();

        if (questions.isLastQuestionComing > 1) {
            secondNextQuestion = questionsBeingUsed[counterForQuestions + 1];
        }

        if (currentQuestion.answered === IsAnswered.yes && questions.isLastQuestionComing === 1) {
            return true;
        }

        if (currentQuestion.answered === IsAnswered.no) {
            return false;
        }

        if (questions.nextQuestion.answered === IsAnswered.no && secondNextQuestion.answered === IsAnswered.no) {
            return true;
        }
        return questions.nextQuestion.answered !== IsAnswered.no;
    }


    const calculateNextQuestion = () => {
        let isLastQuestionComing, nextQuestion;

        if (savedQuestions.length !== 0) {

            isLastQuestionComing = savedQuestions.length - counterForQuestions;
            nextQuestion = savedQuestions[counterForQuestions];
        } else {
            isLastQuestionComing = questionsBeingUsed.length - counterForQuestions;
            nextQuestion = questionsBeingUsed[counterForQuestions];
        }

        return {
            isLastQuestionComing,
            nextQuestion
        };
    };

    return (
        <View>
            <View>{currentQuestion !== undefined ?
                <QuestionView
                    allQuestions={savedQuestions.length !== 0 ? savedQuestions : questionsBeingUsed}
                    counter={counterForQuestions}
                    totalQuestions={savedQuestions.length !== 0 ? savedQuestions.length : questionsBeingUsed.length}
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

export default Questions;
