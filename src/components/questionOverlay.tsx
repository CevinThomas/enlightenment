import React from 'react';
import {Dimensions, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "@ui-kitten/components";
import GlobalStyles from "../utils/globalStyles";


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
    },
    questionsContainer: {
        flexDirection: "row",
        width: width,
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
    },
    textButton: {
        backgroundColor: "white",
        padding: 20,
        width: width * 0.4,
        margin: 10,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        borderRadius: 10,
    },
    text: {
        textAlign: "center",
        color: GlobalStyles.darkColor
    }
})

export default QuestionOverlay;
