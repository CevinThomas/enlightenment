import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import SeoBasics from "../questions/seoBasics";

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
        <View>
            <View>
                {allSubjects.length !== 0 ? allSubjects.map(subject => {
                    return  <TouchableOpacity onPress={() => navigateToProperQuestions(subject)}>
                        <Text>{subject}</Text>
                    </TouchableOpacity>
                }) : null}

            </View>
        </View>
    );
};

export default Subjects;
