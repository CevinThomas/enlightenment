import { default as React, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EnvVariables from "../../envVariables";
import { makeHttpsRequest } from "../utils/functions";

function History(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string>("");
  const [resultModal, setResultModal] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [uniqueSubjectNames, setUniqueSubjectNames] = useState<Array<string>>(
    []
  );

  useEffect(() => {
    getResults()
      .then((results) => {
        setResults(results.results);
        setUniqueSubjectNames(results.uniqueSubjectNames);
      })
      .catch((e) => setError("No results found"));
  }, []);

  async function getResults() {
    const results = await makeHttpsRequest(
      EnvVariables.API_ENDPOINTS.GETRESULTS,
      "GET"
    );
    console.log(results.data);
    if (results.data.statusCode !== 200) return results.data;
    throw new Error("No Results recieved");
  }

  function renderResults() {
    if (results.length !== 0) {
      return results.map((result, index) => {
        return (
          <TouchableOpacity
            onPress={() => displayCorrectResult(index)}
            key={index}
          >
            <Text>{result.groupName}</Text>
          </TouchableOpacity>
        );
      });
    }
  }

  function refreshResults() {
    getResults()
      .then((results) => setResults(results))
      .catch((e) => setError("No results found"));
  }

  function displayCorrectResult(resultToShow: number) {
    const resultToDisplay = results[resultToShow];
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
        {error !== "" ? <Text>{error}</Text> : renderResults()}
        <View style={styles.refreshContainer}>
          <TouchableOpacity onPress={refreshResults}>
            <Text>Refresh Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
  },
  refreshContainer: {
    marginTop: 10,
  },
});

export default History;
