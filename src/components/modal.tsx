import React, {Component} from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import GlobalStyles from "../utils/globalStyles"


class ModalExample extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>

                        {this.props.children}
                        <TouchableHighlight style={styles.hideButtonContainer}
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                            <Text style={{color: GlobalStyles.darkColor, textAlign: "center"}}>Go back</Text>
                        </TouchableHighlight>

                    </View>
                </Modal>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>

                    <Text style={{color: GlobalStyles.darkColor, textAlign: "center"}}>Remove Questions</Text>
                </TouchableHighlight>
            </View>
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
    hideButton: {
        marginLeft: "auto",
        marginRight: "auto",
        color: GlobalStyles.lightColor,
    },
});

export default ModalExample;
