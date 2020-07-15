import React, {useEffect, useState} from 'react';
import {Button, Dimensions, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Score from "./score";
import {IsAnswered} from "../enums/isAnswered";
import GestureRecognizer from "react-native-swipe-gestures"
import GlobalStyles from "../utils/globalStyles"
import BottomBarLogo from "./bottomBarLogo";
import Modal from "./modal";
import ModalRemoveQuestions from "./modalRemoveQuestions";

const QuestionView = (props) => {

    const [questionsData, setQuestionsData] = useState({
        allQuestions: [],
        isNextQuestionViewable: false,
        currentQuestion: {},
        rightAnswer: {}
    });

    const [guessesAndChoices, setGuessesAndChoices] = useState({
        rightAnswerGuessed: false,
        wrongAnswerGuessed: false,
        guessChoice: [],
        guesses: []
    });

    const [results, setResults] = useState({
        wrongAnswersWithExplanation: [],
        wrongAnswers: [],
        wrongAnswer: [],
        correctAnswers: [],
        timesCorrect: 0,
        stateWithCategories: [],
    });

    const [categories, setCategories] = useState<[]>([]);
    const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState<boolean>(false);

    useEffect(() => {
        let correctAnswer: object;
        if (props.question !== undefined) {
            correctAnswer = props.question.options.find((option) => option.isCorrect === true);
        }
        setDisplayCorrectAnswer(false);

        setQuestionsData({
            allQuestions: props.allQuestions,
            currentQuestion: props.question,
            isNextQuestionViewable: props.isNextQuestionViewable(),
            rightAnswer: correctAnswer
        });

        setGuessesAndChoices({
            ...guessesAndChoices,
            rightAnswerGuessed: false,
            wrongAnswerGuessed: false
        });

    }, [props.question]);

    const updateCategories = (category: any, wasCorrect: boolean): any => {

        let previousStateCategories = [...results.stateWithCategories];
        let previousCategories = categories;
        let timesCorrectValue = 0;

        if (wasCorrect === true) timesCorrectValue = 1;

        if (categories.includes(category)) {
            previousStateCategories.forEach(item => {
                if (item.name === category) {
                    item.totalQuestions++;
                    if (wasCorrect === true) item.timesCorrect++;
                }
            });
        } else {
            previousCategories.push(category);
            const freshCategoryCounter = {
                name: category,
                timesCorrect: timesCorrectValue,
                totalQuestions: 1
            };
            previousStateCategories.push(freshCategoryCounter);
        }

        return {
            previousStateCategories,
            previousCategories
        };
    };

    function wrongAnswer(event, choice) {

        updateQuestionProperty(event, choice);

        let previousGuesses = [...guessesAndChoices.guesses];
        let updatedWrongAnswers = [...results.wrongAnswers];
        updatedWrongAnswers.push({choice: choice.choice, explanation: choice.explanation});

        const category = props.question.category;

        if (!previousGuesses.includes(choice.choice)) {
            previousGuesses.push(choice.choice);
        }

        const updatedCategories = updateCategories(category, false);

        setGuessesAndChoices({
            ...guessesAndChoices,
            wrongAnswerGuessed: true,
            guesses: previousGuesses,
        });

        setResults({
            ...results,
            wrongAnswersWithExplanation: updatedWrongAnswers,
            wrongAnswers: updatedWrongAnswers,
            wrongAnswer: [choice.choice],
            stateWithCategories: updatedCategories.previousStateCategories
        });

        setCategories(updatedCategories.previousCategories);

        setDisplayCorrectAnswer(true);

    }

    function correctAnswer(event, choice) {

        updateQuestionProperty(event, choice);

        let guessedChoiceInformation = [choice.choice, choice.explanation];
        let previousCorrectAnswers = [...results.correctAnswers];
        previousCorrectAnswers.push(choice.choice);

        const category = props.question.category;

        const updatedCategories = updateCategories(category, true);

        setGuessesAndChoices({
            ...guessesAndChoices,
            guessChoice: guessedChoiceInformation,
            rightAnswerGuessed: true,
        });

        setResults({
            ...results,
            correctAnswers: previousCorrectAnswers,
            timesCorrect: results.timesCorrect + 1,
            stateWithCategories: updatedCategories.previousStateCategories
        });

        setCategories(updatedCategories.previousCategories);

        setTimeout(() => {
            props.displayNextQuestion(null, guessesAndChoices.guessChoice);
        }, 1000);
    }

    function updateQuestionProperty(event: any, choice: any): void {
        const allQuestions = [...questionsData.allQuestions];
        const currentQuestionToUpdate = allQuestions.find(option => option.question === questionsData.currentQuestion.question);

        currentQuestionToUpdate.answered = IsAnswered.yes;
        currentQuestionToUpdate.options.forEach(option => option.choice === choice.choice ? choice.chosen = IsAnswered.yes : null);

        allQuestions.forEach(question => question.question === currentQuestionToUpdate.question ? currentQuestionToUpdate : null);

        setQuestionsData({
            ...questionsData,
            allQuestions: allQuestions
        });

        setGuessesAndChoices({
            ...guessesAndChoices,
            rightAnswerGuessed: true,
        });
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
                {props.scoreBoard !== true ? <>
                        <View style={styles.counterContainer}>
                            <Text style={styles.questionHeading}>{questionsData.currentQuestion.question}</Text>
                        </View>
                    <View style={styles.totalQuestions}>
                        <Text style={styles.counter}>Question {props.counter} of {props.totalQuestions}</Text>
                        <TouchableOpacity>
                            <Modal children={<ModalRemoveQuestions {...props} />}/>
                        </TouchableOpacity>
                    </View>

                        {questionsData.currentQuestion.options !== undefined ? questionsData.currentQuestion.options.map(optionToChoose => {
                            return <View key={optionToChoose.choice}
                                         style={
                                             [
                                                 styles.viewContainer,
                                                 {
                                                     backgroundColor:
                                                         displayCorrectAnswer === true && questionsData.rightAnswer.choice === optionToChoose.choice ? "green" :
                                                             results.wrongAnswer.includes(optionToChoose.choice) ? "red" :
                                                                 guessesAndChoices.guessChoice.includes(optionToChoose.choice) ? "green" :
                                                                     questionsData.rightAnswer.choice === optionToChoose.choice && questionsData.currentQuestion.answered === IsAnswered.yes ? "green" :
                                                                         guessesAndChoices.guesses.includes(optionToChoose.choice) && questionsData.currentQuestion.answered === IsAnswered.yes ? "red" : "white"
                                                 },
                                             ]}>

                                <Button
                                    color={guessesAndChoices.guessChoice.includes(optionToChoose.choice) ? "white" : "white" &&
                                    results.wrongAnswer.includes(optionToChoose.choice) ? "white" : GlobalStyles.darkColor}
                                    disabled={guessesAndChoices.rightAnswerGuessed && !
                                        guessesAndChoices.guessChoice.includes(optionToChoose.choice) ||
                                    guessesAndChoices.wrongAnswerGuessed ||
                                    questionsData.currentQuestion.answered === IsAnswered.yes}
                                    title={optionToChoose.choice}
                                    onPress={guessesAndChoices.guessChoice.includes(optionToChoose.choice) ? null : (option) => {
                                        checkIfAnswerIsCorrect(option, optionToChoose);
                                    }}/>
                            </View>;
                        }) : null}

                        {guessesAndChoices.wrongAnswerGuessed ?
                            <React.Fragment>
                                <View>
                                    {<Text style={styles.errorMessage}>{questionsData.rightAnswer.explanation}</Text>}
                                </View>
                                <View style={styles.nextQuestion}>
                                    <Button color={GlobalStyles.darkColor} title={"Next Question!"}
                                            onPress={() => props.displayNextQuestion(null, guessesAndChoices.guessChoice)}
                                    />
                                </View>
                            </React.Fragment>
                            : null}</> :

                    <Score
                        categoryAnswers={results.stateWithCategories}
                        firstTry={results.timesCorrect}
                        totalQuestions={props.totalQuestions}
                        navigation={props.navigation}
                        results={results}/>}

                {guessesAndChoices.wrongAnswerGuessed ? null : <View style={styles.prevAndNextContainer}>
                    {props.counter > 1 ? <View
                        style={[styles.prevAndNext, {backgroundColor: "white"}, {width: questionsData.isNextQuestionViewable === false ? "100%" : "40%"}]}><Button
                        color={"black"} title={"Previous"} onPress={props.viewPreviousQuestion}/></View> : null}
                    {questionsData.isNextQuestionViewable === true ? <View
                        style={[styles.prevAndNext, {backgroundColor: "white"}, {width: props.counter <= 1 ? "100%" : "40%"}]}><Button
                        color={"black"} title={"Next"} onPress={props.viewNextQuestion}/></View> : null}
                </View>}



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
      justifyContent: "center",
        marginRight: 10
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
