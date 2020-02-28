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
    const [categoriesWithCorrectAnswers, setCategoriesWithCorrectAnswers] = useState([]);

    const [frontAnimatedStyle, setFrontAnimatedStyle] = useState();
    const [backAnimatedStyle, setBackAnimatedStyle] = useState();
    const [animatedValue, setAnimatedValue] = useState();

    const [addWhatCardToFlip, setAddWhatCardToFlip] = useState([]);

    useEffect(() => {
        setAnsweredCorrectly(false);
        setIncorrectChoice([]);
        setTempWrongAnswers([]);
    }, [props.question]);

    useEffect(() => {


    }, []);

    function flipCard(option) {
        let updatedArray = [...addWhatCardToFlip];
        if (updatedArray.includes(option.choice)) {
            return;
        }

        updatedArray.push(option.choice);
        setAddWhatCardToFlip(updatedArray);

    }

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
                                             padding: 5,
                                             marginTop: 10,
                                             marginBottom: 10,
                                             shadowOffset: {width: 0, height: 0},
                                             shadowColor: "#000",
                                             elevation: 100,
                                             shadowRadius: 5,
                                             shadowOpacity: 0.1
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

                                        let doesExist = false;
                                        categoriesWithCorrectAnswers.forEach(category => {
                                            if (category.name === props.question.category) return doesExist = true;
                                        });

                                        const category = props.question.category;
                                        let stateCategories = [...categoriesWithCorrectAnswers];

                                        if (tempWrongAnswers.length === 0) {
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
                                        } else {
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
                                    }
                                    checkIfAnswerIsCorrect(option, optionToChoose);
                                }
                                }/></View>;

                        })}
                        <Text>THIS IS FLIP CARD SECTION TESTING</Text>
                        {props.question.options.map(optionToChoose => {

                            return <TouchableOpacity
                                key={optionToChoose.choice}
                                onPress={() => {
                                    flipCard(optionToChoose);
                                    const animatedValue = new Animated.Value(0);
                                    const frontInterpolate = animatedValue.interpolate({
                                        inputRange: [0, 180],
                                        outputRange: ["0deg", "180deg"],
                                    });

                                    const backInterpolate = animatedValue.interpolate({
                                        inputRange: [0, 180],
                                        outputRange: ["180deg", "360deg"],
                                    });

                                    const front = {
                                        transform: [
                                            {rotateY: frontInterpolate}
                                        ]
                                    };

                                    setFrontAnimatedStyle({
                                        transform: [
                                            {rotateY: frontInterpolate}
                                        ]
                                    });

                                    setBackAnimatedStyle({
                                        transform: [
                                            {rotateY: backInterpolate}
                                        ]
                                    });
                                    Animated.timing(animatedValue, {
                                        toValue: 180,
                                        duration: 800
                                    }).start();
                                }}>
                                <View>

                                    {addWhatCardToFlip.includes(optionToChoose.choice)
                                        ?
                                        <View>
                                            <Animated.View
                                                style={[flipStyles.flipCard, frontAnimatedStyle]}>
                                                <Text>{optionToChoose.choice}</Text>
                                            </Animated.View>
                                            <Animated.View
                                                style={[flipStyles.flipCard, flipStyles.flipCardBack, backAnimatedStyle
                                                ]}>
                                                <Text>{optionToChoose.explanation}</Text>
                                            </Animated.View>
                                        </View>
                                        :
                                        <View>
                                            <View style={flipStyles.flipCard}>
                                                <Text>{optionToChoose.choice}</Text>
                                            </View>
                                        </View>}

                                </View>
                            </TouchableOpacity>;
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

const flipStyles = StyleSheet.create({
    flipCard: {
        width: 200,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        backfaceVisibility: "hidden",
        borderRadius: 10,
        margin: 10,
    },
    flipCardBack: {
        backgroundColor: "blue",
        position: "absolute",
        top: 0
    }
});

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
        marginTop: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    }
});


export default QuestionView;
