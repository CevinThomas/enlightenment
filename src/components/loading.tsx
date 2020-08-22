import React from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";

const Loading = ({isLoading}) => {

    if (isLoading === true) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default Loading;
