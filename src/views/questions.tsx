import React, {useEffect, useState} from 'react';
import {AsyncStorage, View} from "react-native";
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
    const [categoryId, setCategoryId] = useState<number>(0);

    const questionsBeingUsedRef = React.useRef(questionsBeingUsed);
    const categoryIdRef = React.useRef(categoryId);

    const updateQuestionsBeingUsed = (questionsToSet: []): void => {
        questionsBeingUsedRef.current = questionsToSet;
        setQuestionsBeingUsed(questionsToSet);
    };

    const updateCategoryId = (categoryIdUsed: number): void => {
        categoryIdRef.current = categoryIdUsed;
        setCategoryId(categoryIdUsed);
    };

    useEffect(() => {

        const allQuestions = props.route.params.questions;
        updateCategoryId(props.route.params.id);
        updateQuestionsBeingUsed(allQuestions);

        async function load() {
            const storedQuestions = await AsyncStorage.getItem(categoryIdRef.current.toString());

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
                    id={props.route.params.id}
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
