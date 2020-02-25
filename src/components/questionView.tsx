import React, {useEffect, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View} from "react-native";
import Score from "./Score";

const FadeIn = props => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000
            }
        ).start();
    }, []);

    return (
        <Animated.View style={{opacity: fadeAnim}}>{props.children}</Animated.View>
    );
};

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

    useEffect(() => {
        setAnsweredCorrectly(false);
        setIncorrectChoice([]);
        setTempWrongAnswers([]);
    }, [props.question]);

    function checkIfAnswerIsCorrect(event, choice) {
        if (choice.isCorrect === true) {
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

        } else {
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
    }

    return (
        <View style={styles.container}>
            <FadeIn>
                <View style={styles.counterContainer}><Text
                    style={styles.counter}>Question {props.counter} of {props.totalQuestions}</Text></View>
                {props.scoreBoard !== true ? <><Text style={styles.questionHeading}>{props.question.question}</Text>
                        {props.question.options.map(optionToChoose => {
                            return <View key={optionToChoose.choice}
                                         style={{
                                             backgroundColor: correctChoice.includes(optionToChoose.choice) ? "green" : null || wrongAnswer.includes(optionToChoose.choice) ? "red" : "white",
                                             borderRadius: 10,
                                             width: 250,
                                             marginLeft: "auto",
                                             marginRight: "auto",
                                             marginTop: 10,
                                             marginBottom: 10
                                         }}><Button
                                color={correctChoice.includes(optionToChoose.choice) ? "white" : "white" && wrongAnswer.includes(optionToChoose.choice) ? "white" : "green"}
                                disabled={answeredCorrectly && !correctChoice.includes(optionToChoose.choice)}
                                key={optionToChoose.choice}
                                title={correctChoice.includes(optionToChoose.choice) ? "Correct!" : optionToChoose.choice}
                                onPress={correctChoice.includes(optionToChoose.choice) ? null : (option) => {

                                    if (optionToChoose.isCorrect !== true) {
                                        let updatedTempWrongAnswers = [...tempWrongAnswers];
                                        updatedTempWrongAnswers.push(optionToChoose.choice);
                                        setTempWrongAnswers(updatedTempWrongAnswers);
                                    } else {
                                        if (tempWrongAnswers.length === 0) {
                                            setFirstTryCorrect(firstTryCorrect + 1);
                                        }
                                    }

                                    checkIfAnswerIsCorrect(option, optionToChoose);
                                }
                                }/></View>;

                        })}
                        {answeredCorrectly ?
                            <View><Text style={styles.congratulationsMessage}>Congratulations! {correctChoice[0]} is
                                Correct!</Text><Text
                                style={styles.congratulationsMessage}>{correctChoice[1]}</Text></View> : incorrectChoice.map(choice => {
                                return <View key={choice.choice}><Text
                                    style={styles.errorMessage}>[{choice.choice}]: {choice.explanation}</Text></View>;
                            })}
                        {answeredCorrectly ?
                            <View style={styles.nextQuestion}><Button color={"white"} title={"Next Question!"}
                                                                      onPress={() => props.displayNextQuestion(null, correctChoice)}/></View>
                            : null}</> :
                    <Score
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
        marginTop: 20
    }
});


export default QuestionView;
