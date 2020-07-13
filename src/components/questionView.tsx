import React, {useEffect, useState} from 'react';
import {Button, Dimensions, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Score from "./score";
import FadeIn from "./fadeIn";
import {IsAnswered} from "../enums/isAnswered";
import GestureRecognizer from "react-native-swipe-gestures"
import GlobalStyles from "../utils/globalStyles"
import BottomBarLogo from "./bottomBarLogo";
import Modal from "./modal";
import ModalRemoveQuestions from "./modalRemoveQuestions";

const QuestionView: React.FC = (props) => {

    const [questionsData, setQuestionsData] = useState<any>({
        allQuestions: [],
        isNextQuestionViewable: false,
        currentQuestion: {},
        rightAnswer: {},
        rightAnswerGuessed: false,
        wrongAnswerGuessed: false,
        guessChoice: [],
        guesses: [],
        categories: [],
        results: {
            wrongAnswersWithExplanation: [],
            wrongAnswers: [],
            wrongAnswer: [],
            correctAnswers: [],
            timesCorrect: 0,
            stateWithCategories: [],
        }
    });
    const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState<boolean>(false);
    const [isViewable, setIsViewable] = useState(false);

    useEffect(() => {
        const isViewable = props.isNextQuestionViewable();
        setIsViewable(isViewable);
        const correctAnswer = props.question.options.find((option) => option.isCorrect === true);
        const allQuestions = [...props.allQuestions];
        const currentQuestion = props.question;
        setDisplayCorrectAnswer(false);

        setQuestionsData({
            ...questionsData,
            currentQuestion: currentQuestion,
            allQuestions: allQuestions,
            rightAnswer: correctAnswer,
            isNextQuestionViewable: isViewable,
            rightAnswerGuessed: false,
            wrongAnswerGuessed: false
        })
    }, [props.question]);

    function wrongAnswer(event, choice) {

        updateQuestionProperty(event, choice);

        let previousGuesses = [...questionsData.guesses];
        let updatedWrongAnswers = [...questionsData.results.wrongAnswers];
        let previousStateCategories = [...questionsData.results.stateWithCategories];
        let previousCategories = [...questionsData.categories];
        updatedWrongAnswers.push({choice: choice.choice, explanation: choice.explanation});

        const category = props.question.category;

        if (!previousGuesses.includes(choice.choice)) {
            previousGuesses.push(choice.choice);
        }

        if (questionsData.categories.includes(category)) {
            questionsData.results.stateWithCategories.forEach(item => {
                if (item.name === category) {
                    item.totalQuestions++;
                }
            });
        } else {
            previousCategories.push(category);
            const freshCategoryCounter = {
                name: category,
                timesCorrect: 0,
                totalQuestions: 1
            };

            previousStateCategories.push(freshCategoryCounter);
        }

        setQuestionsData({
            ...questionsData,
            wrongAnswerGuessed: true,
            categories: previousCategories,
            guesses: previousGuesses,
            results: {
                ...questionsData.results,
                wrongAnswersWithExplanation: updatedWrongAnswers,
                wrongAnswers: updatedWrongAnswers,
                wrongAnswer: [choice.choice],
                stateWithCategories: previousStateCategories
            }
        })

        setDisplayCorrectAnswer(true);

    }

    function correctAnswer(event, choice) {

        updateQuestionProperty(event, choice);

        let guessedChoiceInformation = [choice.choice, choice.explanation];
        let previousCorrectAnswers = [...questionsData.results.correctAnswers];
        let previousStateCategories = [...questionsData.results.stateWithCategories];
        let previousCategories = [...questionsData.categories];
        previousCorrectAnswers.push(choice.choice);

        const category = props.question.category;

        if (questionsData.categories.includes(category)) {
            questionsData.results.stateWithCategories.forEach(item => {
                if (item.name === category) {
                    item.timesCorrect++;
                    item.totalQuestions++;
                }
            });
        } else {
            previousCategories.push(category);
            const freshCategoryWithCounter = {
                name: category,
                timesCorrect: 1,
                totalQuestions: 1,
            }

            previousStateCategories.push(freshCategoryWithCounter);
        }

        setQuestionsData({
            ...questionsData,
            guessChoice: guessedChoiceInformation,
            rightAnswerGuessed: true,
            categories: previousCategories,
            results: {
                ...questionsData.results,
                correctAnswers: previousCorrectAnswers,
                timesCorrect: questionsData.results.timesCorrect + 1,
                stateWithCategories: previousStateCategories
            }
        })

        setTimeout(() => {
            props.displayNextQuestion(null, questionsData.guessChoice)
        }, 1000)
    }

    function updateQuestionProperty(event: any, choice: any): void {
        const allQuestions = [...questionsData.allQuestions];
        const currentQuestionToUpdate = allQuestions.find(option => option.question === questionsData.currentQuestion.question);

        currentQuestionToUpdate.answered = IsAnswered.yes;
        currentQuestionToUpdate.options.forEach(option => option.choice === choice.choice ? choice.chosen = IsAnswered.yes : null);

        allQuestions.forEach(question => question.question === currentQuestionToUpdate.question ? currentQuestionToUpdate : null);

        setQuestionsData({
            ...questionsData,
            rightAnswerGuessed: true,
            allQuestions: allQuestions
        })
    }

    function checkIfAnswerIsCorrect(event, choice) {
        if (choice.isCorrect === true) {
            correctAnswer(event, choice);
        } else {
            wrongAnswer(event, choice);
        }
    }

    const {height, width} = Dimensions.get('window');

    return (
        <GestureRecognizer style={{height: height, width: width}} onSwipeLeft={() => props.viewNextQuestion()} onSwipeRight={() => props.counter > 1 ? props.viewPreviousQuestion() : null}>
        <View style={styles.container}>
            <FadeIn>
                {props.scoreBoard !== true ? <>
                        <View style={styles.counterContainer}>
                            <Text style={styles.questionHeading}>{props.question.question}</Text>
                        </View>
                    <View style={styles.totalQuestions}>
                        <Text style={styles.counter}>Question {props.counter} of {props.totalQuestions}</Text>
                        <TouchableOpacity>
                            <Modal children={<ModalRemoveQuestions {...props} />}/>
                        </TouchableOpacity>
                    </View>

                        {props.question.options !== undefined ? props.question.options.map(optionToChoose => {
                            return <View key={optionToChoose.choice}
                                         style={
                                             [
                                                 styles.viewContainer,
                                                 {
                                                     backgroundColor:
                                                         displayCorrectAnswer === true && questionsData.rightAnswer.choice === optionToChoose.choice ? "green" :
                                                             questionsData.results.wrongAnswer.includes(optionToChoose.choice) ? "red" :
                                                                 questionsData.guessChoice.includes(optionToChoose.choice) ? "green" :
                                                                     questionsData.rightAnswer.choice === optionToChoose.choice && questionsData.currentQuestion.answered === IsAnswered.yes ? "green" :
                                                                         questionsData.guesses.includes(optionToChoose.choice) && questionsData.currentQuestion.answered === IsAnswered.yes ? "red" : "white"
                                                 },
                                             ]}>

                                <Button
                                    color={questionsData.guessChoice.includes(optionToChoose.choice) ? "white" : "white" &&
                                    questionsData.results.wrongAnswer.includes(optionToChoose.choice) ? "white" : GlobalStyles.darkColor}
                                    disabled={questionsData.rightAnswerGuessed && !
                                                questionsData.guessChoice.includes(optionToChoose.choice) ||
                                                questionsData.wrongAnswerGuessed ||
                                                questionsData.currentQuestion.answered === IsAnswered.yes}
                                    title={optionToChoose.choice}
                                    onPress={questionsData.guessChoice.includes(optionToChoose.choice) ? null : (option) => {
                                        checkIfAnswerIsCorrect(option, optionToChoose);
                                    }}/>
                            </View>;
                        }) : null}

                        {questionsData.wrongAnswerGuessed ?
                            <React.Fragment>
                                <View>
                                    {<Text style={styles.errorMessage}>{questionsData.rightAnswer.explanation}</Text>}
                                </View>
                                <View style={styles.nextQuestion}>
                                    <Button color={GlobalStyles.darkColor} title={"Next Question!"}
                                            onPress={() => props.displayNextQuestion(null, questionsData.guessChoice)}
                                    />
                                </View>
                            </React.Fragment>
                            : null}</> :

                    <Score
                        categoryAnswers={questionsData.results.stateWithCategories}

                        id={props.id}
                        allQuestions={props.allQuestions} firstTry={questionsData.results.timesCorrect}
                        totalQuestions={props.totalQuestions}
                        navigation={props.navigation}
                        results={questionsData.results}/>}

                {questionsData.wrongAnswerGuessed ? null : <View style={styles.prevAndNextContainer}>
                    {props.counter > 1 ? <View style={[ styles.prevAndNext,  {backgroundColor: "white"}, {width: isViewable === false ? "100%" : "40%"}]}><Button color={"black"} title={"Previous"} onPress={props.viewPreviousQuestion}/></View>  : null}
                    {isViewable === true ?  <View style={[ styles.prevAndNext, {backgroundColor: "white"}, {width: props.counter <= 1 ? "100%" : "40%"}]}><Button color={"black"} title={"Next"} onPress={props.viewNextQuestion}/></View> : null}
                </View>}



            </FadeIn>
            <BottomBarLogo/>
        </View>
        </GestureRecognizer>

    );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
    prevAndNextContainer: {
      display: "flex",
        flexDirection: "row",
        marginTop: 50,
        width: 250,
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
    },
    viewContainer: {
        borderRadius: 10,
        width: 250,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    },
    totalQuestions: {
      flexDirection: "row",
      justifyContent: "center"
    },
    prevAndNext: {
        width: "100%",
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        borderRadius: 10,
        padding: 2,
        margin: 10
    },
    container: {
        padding: 40,
        height: height * 0.9,
    },
    counter: {
        paddingBottom: 5,
        paddingTop: 15,
        fontSize: 12,
        textAlign: "center",
        color: GlobalStyles.darkColor
    },
    buttonContainer: {
        backgroundColor: "blue",
        margin: 10,
        borderRadius: 10
    },
    counterContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    questionHeading: {
        color: GlobalStyles.darkColor,
        fontSize: 24,
        textAlign: "center",
        paddingBottom: 10,
        marginTop: 20
    },
    errorMessage: {
        textAlign: "center",
        paddingTop: 10,
        color: GlobalStyles.darkColor
    },
    correctMessage: {},
    congratulationsMessage: {
        textAlign: "center",
        color: "green",
        paddingTop: 10
    },
    nextQuestion: {
        backgroundColor: "white",
        borderRadius: 10,
        color: GlobalStyles.darkColor,
        marginTop: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    }
});


export default QuestionView;
