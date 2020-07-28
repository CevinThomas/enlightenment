import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import {Text} from "@ui-kitten/components";
import ButtonList from "../components/buttonList";
import GlobalStyles from "../utils/globalStyles";
import BottomBarLogo from "../components/bottomBarLogo";
import SeoQuestions from "../questions/seoQuestions";
import JavascriptQuestions from "../questions/javascriptQuestions";
import PythonCategories from "../questions/pythonQuestions";

const Home = (props) => {

    //TODO: This is obviously hard coded and will be replaced with backend functionality
    const navigateToQuestions = (e, buttonId) => {
        switch (buttonId) {
            case "seo":
                props.navigation.navigate("Categories", {
                    name: "Welcome to the SEO Course!",
                    categories: SeoQuestions,
                    id: "seo"
                });
                break;
            case "javascript":
                props.navigation.navigate("Categories", {
                    name: "Welcome to the JavaScript Course!",
                    categories: JavascriptQuestions,
                    id: "js"
                });
                break;
            case "python":
                props.navigation.navigate("Categories", {
                    name: "Welcome to the Python Course!",
                    categories: PythonCategories,
                    id: "sub"
                })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainHeading}>Welcome future Beast!</Text>
            <View style={styles.secondaryContainer}>
                <Text style={styles.secondaryText}>This is place for you to be the fucking ultimate beast and
                    advance
                    your
                    skills in the shit that is
                    required. Please, pick a category.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <FlatList keyExtractor={(item, index) => index.toString()}
                          data={["SEO", "Javascript", "Python"]}
                          renderItem={({item}) => <ButtonList navigateFunc={navigateToQuestions} key={item}
                                                              navigation={props.navigation}
                                                              boxTitle={item}/>}/>
            </View>
            <BottomBarLogo/>
        </View>
    );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    secondaryContainer: {
        backgroundColor: "white",
        padding: 30,
        marginTop: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    },
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        paddingTop: 30,
        width: width * 0.9,
        marginLeft: "auto",
        marginRight: "auto",
    },
    secondaryText: {
        color: GlobalStyles.darkColor,
        fontSize: 14,
        lineHeight: 25
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },

    mainHeading: {
        fontSize: 25,
        fontFamily: "century-gothic",
        color: GlobalStyles.darkColor
    }
});

export default Home;
