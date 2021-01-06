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
import {
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
  const [step, setStep] = useState<string>("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    setStep(props.route.params.step);
    if (props.route.params.step === "subjects") {
      retrieveSubjectsByAreaChosen().then((r) => r);
    } else {
      setSubject(props.route.params.subjectChosen);
      retrieveCorrectStepData(
        props.route.params.categoryChosen,
        props.route.params.step,
        props.route.params.subjectChosen
      ).then((r) => r);
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
    setStep("categories");
    setIsLoading(false);
  }

  async function retrieveCorrectStepData(
    subject: string,
    step: string,
    subjectChosen?: string
  ) {
    const lowerCasedSubject = lowerCapitalizeFirstLetter(subject);
    //setIsLoading(true);
    let url: string;
    let response;
    if (step === "categories") {
      url =
        EnvVariables.API_ENDPOINTS.GETCATEGORIESBYSUBJECTCHOSEN +
        "?subject=" +
        lowerCasedSubject;
    } else {
      const lowerCasedSubjectChosen = lowerCapitalizeFirstLetter(subjectChosen);
      url =
        EnvVariables.API_ENDPOINTS.GETGROUPSBYCATEGORY +
        "?group=" +
        lowerCasedSubject +
        "&subject=" +
        lowerCasedSubjectChosen;
    }
    response = await makeHttpsRequest(url, "GET");
    if (
      response.message === "Unauthorized" ||
      response.message === "Was not given a string."
    ) {
      Alert.alert("Unauthorized, please login again");
      return updateGlobalState({ type: CHANGE_NAV, payload: 0 });
    } else {
      setAllGroups(response.data.dbOperation);
      if (step === "categories") {
        setStep("group");
      } else {
        setStep("questions");
      }
    }
    setIsLoading(false);
  }

  function navigateToCategories(
    e: any,
    nextStep: string,
    subjectChosen: string
  ): void {
    return props.navigation.push("CategoriesAndSubjects", {
      categoryChosen: e,
      step: nextStep,
      subjectChosen: subjectChosen,
    });
  }

  const navigateToProperQuestions = async (): void => {
    setShowModal(false);

    const url =
      EnvVariables.API_ENDPOINTS.GETQUESTIONSBYGROUPNAME +
      "?group=" +
      groupToUse;
    const response = await makeHttpsRequest(url, "GET");

    //TODO: Check for error when making HTTPS request

    const questionsToUse = response.data.questions;
    const idToUse = response.data.groupId.groupId;

    props.navigation.navigate("Questions", {
      name: groupToUse,
      questions: questionsToUse,
      id: idToUse,
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
            if (step === "categories") {
              return navigateToCategories(group, "categories", group);
            } else if (step === "group") {
              return navigateToCategories(group, "group", subject);
            } else if (step === "questions") {
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
