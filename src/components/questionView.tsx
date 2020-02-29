import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Score from "./Score";
import FadeIn from "./fadeIn";

const QuestionView: React.FC<props> = (props) => {

    const [correctChoice, setCorrectChoice] = useState([]);
    const [incorrectChoice, setIncorrectChoice] = useState([]);
    const [wrongAnswer, setWrongAnswer] = useState([]);
    const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
    const [firstTryCorrect, setFirstTryCorrect] = useState(0);
    const [tempWrongAnswers, setTempWrongAnswers] = useState([]);
    const [results, setResults] = useState({
        wrongAnswers: [],
        correctAnswers: [],
        firstTryCorrect: 0
    });
    const [categoriesWithCorrectAnswers, setCategoriesWithCorrectAnswers] = useState([]);

    useEffect(() => {
        setAnsweredCorrectly(false);
        setIncorrectChoice([]);
        setTempWrongAnswers([]);
    }, [props.question]);

    function correctAnswer(event, choice) {
        let correctArray = [choice.choice, choice.explanation];
        setCorrectChoice(correctArray);
        setAnsweredCorrectly(true);
        let correct = [...results.correctAnswers];

        if (!correct.includes(choice.choice)) {
            correct.push(choice.choice);
            setResults({
                ...results,
                correctAnswers: correct
            });
        }
    }

    function wrongAnswerExec(event, choice) {
        let wrong = [...results.wrongAnswers];
        if (!wrong.includes(choice.choice)) {
            wrong.push(choice.choice);
            setResults({
                ...results,
                wrongAnswers: wrong
            });
        }

        let updatedWrongAnswers = [...wrongAnswer];
        updatedWrongAnswers.push(choice.choice);
        setWrongAnswer(updatedWrongAnswers);
        let updatedIncorrectChoices = [...incorrectChoice];
        const toAdd = updatedIncorrectChoices.every(obj => {
            return obj.choice !== choice.choice;
        });

        if (toAdd !== false) {
            updatedIncorrectChoices.push({choice: choice.choice, explanation: choice.explanation});
            setIncorrectChoice(updatedIncorrectChoices);
        }
    }

    function createNewTempWrongAnswers(optionToChoose) {
        let updatedTempWrongAnswers = [...tempWrongAnswers];
        updatedTempWrongAnswers.push(optionToChoose.choice);
        setTempWrongAnswers(updatedTempWrongAnswers);
    }

    function checkIfAnswerIsCorrect(event, choice) {
        if (choice.isCorrect === true) {
            correctAnswer(event, choice);
        } else {
            wrongAnswerExec(event, choice);
        }
    }

    function firstTryCorrectExec(stateCategories, category, doesExist) {
        setFirstTryCorrect(firstTryCorrect + 1);

        if (doesExist === false) {
            const freshCategoryWithCounter = {
                name: category,
                firstTry: 1,
                totalQuestions: 1
            };
            stateCategories.push(freshCategoryWithCounter);
            setCategoriesWithCorrectAnswers(stateCategories);
        } else {
            stateCategories.forEach(category => {
                if (category.name === props.question.category) {
                    category.firstTry++;
                    category.totalQuestions++;
                }
            });
            setCategoriesWithCorrectAnswers(stateCategories);
        }
    }

    function notFirstTryCorrect(doesExist, category, stateCategories) {
        if (doesExist === false) {
            const freshCategoryCounter = {
                name: category,
                firstTry: 0,
                totalQuestions: 1
            };
            stateCategories.push(freshCategoryCounter);
            setCategoriesWithCorrectAnswers(stateCategories);
        } else {
            stateCategories.forEach(category => {
                if (category.name === props.question.category) {
                    category.totalQuestions++;
                }
            });
            setCategoriesWithCorrectAnswers(stateCategories);
        }
    }

    function checkAndCreateExists() {
        let doesExist = false;
        categoriesWithCorrectAnswers.forEach(category => {
            if (category.name === props.question.category) return doesExist = true;
        });

        const category = props.question.category;
        let stateCategories = [...categoriesWithCorrectAnswers];

        if (tempWrongAnswers.length === 0) {
            firstTryCorrectExec(stateCategories, category, doesExist);
        } else {
            notFirstTryCorrect(doesExist, category, stateCategories);
        }
    }

    function checkAndCreateCategoryObject(optionToChoose) {
        if (optionToChoose.isCorrect !== true) {
            createNewTempWrongAnswers(optionToChoose);
        } else {
            checkAndCreateExists();
        }
    }

    return (
        <View style={styles.container}>
            <FadeIn>
                <View style={styles.counterContainer}><Text
                    style={styles.counter}>Question {props.counter} of {props.totalQuestions}</Text></View>
                {props.scoreBoard !== true ? <><Text style={styles.questionHeading}>{props.question.question}</Text>
                        {props.question.options.map(optionToChoose => {
                            return <View key={optionToChoose.choice}
                                         style={[styles.viewContainer, {backgroundColor: correctChoice.includes(optionToChoose.choice) ? "green" : null || wrongAnswer.includes(optionToChoose.choice) ? "red" : "white"}]}>

                                <Button
                                    color={correctChoice.includes(optionToChoose.choice) ? "white" : "white" && wrongAnswer.includes(optionToChoose.choice) ? "white" : "green"}
                                    disabled={answeredCorrectly && !correctChoice.includes(optionToChoose.choice)}
                                    title={correctChoice.includes(optionToChoose.choice) ? "Correct!" : optionToChoose.choice}
                                    onPress={correctChoice.includes(optionToChoose.choice) ? null : (option) => {
                                        checkAndCreateCategoryObject(optionToChoose);
                                        checkIfAnswerIsCorrect(option, optionToChoose);
                                    }}/>
                            </View>;
                        })}

                        {answeredCorrectly ?
                            <View>
                                <Text
                                    style={styles.congratulationsMessage}>{correctChoice[1]}
                                </Text>
                            </View>
                            : incorrectChoice.map(choice => {
                                return (
                                    <View key={choice.choice}>
                                        <Text
                                            style={styles.errorMessage}>[{choice.choice}]: {choice.explanation}
                                        </Text>
                                    </View>
                                );
                            })}

                        {answeredCorrectly ?
                            <View style={styles.nextQuestion}>
                                <Button color={"white"} title={"Next Question!"}
                                        onPress={() => props.displayNextQuestion(null, correctChoice)}
                                />
                            </View>
                            : null}</> :

                    <Score
                        categoryAnswers={categoriesWithCorrectAnswers}
                        id={props.id}
                        allQuestions={props.allQuestions} firstTry={firstTryCorrect}
                        totalQuestions={props.totalQuestions}
                        navigation={props.navigation}
                        results={results}/>}

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
        padding: 20
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
