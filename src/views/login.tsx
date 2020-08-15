import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import SignInSignUp from "../components/SignUpSignIn";

const Login = (props) => {
    return (
        <View style={styles.container}>
            <SignInSignUp navigation={props.navigation} method={"login"}/>
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

export default Login;
