import { Text } from "@ui-kitten/components";
import { default as React, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import GestureRecognizer from "react-native-swipe-gestures";
import { IsAnswered } from "../enums/isAnswered";
import Question from "../interfaces/question";
import GlobalStyles from "../utils/globalStyles";
import BottomBarLogo from "./bottomBarLogo";
import ModalRemoveQuestions from "./modalRemoveQuestions";
import Score from "./score";

const QuestionView = (props) => {
  const [questionsData, setQuestionsData] = useState({
    allQuestions: [],
    isNextQuestionViewable: false,
    currentQuestion: {},
    rightAnswer: {},
  });

  const [guessesAndChoices, setGuessesAndChoices] = useState({
    rightAnswerGuessed: false,
    wrongAnswerGuessed: false,
    guessChoice: [],
    guesses: [],
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
  const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState<boolean>(
    false
  );

  useEffect(() => {
    let correctAnswer: object, canWeViewNextQ;
    if (props.question !== undefined) {
      correctAnswer = props.question.options.find(
        (option) => option.correct === true
      );
      canWeViewNextQ = props.isNextQuestionViewable();
    }

    setDisplayCorrectAnswer(false);
    setQuestionsData({
      allQuestions: props.allQuestions,
      currentQuestion: props.question,
      isNextQuestionViewable: canWeViewNextQ,
      rightAnswer: correctAnswer,
    });

    setGuessesAndChoices({
      ...guessesAndChoices,
      rightAnswerGuessed: false,
      wrongAnswerGuessed: false,
    });
  }, [props.question]);

  const updateCategories = (category: any, wasCorrect: boolean): any => {
    let previousStateCategories = [...results.stateWithCategories];
    let previousCategories = categories;
    let timesCorrectValue = 0;

    if (wasCorrect === true) timesCorrectValue = 1;

    if (categories.includes(category)) {
      previousStateCategories.forEach((item) => {
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
        totalQuestions: 1,
      };
      previousStateCategories.push(freshCategoryCounter);
    }

    return {
      previousStateCategories,
      previousCategories,
    };
  };

  function beforeResetQuestionsHandler() {
    setResults({
      wrongAnswersWithExplanation: [],
      wrongAnswers: [],
      wrongAnswer: [],
      correctAnswers: [],
      timesCorrect: 0,
      stateWithCategories: [...results.stateWithCategories],
    });
    setGuessesAndChoices({
      rightAnswerGuessed: false,
      wrongAnswerGuessed: false,
      guessChoice: [],
      guesses: [],
    });
    props.resetQuestions();
  }

  function beforeUpdatingQuestionsHandler(
    allQuestions: Array<Question>,
    removedQuestions: Array<Question>,
    removedQuestionsNames: Array<string>
  ) {
    let categoriesInfo = [...results.stateWithCategories];

    let allOptions = [];
    for (let i = 0; i < removedQuestions.length; i++) {
      allOptions.push(removedQuestions[i].options);
    }

    let whatToRemoveHash = {};
    for (let i = 0; i < removedQuestions.length; i++) {
      if (removedQuestions[i].answered === IsAnswered.no) {
      } else {
        if (whatToRemoveHash.hasOwnProperty(removedQuestions[i].category)) {
          if (removedQuestions[i].answeredCorrectly === 1) {
            whatToRemoveHash[removedQuestions[i].category].totalQuestions++;
            whatToRemoveHash[removedQuestions[i].category].correct++;
          } else {
            whatToRemoveHash[removedQuestions[i].category].totalQuestions++;
          }
        } else {
          if (removedQuestions[i].answeredCorrectly === 1) {
            whatToRemoveHash[removedQuestions[i].category] = {
              totalQuestions: 1,
              correct: 1,
            };
          } else {
            whatToRemoveHash[removedQuestions[i].category] = {
              totalQuestions: 1,
              correct: 0,
            };
          }
        }
      }
    }

    for (let i = 0; i < categoriesInfo.length; i++) {
      if (whatToRemoveHash.hasOwnProperty(categoriesInfo[i].name)) {
        const diff =
          whatToRemoveHash[categoriesInfo[i].name].totalQuestions -
          categoriesInfo[i].totalQuestions;
        const correctDiff =
          whatToRemoveHash[categoriesInfo[i].name].correct -
          categoriesInfo[i].timesCorrect;

        categoriesInfo[i].totalQuestions = diff;
        categoriesInfo[i].timesCorrect = correctDiff;
      }
    }

    const allOptionsInOneArray = allOptions.flat();

    const correctAnswersFromState = [...results.correctAnswers];
    const wrongAnswersFromState = [];

    for (let i = 0; i < results.wrongAnswers.length; i++) {
      wrongAnswersFromState.push(results.wrongAnswers[i].choice);
    }

    for (let i = 0; i < allOptionsInOneArray.length; i++) {
      if (wrongAnswersFromState.includes(allOptionsInOneArray[i].choice)) {
        let indexToRemove = wrongAnswersFromState.indexOf(
          allOptionsInOneArray[i].choice
        );
        wrongAnswersFromState.splice(indexToRemove, 1);
      }
      if (correctAnswersFromState.includes(allOptionsInOneArray[i].choice)) {
        let indexToRemove = correctAnswersFromState.indexOf(
          allOptionsInOneArray[i].choice
        );
        correctAnswersFromState.splice(indexToRemove, 1);
      }
    }

    setResults({
      ...results,
      correctAnswers: correctAnswersFromState,
      wrongAnswers: wrongAnswersFromState,
    });

    props.updateQuestions(
      allQuestions,
      removedQuestions,
      removedQuestionsNames
    );
  }

  function wrongAnswer(event, choice) {
    updateQuestionProperty(event, choice);

    let previousGuesses = [...guessesAndChoices.guesses];
    let updatedWrongAnswers = [...results.wrongAnswers];
    updatedWrongAnswers.push({
      choice: choice.choice,
      explanation: choice.explanation,
    });

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
      stateWithCategories: updatedCategories.previousStateCategories,
    });

    setCategories(updatedCategories.previousCategories);

    setDisplayCorrectAnswer(true);
  }

  function correctAnswer(event, choice) {
    updateQuestionProperty(choice);

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
      stateWithCategories: updatedCategories.previousStateCategories,
    });

    setCategories(updatedCategories.previousCategories);

    setTimeout(() => {
      props.displayNextQuestion(null, guessesAndChoices.guessChoice);
    }, 1000);
  }

  function updateQuestionProperty(choice): void {
    const allQuestions = questionsData.allQuestions;
    const currentQuestionToUpdate = allQuestions.find(
      (option) => option.name === questionsData.currentQuestion.name
    );

    currentQuestionToUpdate.answered = IsAnswered.yes;

    if (choice.correct === true) {
      currentQuestionToUpdate.answeredCorrectly = IsAnswered.yes;
    }

    allQuestions.forEach((question) =>
      question.name === currentQuestionToUpdate.name
        ? currentQuestionToUpdate
        : null
    );

    setQuestionsData({
      ...questionsData,
      allQuestions: allQuestions,
    });

    setGuessesAndChoices({
      ...guessesAndChoices,
      rightAnswerGuessed: true,
    });
  }

  function checkIfAnswerIsCorrect(event, choice) {
    if (choice.correct === true) {
      correctAnswer(event, choice);
    } else {
      wrongAnswer(event, choice);
    }
  }

  const { height, width } = Dimensions.get("window");

  return (
    <GestureRecognizer
      style={{ height: height, width: width }}
      onSwipeLeft={() => props.viewNextQuestion()}
      onSwipeRight={() =>
        props.counter > 1 ? props.viewPreviousQuestion() : null
      }
    >
      <View style={styles.mainContainerTop}>
        <View style={styles.container}>
          {props.scoreBoard !== true &&
          questionsData.currentQuestion !== undefined ? (
            <>
              <View style={styles.totalQuestions}>
                <Text
                  accessibilityLabel={"currentQuestionNumber"}
                  style={styles.counter}
                >
                  Question {props.counter}
                  <Text style={styles.secondCounter}>
                    /{props.totalQuestions}
                  </Text>
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={props.questionsModal}
                >
                  <Image
                    style={styles.image}
                    source={require("../../assets/images/gear-1119298_1920.png")}
                  />
                  {props.toShowQuestionsModal === true ? (
                    <ModalRemoveQuestions
                      resetFunc={beforeResetQuestionsHandler}
                      updateFunc={beforeUpdatingQuestionsHandler}
                      id={questionsData.currentQuestion.groupId}
                      goBack={props.questionsModal}
                      {...props}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.questionHeading}>
                  {questionsData.currentQuestion.name}
                </Text>
              </View>

              <View style={styles.buttonMainContainer}>
                {questionsData.currentQuestion.options !== undefined
                  ? questionsData.currentQuestion.options.map(
                      (optionToChoose) => {
                        return (
                          <View
                            key={optionToChoose.choice}
                            style={[
                              styles.viewContainer,
                              {
                                borderColor: results.wrongAnswer.includes(
                                  optionToChoose.choice
                                )
                                  ? "red"
                                  : guessesAndChoices.guessChoice.includes(
                                      optionToChoose.choice
                                    )
                                  ? "green"
                                  : questionsData.rightAnswer.choice ===
                                      optionToChoose.choice &&
                                    questionsData.currentQuestion.answered ===
                                      IsAnswered.yes
                                  ? "green"
                                  : guessesAndChoices.guesses.includes(
                                      optionToChoose.choice
                                    ) &&
                                    questionsData.currentQuestion.answered ===
                                      IsAnswered.yes
                                  ? "red"
                                  : "#545A75",
                                backgroundColor:
                                  displayCorrectAnswer === true &&
                                  questionsData.rightAnswer.choice ===
                                    optionToChoose.choice
                                    ? "green"
                                    : results.wrongAnswer.includes(
                                        optionToChoose.choice
                                      )
                                    ? "red"
                                    : guessesAndChoices.guessChoice.includes(
                                        optionToChoose.choice
                                      )
                                    ? "green"
                                    : questionsData.rightAnswer.choice ===
                                        optionToChoose.choice &&
                                      questionsData.currentQuestion.answered ===
                                        IsAnswered.yes
                                    ? "green"
                                    : guessesAndChoices.guesses.includes(
                                        optionToChoose.choice
                                      ) &&
                                      questionsData.currentQuestion.answered ===
                                        IsAnswered.yes
                                    ? "red"
                                    : "#233A44",
                              },
                            ]}
                          >
                            <TouchableOpacity
                              style={styles.choiceContainer}
                              disabled={
                                (guessesAndChoices.rightAnswerGuessed &&
                                  !guessesAndChoices.guessChoice.includes(
                                    optionToChoose.choice
                                  )) ||
                                guessesAndChoices.wrongAnswerGuessed ||
                                questionsData.currentQuestion.answered ===
                                  IsAnswered.yes
                              }
                              accessibilityLabel={"choiceButton"}
                              onPress={
                                guessesAndChoices.guessChoice.includes(
                                  optionToChoose.choice
                                )
                                  ? null
                                  : (option) => {
                                      checkIfAnswerIsCorrect(
                                        option,
                                        optionToChoose
                                      );
                                    }
                              }
                            >
                              <Text style={styles.choiceOptionText}>
                                {optionToChoose.choice}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }
                    )
                  : null}
              </View>

              {guessesAndChoices.wrongAnswerGuessed ? (
                <React.Fragment>
                  <View style={styles.wrongAnswerContainer}>
                    <View>
                      {
                        <Text style={styles.errorMessage}>
                          {questionsData.rightAnswer.explanation}
                        </Text>
                      }
                    </View>
                    <View style={styles.nextQuestion}>
                      <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() =>
                          props.displayNextQuestion(
                            null,
                            guessesAndChoices.guessChoice
                          )
                        }
                      >
                        <Text style={{ textAlign: "center" }}>
                          Next Question!
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </React.Fragment>
              ) : null}
            </>
          ) : (
            <Score
              groupName={props.groupName}
              categoryAnswers={results.stateWithCategories}
              firstTry={results.timesCorrect}
              totalQuestions={props.totalQuestions}
              navigation={props.navigation}
              results={results}
            />
          )}

          {guessesAndChoices.wrongAnswerGuessed ? null : (
            <View style={styles.prevAndNextMainContainer}>
              <View style={styles.prevAndNextContainer}>
                {props.counter > 1 && props.scoreBoard !== true ? (
                  <View
                    style={[
                      styles.prevAndNext,
                      { backgroundColor: "#233A44" },
                      {
                        width:
                          questionsData.isNextQuestionViewable === false
                            ? "100%"
                            : "40%",
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={{ padding: 5 }}
                      onPress={props.viewPreviousQuestion}
                    >
                      <Text style={{ textAlign: "center" }}>Previous</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {questionsData.isNextQuestionViewable === true ? (
                  <View
                    style={[
                      styles.prevAndNext,
                      { backgroundColor: "#233A44" },
                      { width: props.counter <= 1 ? "100%" : "40%" },
                    ]}
                  >
                    <TouchableOpacity
                      style={{ padding: 5 }}
                      onPress={props.viewNextQuestion}
                    >
                      <Text style={{ textAlign: "center" }}>Next</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          )}

          <BottomBarLogo />
        </View>
      </View>
    </GestureRecognizer>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  choiceContainer: { padding: 10 },
  choiceOptionText: { textAlign: "center" },
  wrongAnswerContainer: {
    flex: 0.4,
  },
  mainContainerTop: {
    width: widthPercentageToDP("100%"),
    backgroundColor: "#233A44",
  },
  prevAndNextMainContainer: {
    flex: 0.4,
  },
  buttonMainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  secondCounter: {
    fontWeight: "200",
    color: "white",
    fontSize: 12,
  },
  button: {
    marginTop: 11,
    marginLeft: 10,
    marginRight: -10,
  },
  image: {
    overflow: "hidden",
    resizeMode: "contain",
    width: 20,
    height: 20,
    tintColor: "white",
  },
  prevAndNextContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
  },
  viewContainer: {
    borderRadius: 10,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    elevation: 100,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderWidth: 2,
    borderColor: "#545A75",
  },
  totalQuestions: {
    borderBottomWidth: 1,
    borderBottomColor: "#545A75",
    paddingBottom: 15,
    flexDirection: "row",
    marginRight: 10,
  },
  prevAndNext: {
    width: "100%",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    elevation: 100,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 10,
    padding: 2,
    margin: 10,
    borderWidth: 1,
    borderColor: "#545A75",
  },
  container: {
    padding: 40,
    height: height * 0.9,
    width: widthPercentageToDP("90%"),
    marginLeft: "auto",
    marginRight: "auto",
  },
  counter: {
    paddingBottom: 5,
    paddingTop: 15,
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    color: "white",
  },
  buttonContainer: {
    backgroundColor: "blue",
    margin: 10,
    borderRadius: 10,
  },
  questionHeading: {
    color: "white",
    fontSize: 24,
    paddingBottom: 10,
    marginTop: 15,
  },
  errorMessage: {
    textAlign: "center",
    paddingTop: 5,
    color: "white",
  },
  correctMessage: {},
  congratulationsMessage: {
    textAlign: "center",
    color: "green",
  },
  nextQuestion: {
    backgroundColor: "white",
    borderRadius: 10,
    color: GlobalStyles.darkColor,
    marginTop: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    elevation: 100,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderWidth: 2,
    borderColor: "#545A75",
    backgroundColor: "#233A44",
  },
});

export default QuestionView;
