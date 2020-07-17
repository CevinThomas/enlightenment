import React, {ReactNode, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import GlobalStyles from "../utils/globalStyles"
import BottomBarLogo from "../components/bottomBarLogo";
import capitalizeFirstLetter from "../utils/functions";
import QuestionOverlay from "../components/questionOverlay";

const Categories = (props) => {

    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [allQuestions, setAllQuestions] = useState<object>({});
    const [showModal, setShowModal] = useState<boolean>(false);
    const [categoryToUse, setCategoryToUse] = useState<string>("");

    useEffect(() => {
        if (props.route !== undefined) {
            const categoriesAsArray = Object.keys(props.route.params.categories);
            const categoriesWithCapitalFirst = categoriesAsArray.map(subjectString => capitalizeFirstLetter(subjectString));
            setAllCategories(categoriesWithCapitalFirst);
            setAllQuestions(props.route.params.categories);
        }
    }, [])

    const navigateToProperQuestions = (): void => {
        setShowModal(false);

        const questionsToUse = allQuestions[categoryToUse.toLowerCase()].questions;

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

    const renderCategoriesToUI = (): ReactNode => {
        if (allCategories.length === 0) return;

        return allCategories.map(category => {
            return <TouchableOpacity key={category} style={styles.buttonContainer}
                                     onPress={() => openModalAndSetState(category)}>
                <Text style={styles.text}>{category}</Text>
            </TouchableOpacity>;
        });
    };

    return (
        <View style={styles.outerContainer}>
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
