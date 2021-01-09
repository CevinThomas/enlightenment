import { default as React, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EnvVariables from "../../envVariables";
import { makeHttpsRequest } from "../utils/functions";

function History(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string>("");
  const [resultModal, setResultModal] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getResults()
      .then((results) => setResults(results))
      .catch((e) => setError("No results found"));
  }, []);

  async function getResults() {
    const results = await makeHttpsRequest(
      EnvVariables.API_ENDPOINTS.GETRESULTS,
      "GET"
    );
    if (results.data.statusCode !== 200) return results.data.results.results;
    throw new Error("No Results recieved");
  }

  function renderResults() {
    if (results.length !== 0) {
      return results.map((result, index) => (
        <TouchableOpacity
          onPress={() => displayCorrectResult(index)}
          key={index}
        >
          <Text>{result.groupName}</Text>
        </TouchableOpacity>
      ));
    }
  }

  function refreshResults() {
    getResults()
      .then((results) => setResults(results))
      .catch((e) => setError("No results found"));
  }

  function displayCorrectResult(resultToShow: number) {
    const resultToDisplay = results[resultToShow];
    console.log(resultToDisplay);
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
          <View>
            <View>
              <Text>{resultModal.groupName}</Text>
              <Text>{resultModal.totalQuestions}</Text>
              <Text>{resultModal.correct}</Text>
              <Text>{resultModal.percentage}</Text>
              {resultModal.categories.map((category) => (
                <Text key={category}>{category}</Text>
              ))}
              {resultModal.individualQuestions.map((question) => (
                <View key={question.questionId}>
                  <Text>{question.questionName}</Text>
                  <Text>{question.wasUserCorrect.toString()}</Text>
                </View>
              ))}
            </View>
            <View>
              <TouchableOpacity onPress={resetAndCloseModal}>
                <Text>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteResult}>
                <Text>DELETE RESULT</Text>
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
