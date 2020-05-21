import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Score from "./score";
import FadeIn from "./fadeIn";

const QuestionView: React.FC = (props) => {

    const [questionsData, setQuestionsData] = useState<any>({
        rightAnswer: {},
        rightAnswerGuessed: false,
        wrongAnswerGuessed: false,
        guessChoice: [],
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

    useEffect(() => {
        const correctAnswer = props.question.options.find((option) => option.isCorrect === true);
        setDisplayCorrectAnswer(false);

        setQuestionsData({
            ...questionsData,
            rightAnswer: correctAnswer,
            rightAnswerGuessed: false,
            wrongAnswerGuessed: false
        })
    }, [props.question]);

    function wrongAnswer(event, choice) {

        let updatedWrongAnswers = [...questionsData.results.wrongAnswers];
        let previousStateCategories = [...questionsData.results.stateWithCategories];
        let previousCategories = [...questionsData.categories];
        updatedWrongAnswers.push({choice: choice.choice, explanation: choice.explanation});

        const category = props.question.category;

        console.log("CATEGORY", category);
        console.log("STATE CATEGORIES", questionsData.categories);
        if (questionsData.categories.includes(category)) {
            questionsData.results.stateWithCategories.forEach(item => {
                if (item.name === category) {
                    item.totalQuestions++;
                }
            });
        } else {
            console.log("CREATING FRESH OBJECT");
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

    function checkIfAnswerIsCorrect(event, choice) {
        if (choice.isCorrect === true) {
            correctAnswer(event, choice);
        } else {
            wrongAnswer(event, choice);
        }
    }

    return (
        <View style={styles.container}>
            <FadeIn>
                <View style={styles.counterContainer}>
                    <Text style={styles.counter}>Question {props.counter} of {props.totalQuestions}</Text>
                </View>
                {props.scoreBoard !== true ? <>
                        <Text style={styles.questionHeading}>{props.question.question}</Text>
                        {props.question.options.map(optionToChoose => {
                            return <View key={optionToChoose.choice}
                                         style={
                                             [
                                                 styles.viewContainer,
                                                 {
                                                     backgroundColor:
                                                         displayCorrectAnswer === true && questionsData.rightAnswer.choice === optionToChoose.choice ? "green" :
                                                             questionsData.results.wrongAnswer.includes(optionToChoose.choice) ? "red" :
                                                                 questionsData.guessChoice.includes(optionToChoose.choice) ? "green" : "white"
                                                 },
                                             ]}>

                                <Button
                                    color={questionsData.guessChoice.includes(optionToChoose.choice) ? "white" : "white" && questionsData.results.wrongAnswer.includes(optionToChoose.choice) ? "white" : "green"}
                                    disabled={questionsData.rightAnswerGuessed && !questionsData.guessChoice.includes(optionToChoose.choice) || questionsData.wrongAnswerGuessed}
                                    title={optionToChoose.choice}
                                    onPress={questionsData.guessChoice.includes(optionToChoose.choice) ? null : (option) => {
                                        checkIfAnswerIsCorrect(option, optionToChoose);
                                    }}/>
                            </View>;
                        })}

                        {questionsData.wrongAnswerGuessed ?
                            <React.Fragment>
                                <View>
                                    {<Text style={styles.errorMessage}>{questionsData.rightAnswer.explanation}</Text>}
                                </View>
                                <View style={styles.nextQuestion}>
                                    <Button color={"white"} title={"Next Question!"}
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

            </FadeIn>
        </View>

    );
};

const styles = StyleSheet.create({
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
    container: {
        padding: 20,
    },
    counter: {
        paddingBottom: 5,
        textAlign: "center",
        color: "green"
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
        color: "green",
        fontSize: 16,
        textAlign: "center",
        paddingBottom: 20,
        marginTop: 20
    },
    errorMessage: {
        textAlign: "center",
        paddingTop: 10,
        color: "red"
    },
    correctMessage: {},
    congratulationsMessage: {
        textAlign: "center",
        color: "green",
        paddingTop: 10
    },
    nextQuestion: {
        backgroundColor: "green",
        borderRadius: 10,
        color: "white",
        marginTop: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    }
});


export default QuestionView;
