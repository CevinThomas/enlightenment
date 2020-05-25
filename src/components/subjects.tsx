import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import GlobalStyles from "../utils/globalStyles"
const Subjects = (props) => {

    const [allSubjects, setAllSubjects] = useState<string[]>([]);

    useEffect(() => {
            // TODO: Rename arrayQ
            const arrayQ = Object.keys(props.route.params.categories);
            const subjectsWithCapitalFirst = arrayQ.map(subjectString => capitalizeFirstLetter(subjectString));
            setAllSubjects(subjectsWithCapitalFirst);
    }, [])

    function navigateToProperQuestions(subject: string): void {

        // TODO: Filter the correct subjects questions before sending to the questions screen.

        const questionsToUse = props.route.params.categories[subject.toLowerCase()].questions;

        props.navigation.navigate("Questions", {
            name: subject,
            questions: questionsToUse,
            id: "seo"
        });
    }

    function capitalizeFirstLetter(nameOfCategory: string) {
        return nameOfCategory.charAt(0).toUpperCase() + nameOfCategory.slice(1);
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                {allSubjects.length !== 0 ? allSubjects.map(subject => {
                    return  <TouchableOpacity key={subject} style={styles.buttonContainer} onPress={() => navigateToProperQuestions(subject)}>
                        <Text style={styles.text}>{subject}</Text>
                    </TouchableOpacity>
                }) : null}

            </View>
        </View>
    );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    outerContainer: {
        height: height,
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
