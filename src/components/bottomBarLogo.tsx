import React from 'react';
import {Image, View, StyleSheet} from "react-native";

const BottomBarLogo = () => {
    return (
        <View style={styles.container}>
            <Image accessibilityLabel={"BottomBarLogo"} style={styles.image}
                   source={require("../../assets/images/anegy-logo.png")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginBottom: 20
    },
    image: {
        resizeMode: "contain",
        overflow: "visible",
        width: 100,
    }
})

export default BottomBarLogo
