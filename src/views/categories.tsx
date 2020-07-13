import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import GlobalStyles from "../utils/globalStyles"
import BottomBarLogo from "../components/bottomBarLogo";
import capitalizeFirstLetter from "../utils/functions";
import QuestionOverlay from "../components/questionOverlay";

const Categories = (props) => {

    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [categoryToUse, setCategoryToUse] = useState<string>("");

    useEffect(() => {
        // TODO: Rename arrayQ
        const categoriesAsArray = Object.keys(props.route.params.categories);
        const categoriesWithCapitalFirst = categoriesAsArray.map(subjectString => capitalizeFirstLetter(subjectString));
        setAllCategories(categoriesWithCapitalFirst);
    }, [])

    const navigateToProperQuestions = (): void => {
        setShowModal(false);

        const questionsToUse = allCategories[categoryToUse.toLowerCase()].questions;

        props.navigation.navigate("Questions", {
            name: categoryToUse,
            questions: questionsToUse,
            id: "seo"
        });
    };

    const openModalAndSetState = (chosenCategory: string): void => {
        setShowModal(true);
        setCategoryToUse(chosenCategory);
    };

    return (
        <View style={styles.outerContainer}>
            {showModal=== true ? <QuestionOverlay navigateToQuestionsFunction={navigateToProperQuestions}/> : null}
            <View style={styles.innerContainer}>
                {allCategories.length !== 0 ? allCategories.map(subject => {
                    return <TouchableOpacity key={subject} style={styles.buttonContainer}
                                             onPress={() => openModalAndSetState(subject)}>
                        <Text style={styles.text}>{subject}</Text>
                    </TouchableOpacity>;
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

export default Categories;
