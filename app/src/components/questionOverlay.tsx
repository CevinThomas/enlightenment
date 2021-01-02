import React from 'react';
import {Dimensions, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "@ui-kitten/components";


const QuestionOverlay = (props) => {
    return (
        <Modal animationType={"slide"}>
            <View style={styles.container}>
                <View style={styles.questionsContainer}>
                    <TouchableOpacity onPress={props.navigateToQuestionsFunction} style={styles.textButton}>
                        <Text style={styles.text}>Quiz Me!</Text>
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.textButton}>
                            <Text style={styles.text}>Teach Me!</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </Modal>
    );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#233A44"
    },
    questionsContainer: {
        flexDirection: "row",
        width: width,
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
    },
    textButton: {
        backgroundColor: "#233A44",
        padding: 20,
        width: width * 0.4,
        margin: 10,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#545A75"
    },
    text: {
        textAlign: "center",
        color: "white"
    }
})

export default QuestionOverlay;