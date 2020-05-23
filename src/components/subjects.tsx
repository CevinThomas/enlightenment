import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import SeoBasics from "../questions/seoBasics";

const Subjects = (props) => {

    const [allSubjects, setAllSubjects] = useState<string[]>([]);

    useEffect(() => {
        if (props.route.params.categories.length !== 0) {

            // TODO: Rename arrayQ
            const arrayQ = Object.keys(props.route.params.categories);
            setAllSubjects(arrayQ);
        }
        const arrayQ = Object.keys(props.route.params.categories);
    }, [])

    function navigateToProperQuestions(subject: string): void {

        // TODO: Filter the correct subjects questions before sending to the questions screen.

        console.log(props.route.params.categories[subject].questions);

        props.navigation.navigate("Questions", {
            name: props.route.params.name,
            questions: SeoBasics,
            id: "seo"
        });
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
