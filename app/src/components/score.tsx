import { Text } from "@ui-kitten/components";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import EnvVariables from "../../envVariables";
import FadeIn from "./fadeIn";

const Score = (props) => {
  const [percentageCorrect, setPercentageCorrect] = useState(0);
  const [correctAttempts, setCorrectAnswers] = useState<number>(0);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [categoryAnswers, setCategoryAnswers] = useState<[]>([]);

  useEffect(() => {
    setCorrectAnswers(props.results.correctAnswers.length);
    setWrongAttempts(props.results.wrongAnswers.length);
    setCategoryAnswers(props.categoryAnswers);
    setPercentageCorrect(
      (props.results.correctAnswers.length / props.totalQuestions) * 100
    );
  }, []);

  async function saveResults() {
    let uniqueCategories = [];

    for (let i = 0; i < categoryAnswers.length; i++) {
      if (!uniqueCategories.includes(categoryAnswers[i])) {
        uniqueCategories.push(categoryAnswers[i]["name"]);
      }
    }

    const token = await SecureStore.getItemAsync("token");

    const results = {
      groupName: props.groupName,
      category: props.categoryChosen,
      //categories: uniqueCategories,
      correct: correctAttempts,
      totalQuestions: props.totalQuestions,
      percentage: Math.floor(percentageCorrect) + "%",
      individualQuestions: props.questionsAndStatus,
      subjectName: props.subjectName,
      areaName: props.areaName,
    };

    const response = await fetch(`${EnvVariables.API_ENDPOINTS.SAVERESULTS}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(results),
    });

    response.json().then((r) => {
      if (r.statusCode === 200) {
        return Alert.alert("Saved!");
      }
      Alert.alert("Could not save results, please contact support.");
    });
  }

  return (
    <View style={styles.container}>
      <FadeIn>
        <View style={styles.headingContainer}>
          <Text style={styles.mainheading}>
            Well done! This is how you did!
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titles}>
            Total amount of questions: {props.totalQuestions}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titles}>Correct attempts: {correctAttempts}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titles}>Wrong attempts: {wrongAttempts}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titles}>Percentage: {percentageCorrect}%</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.titles, { marginBottom: 10 }]}>
            Categories used:
          </Text>

          {categoryAnswers.map((category) => {
            return (
              <View key={category.name}>
                <Text style={styles.titles}>
                  {category.name} Scored: {category.timesCorrect} out of{" "}
                  {category.totalQuestions}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          style={styles.buttonContainer}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Do it again!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveResults} style={styles.buttonContainer}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Save Results
          </Text>
        </TouchableOpacity>
      </FadeIn>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#233A44",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    elevation: 100,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderWidth: 2,
    borderColor: "#545A75",
  },
  container: {
    width: "100%",
    flex: 1,
    marginTop: Platform.OS === "android" ? -10 : 0,
  },
  headingContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#545A75",
  },
  mainheading: {
    fontSize: 22,
    color: "white",
    marginBottom: 20,
  },
  titles: {
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#233A44",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    elevation: 100,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderWidth: 2,
    borderColor: "#545A75",
  },
});

export default Score;
