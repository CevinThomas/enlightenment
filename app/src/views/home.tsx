import { Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { widthPercentageToDP } from "react-native-responsive-screen";
import EnvVariables from "../../envVariables";
import BottomBarLogo from "../components/bottomBarLogo";
import ButtonList from "../components/buttonList";
import { useGlobalUserInformationState } from "../contexts/userInformation";
import {
  capitalizeFirstLetterInArray,
  makeHttpsRequest,
} from "../utils/functions";

const Home = (props) => {
  //TODO: This is obviously hard coded and will be replaced with backend functionality

  const userInformationState = useGlobalUserInformationState();

  const [allCategories, setAllCategories] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigateToQuestions = (e, buttonId) => {
    props.navigation.navigate("Categories", { categoryChosen: buttonId });
  };

  useEffect(() => {
    fetchCategories().then((r) => r);
  }, []);

  async function fetchCategories(): Promise<void> {
    setIsLoading(true);
    //TODO: Fetch with licenceId
    const response = await makeHttpsRequest(
      EnvVariables.API_ENDPOINTS.GETAREABYLICENCE,
      "GET"
    );
    console.log(response);
    const capitalized = capitalizeFirstLetterInArray(response.data.dbOperation);
    setAllCategories(capitalized);
    setIsLoading(false);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.mainHeading}>Welcome future Beast!</Text>
        <View style={styles.secondaryContainer}>
          <Text style={styles.secondaryText}>
            This is place for you to be the fucking ultimate beast and advance
            your skills in the shit that is required. Please, pick a category.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <FlatList
            style={{ flex: 1 }}
            keyExtractor={(item, index) => index.toString()}
            data={allCategories}
            renderItem={({ item }) => (
              <ButtonList
                navigateFunc={navigateToQuestions}
                key={item}
                navigation={props.navigation}
                boxTitle={item}
              />
            )}
          />
        </View>
        <BottomBarLogo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: widthPercentageToDP("100%"),
    backgroundColor: "#233A44",
  },
  secondaryContainer: {
    backgroundColor: "#233A44",
    padding: 30,
    marginTop: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    elevation: 100,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderWidth: 2,
    borderColor: "#545A75",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    width: widthPercentageToDP("90%"),
    marginLeft: "auto",
    marginRight: "auto",
  },
  secondaryText: {
    color: "white",
    fontSize: 14,
    lineHeight: 25,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 80,
  },

  mainHeading: {
    fontSize: 25,
    fontFamily: "century-gothic",
    color: "white",
  },
});

export default Home;
