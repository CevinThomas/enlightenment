import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {Dimensions, StyleSheet, View} from "react-native";

const Signup = (props) => {
    return (
        <View style={styles.container}>
            <SignInSignUp navigation={props.navigation} method={"signup"}/>
        </View>
    );

};

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export default Signup;
