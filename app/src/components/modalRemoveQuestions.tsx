import React, {Component} from 'react';
import {Alert, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "@ui-kitten/components";
import GlobalStyles from "../utils/globalStyles";

class ModalRemoveQuestions extends Component {

    state = {
        allQuestions: [],
        modalVisible: false,
        removedQuestions: [],
        removedQuestionsFullData: [],
        questionsHaveBeenRemoved: false
    };

    componentDidMount(): void {
        if (this.props.allQuestions !== undefined) {
            if (this.props.allQuestions.length !== this.props.originalQuestions.length) {
                this.setState({
                    questionsHaveBeenRemoved: true
                });
            }
            this.setState({
                allQuestions: this.props.allQuestions
            });
        }
    }

    removeQuestion(event, question) {
        let updatedRemovedQuestions = [...this.state.removedQuestions];
        if (updatedRemovedQuestions.includes(question.name)) return;
        let updatedRemovedQuestionsFullInfo = [...this.state.removedQuestionsFullData];
        updatedRemovedQuestionsFullInfo.push(question);
        updatedRemovedQuestions.push(question.name);
        this.setState({
            removedQuestions: updatedRemovedQuestions,
            removedQuestionsFullData: updatedRemovedQuestionsFullInfo
        });
    }


    recallQuestion(event, question) {
        let clonedRemovedArray = [...this.state.removedQuestions];
        const index = clonedRemovedArray.indexOf(question);
        clonedRemovedArray.splice(index, 1);
        this.setState({removedQuestions: clonedRemovedArray});
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.container}>
                    <View style={styles.removeContainer}>
                        <Text style={styles.removeHeading}>What Questions do you want to remove?</Text>

                        {this.state.allQuestions !== undefined ? this.state.allQuestions.map(question => {
                            return <TouchableOpacity
                                key={question.name}
                                style={[styles.removeQuestionContainer, {
                                    backgroundColor: this.state.removedQuestions.includes(question.name) ? "red" : "#233A44",
                                    borderColor: this.state.removedQuestions.includes(question.name) ? "transparent" : "#545A75"
                                }]}><Text
                                style={[styles.removeQuestion, {
                                    color: "white",
                                }]}
                                onPress={this.state.removedQuestions.includes(question.name) ? (event) => this.recallQuestion(event, question.name) : (event) => this.removeQuestion(event, question)}>{question.name}</Text>
                            </TouchableOpacity>;
                        }) : null}
                    </View>

                    <View>
                        {this.state.questionsHaveBeenRemoved ? <View style={{marginTop: 10}}>
                            <Text style={{color: "red", textAlign: "center",}}>Questions have been removed</Text>
                        </View> : null}

                        <View style={styles.mainButtonContainer}>

                            <TouchableOpacity style={styles.buttonContainerTwo}
                                              onPress={() => this.props.updateFunc(this.state.allQuestions, this.state.removedQuestionsFullData, this.state.removedQuestions)}>
                                <Text style={{color: "white"}}>Update Questions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainerTwo}
                                              onPress={this.props.resetFunc}>
                                <Text style={{color: "white"}}>Reset Questions</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity onPress={this.props.goBack} style={styles.hideButtonContainer}>
                            <Text style={{color: "white", textAlign: "center"}}>Go back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    hideButtonContainer: {
        padding: 20,
        backgroundColor: GlobalStyles.lightColor,
        width: 270,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        backgroundColor: "#233A44",
        borderWidth: 2,
        borderColor: "#545A75"
    },
    removeQuestionContainer: {
        borderRadius: 10,
        marginBottom: 15,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#233A44",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
        backgroundColor: "#233A44",
        borderWidth: 2,
        borderColor: "#545A75"
    },
    removeHeading: {
        color: "white",
        fontSize: 22,
        marginBottom: 50,
    },
    removeContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eee",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        paddingBottom: 50,
        backgroundColor: "#233A44",
    },
    container: {
        flex: 1,
        paddingTop: 100,
        padding: 0,
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        backgroundColor: "#233A44"
    },
    buttonContainer: {
        marginTop: 0,
        backgroundColor: "#233A44",
        borderRadius: 10,
        color: GlobalStyles.darkColor,
        padding: 10,
        textAlign: "center",
    },
    removeQuestion: {
        fontSize: 12,
        padding: 10,
    },
    mainButtonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1,
    },
    buttonContainerTwo: {
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#233A44",
        borderRadius: 10,
        margin: 5,
        color: "white",
        padding: 10,
        borderWidth: 2,
        borderColor: "#545A75"

    },
});

export default ModalRemoveQuestions;
