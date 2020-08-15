import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {View} from "react-native";

const Signup = (props) => {
    return (
        <View>
            <SignInSignUp navigation={props.navigation} method={"signup"}/>
        </View>
    );
};

export default Signup;
