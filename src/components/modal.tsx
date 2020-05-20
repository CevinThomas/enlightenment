import React, {Component} from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

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
                            <Text style={{color: "white", textAlign: "center"}}>Hide Modal</Text>
                        </TouchableHighlight>

                    </View>
                </Modal>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={{color: "white", textAlign: "center"}}>Remove Questions</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    hideButtonContainer: {
        padding: 20,
        backgroundColor: "green",
        width: 270,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10
    },
    hideButton: {
        marginLeft: "auto",
        marginRight: "auto",
        color: "white",
    },
    button: {
        marginTop: 0,
        backgroundColor: "green",
        borderRadius: 10,
        padding: 10,
    }
});

export default ModalExample;
