import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import JavascriptBasics from "../questions/javascriptBasics";
import SeoBasics from "../questions/seoBasics";

const ButtonList = (props) => {

    function f(e, buttonId) {
        switch (buttonId) {
            case "seo":
                props.navigation.navigate("Questions", {
                    name: "Welcome to the SEO Course!",
                    questions: SeoBasics,
                    id: "seo"
                });
                break;
            case "javascript":
                props.navigation.navigate("Questions", {
                    name: "Welcome to the JavaScript Course!",
                    questions: JavascriptBasics, id: "js"
                });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <ImageBackground source={require("../../assets/images/turquoise-1540436_1280.png")}
                                 style={{width: "100%", height: "100%", borderRadius: 10}}>
                    <Text onPress={(event) => f(event, props.boxTitle.toLowerCase())}
                          style={{
                              color: "white",
                              textAlign: "center",
                              paddingTop: 5,
                              width: "100%",
                              height: "100%",
                              lineHeight: 140,
                              fontSize: 26,
                              zIndex: 9999
                          }}>{props.boxTitle}</Text>


                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
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
        borderRadius: 10,
    }
});

export default ButtonList;
