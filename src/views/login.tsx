import React from 'react';
import {View} from "react-native";
import SignInSignUp from "../components/SignUpSignIn";

const Login = (props) => {
    return (
        <View>
            <SignInSignUp navigation={props.navigation} method={"login"}/>
        </View>
    );
};

export default Login;
