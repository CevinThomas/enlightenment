import { default as React, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import EnvVariables from "../../envVariables";
import capitalizeFirstLetter, { makeHttpsRequest } from "../utils/functions";

function History(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string>("");
  const [resultModal, setResultModal] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [uniqueAreaAndSubjects, setUniqueAreaAndSubjects] = useState<
    Array<{ areaName: string; subjects: Array<string> }>
  >([]);
  const [uniqueAreaNames, setUniqueAreaNames] = useState<Array<string>>([]);

  useEffect(() => {
    getResults()
      .then((results) => {
        setResults(results.results);
        setUniqueAreaAndSubjects(results.uniqueAreaAndSubjects);
      })
      .catch((e) => setError("No results found"));
  }, []);

  async function getResults() {
    const results = await makeHttpsRequest(
      EnvVariables.API_ENDPOINTS.GETRESULTS,
      "GET"
    );
    console.log(results.data.results);
    if (results.data.statusCode !== 200) return results.data;
    throw new Error("No Results recieved");
  }

  function renderGroupNames(
    groupNames: Array<{ groupName: string; id: string }>
  ) {
    if (groupNames.length !== 0) {
      const UI = (
        <View
          style={{
            paddingLeft: widthPercentageToDP("2%"),
            paddingBottom: heightPercentageToDP("2%"),
          }}
        >
          {groupNames.map((groupName) => {
            if (groupName !== undefined) {
              return (
                <TouchableOpacity
                  style={[
                    {
                      marginBottom: heightPercentageToDP("1%"),
                      alignSelf: "flex-start",
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "#545A75",
                      borderRadius: 10,
                    },
                  ]}
                  key={groupName.id}
                  onPress={() => displayCorrectResult(groupName.id)}
                >
                  <Text
                    style={[styles.text, styles.buttonText, { fontSize: 15 }]}
                  >
                    {groupName.groupName !== undefined
                      ? groupName.groupName
                      : null}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      );
      return UI;
    }
  }

  function renderResults(uniqueSubject: {
    areaName: string;
    subjects: Array<string>;
  }) {
    if (results.length !== 0) {
      const UI = (
        <View style={[{ paddingBottom: heightPercentageToDP("4%") }]}>
          <View
            style={[
              styles.area,
              {
                borderBottomWidth: 2,
                borderColor: "white",
                borderBottomColor: "white",
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  fontWeight: "bold",
                  fontSize: 24,
                },
              ]}
            >
              {capitalizeFirstLetter(uniqueSubject.areaName)}
            </Text>
          </View>
          {uniqueSubject.subjects.map((subject) => {
            const groupNames = results.map((result) => {
              if (
                result.subjectName === subject &&
                result.areaName === uniqueSubject.areaName
              ) {
                return { groupName: result.groupName, id: result.id };
              }
            });
            return (
              <View key={subject}>
                <Text
                  style={[
                    styles.text,
                    { fontSize: 18, paddingBottom: heightPercentageToDP("1%") },
                  ]}
                >
                  {capitalizeFirstLetter(subject)}
                </Text>
                {renderGroupNames(groupNames)}
              </View>
            );
          })}
        </View>
      );
      return UI;
    }
  }

  function refreshResults() {
    getResults()
      .then((results) => {
        setResults(results.results);
        setUniqueAreaAndSubjects(results.uniqueAreaAndSubjects);
      })
      .catch((e) => setError("No results found"));
  }

  function displayCorrectResult(resultToShow: string) {
    const resultToDisplay = results.find(
      (result) => result.id === resultToShow
    );
    setShowModal(true);
    return setResultModal(resultToDisplay);
  }

  function closeModal() {
    setShowModal(false);
  }

  function resetResultsModalData() {
    setResultModal({});
  }

  function resetAndCloseModal() {
    closeModal();
    setResultModal({});
    refreshResults();
  }

  async function deleteResult() {
    const response = await makeHttpsRequest(
      EnvVariables.API_ENDPOINTS.DELETERESULTS,
      "POST",
      { id: resultModal.id }
    );
    if (response.statusCode === 200) return resetAndCloseModal();
  }

  return (
    <React.Fragment>
      {resultModal.hasOwnProperty("groupName") === true ? (
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            closeModal();
            resetResultsModalData();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.topContainer}>
                <Text style={[styles.text, styles.group]}>
                  {resultModal.groupName}
                </Text>
                <View style={styles.dataContainer}>
                  <View style={styles.questionAndCorrectContainer}>
                    <Text style={[styles.text]}>
                      Total Questions: {resultModal.totalQuestions}
                    </Text>
                    <Text style={[styles.text]}>
                      Correct: {resultModal.correct}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.questionAndCorrectContainer,
                      { paddingTop: 10 },
                    ]}
                  >
                    <Text style={[styles.text]}>
                      Percentage: {resultModal.percentage}
                    </Text>
                    <Text>
                      <Text style={[styles.text]}>
                        Category: {resultModal.category}
                      </Text>
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", paddingTop: 15 }}>
                    {resultModal.tags.length !== 0 ? (
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>Tags: </Text>
                        <View style={{ flexDirection: "row" }}>
                          {resultModal.tags.map((tag) => (
                            <Text style={{ paddingRight: 5, color: "white" }}>
                              {tag},
                            </Text>
                          ))}
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>

              <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                  {resultModal.individualQuestions.map((question) => (
                    <View
                      style={styles.questionContainer}
                      key={question.questionId}
                    >
                      <View style={styles.questionName}>
                        <Text style={[styles.text]}>
                          {question.questionName}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.questionCorrect,
                          {
                            backgroundColor: question.wasUserCorrect
                              ? "green"
                              : "red",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "center", color: "white" },
                          ]}
                        >
                          {question.wasUserCorrect.toString() === "true"
                            ? "Correct"
                            : "Wrong"}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={resetAndCloseModal}
              >
                <Text style={[styles.buttonText]}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button]} onPress={deleteResult}>
                <Text style={[styles.buttonText]}>DELETE RESULT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}

      <View style={styles.container}>
        {error !== "" ? (
          <Text>{error}</Text>
        ) : (
          uniqueAreaAndSubjects.map((uniqueSubject, index) => {
            return renderResults(uniqueSubject);
          })
        )}
        <View style={styles.refreshContainer}>
          <TouchableOpacity style={styles.button} onPress={refreshResults}>
            <Text style={[styles.buttonText, { textAlign: "center" }]}>
              Refresh Results
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  area: {
    marginBottom: heightPercentageToDP("1%"),
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: "#545A75",
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingTop: 50,
  },
  questionAndCorrectContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dataContainer: {
    paddingTop: 20,
  },
  group: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  topContainer: {},
  questionName: {
    width: "50%",
    padding: 20,
    fontFamily: "century-gothic",
  },
  questionCorrect: {
    backgroundColor: "black",
    width: "50%",
    padding: 20,
    fontFamily: "century-gothic",
  },
  questionContainer: {
    justifyContent: "space-between",
    alignContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: 20,
    maxHeight: "85%",
  },
  scrollView: {},
  innerContainer: {},
  modalContainer: {
    backgroundColor: "#233A44",
    height: "100%",
    paddingTop: 80,
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#233A44",
    height: heightPercentageToDP("100%"),
    width: widthPercentageToDP("100%"),
    paddingTop: heightPercentageToDP("8%"),
    paddingLeft: widthPercentageToDP("5%"),
    paddingRight: widthPercentageToDP("5%"),
  },
  refreshContainer: {
    marginTop: 10,
  },
});

export default History;
