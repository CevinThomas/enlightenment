import React, {Component} from 'react';
import {Alert, AsyncStorage, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
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

    async updateQuestions() {
        const questionsToBeSaved = this.props.allQuestions.filter(questions => {
            if (!this.state.removedQuestions.includes(questions.name)) return questions;
        });
        if (questionsToBeSaved.length === 0) return Alert.alert("You cannot remove all questions.");

        try {
            await AsyncStorage.setItem(this.props.id.toString(), JSON.stringify(questionsToBeSaved));
            this.props.navigation.navigate("Home");
        } catch (e) {
            console.log(e);
        }
    }

    async resetQuestions() {
        try {
            await AsyncStorage.setItem(this.props.id.toString(), "");
            this.props.navigation.navigate("Home");
        } catch (e) {
            console.log(e);
        }
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
                                style={[styles.removeQuestionContainer, {backgroundColor: this.state.removedQuestions.includes(question.name) ? "red" : "white"}]}><Text
                                style={[styles.removeQuestion, {
                                    color: this.state.removedQuestions.includes(question.name) ? "white" : GlobalStyles.darkColor,
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
                                              onPress={this.updateQuestions.bind(this)}>
                                <Text style={{color: GlobalStyles.darkColor}}>Update Questions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainerTwo}
                                              onPress={this.resetQuestions.bind(this)}>
                                <Text style={{color: GlobalStyles.darkColor}}>Reset Questions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainerTwo}
                                              onPress={() => this.props.testFunc(this.state.allQuestions, this.state.removedQuestionsFullData, this.state.removedQuestions)}>
                                <Text style={{color: GlobalStyles.darkColor}}>Test</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity onPress={this.props.goBack} style={styles.hideButtonContainer}>
                            <Text style={{color: GlobalStyles.darkColor, textAlign: "center"}}>Go back</Text>
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
        shadowOpacity: 0.1
    },
    removeQuestionContainer: {
        borderRadius: 10,
        marginBottom: 15,
        shadowOffset: {width: 0, height: 0},
        shadowColor: GlobalStyles.darkColor,
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    },
    removeHeading: {
        color: GlobalStyles.darkColor,
        textAlign: "center",
        marginBottom: 30,
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
        paddingBottom: 50
    },
    container: {
        marginTop: 100,
        padding: 0,
        marginLeft: "auto",
        marginRight: "auto"
    },
    buttonContainer: {
        marginTop: 0,
        backgroundColor: GlobalStyles.lightColor,
        borderRadius: 10,
        color:  GlobalStyles.darkColor,
        padding: 10,
        textAlign: "center"
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
        shadowOpacity: 0.1
    },
    buttonContainerTwo: {
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: GlobalStyles.lightColor,
        borderRadius: 10,
        margin: 5,
        color: GlobalStyles.darkColor,
        padding: 10,

    },
});

export default ModalRemoveQuestions;
