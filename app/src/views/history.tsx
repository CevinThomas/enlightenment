import { default as React, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EnvVariables from "../../envVariables";
import { makeHttpsRequest } from "../utils/functions";

function History(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string>("");

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
        <TouchableOpacity key={index}>
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

  return (
    <View style={styles.container}>
      {error !== "" ? <Text>{error}</Text> : renderResults()}
      <View style={styles.refreshContainer}>
        <TouchableOpacity onPress={refreshResults}>
          <Text>Refresh Results</Text>
        </TouchableOpacity>
      </View>
    </View>
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
