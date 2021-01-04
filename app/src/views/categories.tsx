import { Text } from "@ui-kitten/components";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import EnvVariables from "../../envVariables";
import BottomBarLogo from "../components/bottomBarLogo";
import QuestionOverlay from "../components/questionOverlay";
import { CHANGE_NAV } from "../constants/dispatch";
import { useGlobalStateUpdate } from "../contexts/navigationContext";
import capitalizeFirstLetter, {
  capitalizeFirstLetterInArray,
  lowerCapitalizeFirstLetter,
  makeHttpsRequest,
} from "../utils/functions";

const Categories = (props) => {
  const updateGlobalState = useGlobalStateUpdate();

  const [allGroups, setAllGroups] = useState<string[]>([]);
  const [allQuestions, setAllQuestions] = useState<Array<object>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [groupToUse, setGroupToUse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [onSubjects, setOnSubjects] = useState<boolean>(false);
  const [onCategories, setOnCategories] = useState<boolean>(false);

  useEffect(() => {
    setOnSubjects(props.route.params.subjects);
    if (props.route.params.subjects === true) {
      retrieveSubjectsByAreaChosen().then((r) => r);
    } else {
      retrieveGroupsByCategoryChosen().then((r) => r);
    }
  }, []);

  async function retrieveSubjectsByAreaChosen() {
    setIsLoading(true);
    const url =
      EnvVariables.API_ENDPOINTS.GETSUBJECTSBYAREACHOSEN +
      "?subject=" +
      props.route.params.categoryChosen;
    const response = await makeHttpsRequest(url, "GET");
    if (
      response.message === "Unauthorized" ||
      response.message === "Was not given a string."
    ) {
      Alert.alert("Unauthorized, please login again");
      return updateGlobalState({ type: CHANGE_NAV, payload: 0 });
    } else {
      const capitalized = capitalizeFirstLetterInArray(
        response.data.dbOperation
      );
      setAllGroups(capitalized);
    }
    setIsLoading(false);
  }

  async function retrieveCategoriesBySubjectChosen(subject: string) {
    if (onSubjects === true) {
      console.log("HEY");
      const lowerCasedSubject = lowerCapitalizeFirstLetter(subject);
      setIsLoading(true);
      const url =
        EnvVariables.API_ENDPOINTS.GETCATEGORIESBYSUBJECTCHOSEN +
        "?subject=" +
        lowerCasedSubject;
      const response = await makeHttpsRequest(url, "GET");
      console.log(response);
      if (
        response.message === "Unauthorized" ||
        response.message === "Was not given a string."
      ) {
        Alert.alert("Unauthorized, please login again");
        return updateGlobalState({ type: CHANGE_NAV, payload: 0 });
      } else if (onCategories === true) {
        const lowerCasedSubject = lowerCapitalizeFirstLetter(subject);
        const url =
          EnvVariables.API_ENDPOINTS.GETCATEGORIESBYSUBJECTCHOSEN +
          "?subject=" +
          lowerCasedSubject;
        const response = await makeHttpsRequest(url, "GET");
        setOnSubjects(false);
        setOnCategories(true);
      }
      setIsLoading(false);
    } else {
    }
  }

  function navigateToCategories(e: any): void {
    console.log(e);
    retrieveCategoriesBySubjectChosen(e);
  }

  const navigateToProperQuestions = async (): void => {
    setShowModal(false);

    let groupIdToFilterBy: string;

    for (let i = 0; i < allQuestions.length; i++) {
      const capitalized = capitalizeFirstLetter(allQuestions[i].groupName);
      if (capitalized === groupToUse) {
        groupIdToFilterBy = allQuestions[i].groupId;
        break;
      }
    }

    const url =
      EnvVariables.API_ENDPOINTS.GETQUESTIONSBYGROUPID +
      "?id=" +
      groupIdToFilterBy;
    const response = await makeHttpsRequest(url, "GET");

    //TODO: Check for error when making HTTPS request

    const questionsToUse = response.data;

    props.navigation.navigate("Questions", {
      name: groupToUse,
      questions: questionsToUse,
      id: groupIdToFilterBy,
    });
  };

  const openModalAndSetState = (chosenGroup: string): void => {
    setShowModal(true);
    setGroupToUse(chosenGroup);
  };

  const renderCategoriesToUI = (): ReactNode => {
    if (allGroups.length === 0) return;

    return allGroups.map((group) => {
      return (
        <TouchableOpacity
          key={group}
          style={styles.buttonContainer}
          onPress={() => {
            if (onSubjects === true) {
              return navigateToCategories(group);
            } else if (onCategories === true) {
              return navigateToCategories(group);
            } else {
              openModalAndSetState(group);
            }
          }}
        >
          <Text style={styles.text}>{group}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.outerContainer}>
      <Spinner visible={isLoading} />
      {showModal === true ? (
        <QuestionOverlay
          navigateToQuestionsFunction={navigateToProperQuestions}
        />
      ) : null}
      <View style={styles.innerContainer}>{renderCategoriesToUI()}</View>
      <BottomBarLogo />
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  outerContainer: {
    height: height * 0.9,
    backgroundColor: "#233A44",
  },
  innerContainer: {
    width: width,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buttonContainer: {
    backgroundColor: "#233A44",
    width: width,
    padding: 20,
    marginTop: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    elevation: 100,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 10,
    width: width * 0.8,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 2,
    borderColor: "#545A75",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});

export default Categories;
