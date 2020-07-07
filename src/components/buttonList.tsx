import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import JavascriptQuestions from "../questions/javascriptQuestions";
import PythonCategories from "../questions/pythonQuestions"
import SeoQuestions from "../questions/seoQuestions";
const ButtonList = (props) => {

    function f(e, buttonId) {
        switch (buttonId) {
            case "seo":
                props.navigation.navigate("Subjects", {
                    name: "Welcome to the SEO Course!",
                    categories: SeoQuestions,
                    id: "seo"
                });
                break;
            case "javascript":
                props.navigation.navigate("Subjects", {
                    name: "Welcome to the JavaScript Course!",
                    categories: JavascriptQuestions,
                    id: "js"
                });
                break;
            case "python":
                props.navigation.navigate("Subjects", {
                    name: "Welcome to the Python Course!",
                    categories: PythonCategories,
                    id: "sub"
                })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <ImageBackground source={require("../../assets/images/question-mark-2492009_1920.jpg")}
                                 style={styles.backgroundImageStyling}>

                    <Text onPress={(event) => f(event, props.boxTitle.toLowerCase())}
                          style={styles.boxTitle}>{props.boxTitle}
                    </Text>

                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxTitle: {
        color: "white",
        textAlign: "center",
        paddingTop: 5,
        width: "100%",
        height: "100%",
        lineHeight: 140,
        fontSize: 26,
        zIndex: 9999
    },
    backgroundImageStyling: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
    },
    container: {
        marginTop: 20,
        backgroundColor: "white",
        color: "white",
        flexDirection: "row",
        borderRadius: 10,
    },
    innerContainer: {
        height: 150,
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: 20,
    }
});

export default ButtonList;
