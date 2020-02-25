import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from "react-native";

class ModalRemoveQuestionsTest extends Component {

    state = {
        modalVisible: false,
        removedQuestions: []
    };

    removeQuestion(event, question) {
        let updatedRemovedQuestions = [...this.state.removedQuestions];
        if (updatedRemovedQuestions.includes(question)) {
            return;
        }
        updatedRemovedQuestions.push(question);
        this.setState({removedQuestions: updatedRemovedQuestions});
    }


    recallQuestion(event, question) {
        let clonedRemovedArray = [...this.state.removedQuestions];
        const index = clonedRemovedArray.indexOf(question);
        clonedRemovedArray.splice(index, 1);
        this.setState({removedQuestions: clonedRemovedArray});
    }

    async updateQuestions() {
        const questionsToBeSaved = this.props.allQuestions.filter(questions => {
            if (!this.state.removedQuestions.includes(questions.question)) {
                return questions;
            }
        });
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

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.removeContainer}>
                    <Text style={styles.removeHeading}>What Questions do you want to remove?</Text>
                    {this.props.allQuestions.map(question => {
                        return <TouchableOpacity
                            key={question.question}
                            style={[styles.removeQuestionContainer, {backgroundColor: this.state.removedQuestions.includes(question.question) ? "red" : "white"}]}><Text
                            style={[styles.removeQuestion, {
                                color: this.state.removedQuestions.includes(question.question) ? "white" : "green",
                            }]}
                            onPress={this.state.removedQuestions.includes(question.question) ? (event) => this.recallQuestion(event, question.question) : (event) => this.removeQuestion(event, question.question)}>{question.question}</Text></TouchableOpacity>;
                    })}
                </View>
                <View>
                    <View style={styles.mainButtonContainer}>
                        <TouchableOpacity style={styles.buttonContainerTwo} onPress={this.updateQuestions.bind(this)}>
                            <Text style={{color: "white"}}>Update Questions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainerTwo} onPress={this.resetQuestions.bind(this)}>
                            <Text style={{color: "white"}}>Reset Questions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    removeQuestionContainer: {
        borderRadius: 10,
        marginBottom: 15,
    },
    removeHeading: {
        color: "green",
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
        backgroundColor: "green",
        borderRadius: 10,
        color: "white",
        padding: 10,
        textAlign: "center"
    },
    removeQuestion: {
        fontSize: 12,
        padding: 10
    },
    mainButtonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },
    buttonContainerTwo: {
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "green",
        borderRadius: 10,
        margin: 5,
        color: "white",
        padding: 10,
    },
});

export default ModalRemoveQuestionsTest;
