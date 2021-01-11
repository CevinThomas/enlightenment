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
  const [tagAnswers, setTagAnswers] = useState<[]>([]);

  useEffect(() => {
    setCorrectAnswers(props.results.correctAnswers.length);
    setWrongAttempts(props.results.wrongAnswers.length);
    setTagAnswers(props.tagAnswers);
    setPercentageCorrect(
      (props.results.correctAnswers.length / props.totalQuestions) * 100
    );
  }, []);

  async function saveResults() {
    let uniqueTags = [];

    for (let i = 0; i < tagAnswers.length; i++) {
      if (!uniqueTags.includes(tagAnswers[i])) {
        uniqueTags.push(tagAnswers[i]["name"]);
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
      tags: uniqueTags,
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
          <Text style={[styles.titles, { marginBottom: 10 }]}>Tag score:</Text>

          {tagAnswers.map((tag) => {
            return (
              <View key={tag.name}>
                <Text style={styles.titles}>
                  {tag.name}: {tag.timesCorrect} out of {tag.totalQuestions}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.buttonContainer}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Do it again!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home", {})}
          style={styles.buttonContainer}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Back to Start
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
