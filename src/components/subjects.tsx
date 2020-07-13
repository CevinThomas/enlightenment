import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import GlobalStyles from "../utils/globalStyles"
import BottomBarLogo from "./bottomBarLogo";
import capitalizeFirstLetter from "../utils/functions";
import QuestionOverlay from "./questionOverlay";
const Subjects = (props) => {

    const [allSubjects, setAllSubjects] = useState<string[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [subjectToUse, setSubjectToUse] = useState<string>("");

    useEffect(() => {
            // TODO: Rename arrayQ
            const arrayQ = Object.keys(props.route.params.categories);
            const subjectsWithCapitalFirst = arrayQ.map(subjectString => capitalizeFirstLetter(subjectString));
            setAllSubjects(subjectsWithCapitalFirst);
    }, [])

    function navigateToProperQuestions(): void {
        setShowModal(false)

        // TODO: Filter the correct subjects questions before sending to the questions screen.

        const questionsToUse = props.route.params.categories[subjectToUse.toLowerCase()].questions;

        props.navigation.navigate("Questions", {
            name: subjectToUse,
            questions: questionsToUse,
            id: "seo"
        });
    }

    function openModalAndSetState(subjectToSet: string): void {
        setShowModal(true);
        setSubjectToUse(subjectToSet);
    }

    return (
        <View style={styles.outerContainer}>
            {showModal=== true ? <QuestionOverlay navigateToQuestionsFunction={navigateToProperQuestions}/> : null}
            <View style={styles.innerContainer}>
                {allSubjects.length !== 0 ? allSubjects.map(subject => {
                    return  <TouchableOpacity key={subject} style={styles.buttonContainer} onPress={() => openModalAndSetState(subject)}>
                        <Text style={styles.text}>{subject}</Text>
                    </TouchableOpacity>
                }) : null}
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

export default Subjects;
