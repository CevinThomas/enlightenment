import React, {ReactNode, useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "@ui-kitten/components";
import GlobalStyles from "../utils/globalStyles";
import BottomBarLogo from "../components/bottomBarLogo";
import {makeHttpsRequest} from "../utils/functions";
import QuestionOverlay from "../components/questionOverlay";
import EnvVariables from "../../envVariables";
import {useGlobalStateUpdate} from "../contexts/navigationContext";
import {CHANGE_NAV} from "../constants/dispatch";
import Spinner from 'react-native-loading-spinner-overlay';


const Categories = (props) => {

    const updateGlobalState = useGlobalStateUpdate();

    const [allGroups, setAllGroups] = useState<string[]>([]);
    const [allQuestions, setAllQuestions] = useState<object>({});
    const [showModal, setShowModal] = useState<boolean>(false);
    const [groupToUse, setGroupToUse] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        retrieveGroupsByCategoryChosen().then(r => r);
    }, []);

    async function retrieveGroupsByCategoryChosen() {
        setIsLoading(true);
        const url = EnvVariables.API_ENDPOINTS.GETGROUPSBYCATEGORY + props.route.params.categoryChosen;
        const response = await makeHttpsRequest(url, "GET");
        if (response === "Unauthorized") {
            Alert.alert("Unauthorized, please login again");
            return updateGlobalState({type: CHANGE_NAV, payload: 0});
        } else {
            setAllGroups(response.data);
        }
        setIsLoading(false);
    }

    const navigateToProperQuestions = async (): void => {
        setShowModal(false);

        const url = EnvVariables.API_ENDPOINTS.GETQUESTIONSBYGROUPNAME + groupToUse;
        const response = await makeHttpsRequest(url, "GET");
        console.log(response);

        return console.log("hello");

        //TODO: Make request to gather questions based on group chosen (chosenGroup)

        const questionsToUse = allQuestions[groupToUse.toLowerCase()].questions;

        props.navigation.navigate("Questions", {
            name: groupToUse,
            questions: questionsToUse,
            id: "seso"
        });
    };

    const openModalAndSetState = (chosenGroup: string): void => {
        setShowModal(true);
        setGroupToUse(chosenGroup);
    };

    const renderCategoriesToUI = (): ReactNode => {
        if (allGroups.length === 0) return;

        return allGroups.map(group => {
            return <TouchableOpacity key={group} style={styles.buttonContainer}
                                     onPress={() => openModalAndSetState(group)}>
                <Text style={styles.text}>{group}</Text>
            </TouchableOpacity>;
        });
    };

    return (
        <View style={styles.outerContainer}>
            <Spinner visible={isLoading}/>
            {showModal === true ? <QuestionOverlay navigateToQuestionsFunction={navigateToProperQuestions}/> : null}
            <View style={styles.innerContainer}>
                {renderCategoriesToUI()}
            </View>
            <BottomBarLogo/>
        </View>
    );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    outerContainer: {
        height: height * 0.9,
    },
    innerContainer: {
        width: width,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    buttonContainer: {
        backgroundColor: "white",
        width: width,
        padding: 20,
        marginTop: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        borderRadius: 10,
        width: width * 0.8,
        marginLeft: "auto",
        marginRight: "auto"
    },
    text: {
        textAlign: "center",
        color: GlobalStyles.darkColor
    }
})

export default Categories;
