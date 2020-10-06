import React, {useEffect, useState} from 'react';
import {Alert, AsyncStorage, View} from "react-native";
import QuestionView from "../components/questionView";
import {resetQuestions, shuffle} from "../utils/functions";
import {IsAnswered} from "../enums/isAnswered";
import Question from "../interfaces/question";

const Questions = (props) => {

    const [counterForQuestions, setCounterForQuestions] = useState<number>(1);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [questionsBeingUsed, setQuestionsBeingUsed] = useState<Question[]>([]);
    const [dispalyScoreBoard, setDispalyScoreBoard] = useState<boolean>(false);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
    const [removeQuestionsModal, setRemoveQuestionsModal] = useState(false);

    const questionsBeingUsedRef = React.useRef(questionsBeingUsed);

    const updateQuestionsBeingUsed = (questionsToSet: Question[]): void => {
        questionsBeingUsedRef.current = questionsToSet;
        setQuestionsBeingUsed(questionsToSet);
    };


    useEffect(() => {

        if (props.route && props.route.params.questions !== undefined) {
            const idToUse = props.route.params.id;
            updateQuestionsBeingUsed(props.route.params.questions);

            async function load() {
                const storedQuestions = await AsyncStorage.getItem(idToUse.toString());

                if (storedQuestions !== null) {
                    const storedAreNowReset = resetQuestions(JSON.parse(storedQuestions));
                    shuffle(storedAreNowReset);
                    updateQuestionsBeingUsed(storedAreNowReset);
                    setNumberOfQuestions(JSON.parse(storedQuestions).length);
                    return displayFirstQuestion();
                }

                setNumberOfQuestions(questionsBeingUsedRef.current.length);
                resetQuestions(questionsBeingUsedRef.current);
                shuffle(questionsBeingUsedRef.current);
                questionsBeingUsedRef.current.forEach(question => shuffle(question.options));
                console.log(questionsBeingUsedRef.current);
                displayFirstQuestion();

            }

            load();
        } else {
            Alert.alert("Something went wrong with this category, please try again or another.");
        }
    }, []);

    function displayFirstQuestion(): void {
        setCurrentQuestion(questionsBeingUsedRef.current[0]);
    }

    function checkLengthOfQuestionsLeft(): void {

        if (counterForQuestions === numberOfQuestions) {
            return setDispalyScoreBoard(true);
        }
        return displayCorrectQuestion();
    }

    function displayCorrectQuestion(): void {
        setCurrentQuestion(questionsBeingUsedRef.current[counterForQuestions]);
        setCounterForQuestions(counterForQuestions + 1);
    }

    const viewPreviousQuestions = (): void => {
        setCurrentQuestion(questionsBeingUsed[counterForQuestions - 2]);
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


    const calculateNextQuestion = (counter?: number) => {

        let isLastQuestionComing, nextQuestion;

        if (counter !== undefined) {
            isLastQuestionComing = questionsBeingUsed.length - counter;
            nextQuestion = questionsBeingUsedRef.current[counter];
        } else {
            isLastQuestionComing = questionsBeingUsed.length - counterForQuestions;
            nextQuestion = questionsBeingUsedRef.current[counterForQuestions];
        }

        return {
            isLastQuestionComing,
            nextQuestion
        };
    };

    async function testUpdateQuestions(allQuestions: Array<Question>, removedQuestions: Array<Question>, removedQuestionsNames: Array<string>): void {
        const questionsToBeSaved = allQuestions.filter(questions => {
            if (!removedQuestionsNames.includes(questions.name)) return questions;
        });
        if (questionsToBeSaved.length === 0) return Alert.alert("You cannot remove all questions.");
        if (questionsToBeSaved.length === allQuestions.length) return Alert.alert("Either remove a question or go back.");
        const questionsLength = allQuestions.length - 1;

        for (let i = 0; i < allQuestions.length; i++) {
            if (currentQuestion.name === allQuestions[i].name && i === questionsLength && removedQuestionsNames.includes(currentQuestion.name)) {
                return Alert.alert("You are on the last question, please answer the question, and remove it in the next round.");
            }
        }

        try {
            let itemsRemovedThatHaveBeenAnswered = 0;
            for (let i = 0; i < removedQuestions.length; i++) {
                if (removedQuestions[i].answered === IsAnswered.yes) {
                    itemsRemovedThatHaveBeenAnswered++;
                }
            }
            let oldCounter = counterForQuestions;
            while (oldCounter !== 1 && itemsRemovedThatHaveBeenAnswered !== 0) {
                setCounterForQuestions(oldCounter - 1);
                oldCounter--;
            }

            updateQuestionsBeingUsed(questionsToBeSaved);

            let allQuestionsAnswered = true;
            for (let i = 0; i < questionsToBeSaved.length; i++) {
                if (questionsToBeSaved[i].answered === IsAnswered.no) {
                    allQuestionsAnswered = false;
                    break;
                }
            }

            if (allQuestionsAnswered === true) {
                setDispalyScoreBoard(true);
            } else {
                setCurrentQuestion(questionsBeingUsedRef.current[0]);
            }

            /*for (let i = 0; i < removedQuestions.length; i++) {
                if (removedQuestions[i].name === currentQuestion.name) {
                    setCurrentQuestion(questions.nextQuestion)
                }
            }*/
            setNumberOfQuestions(questionsToBeSaved.length);
            await AsyncStorage.setItem(props.route.params.id.toString(), JSON.stringify(questionsToBeSaved));
            showRemoveQuestionsModal();
        } catch (e) {
            console.log(e);
        }
    }

    function showRemoveQuestionsModal(): void {
        setRemoveQuestionsModal(!removeQuestionsModal);
    }

    return (
        <View>
            <View>{currentQuestion !== undefined ?
                <QuestionView
                    questionsModal={showRemoveQuestionsModal}
                    toShowQuestionsModal={removeQuestionsModal}
                    updateQuestions={testUpdateQuestions}
                    originalQuestions={props.route.params.questions}
                    allQuestions={questionsBeingUsed}
                    counter={counterForQuestions}
                    totalQuestions={questionsBeingUsed.length}
                    navigation={props.navigation}
                    scoreBoard={dispalyScoreBoard}
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
