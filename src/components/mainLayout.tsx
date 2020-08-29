import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";

const MainLayout = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};

const {width} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export default MainLayout;
