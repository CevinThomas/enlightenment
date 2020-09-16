import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {Alert} from "react-native";

const Signup = (props) => {

    async function signUp(email: string, password: string, name: string): Promise<void> {
        try {
            //TODO: Sign up to our API and handle change screens and token storage
        } catch (e) {
            if (e.code === "UsernameExistsException") return Alert.alert(e.message);
            return Alert.alert("There was an error, please contact support.");
        }
    }

    return (
        <SignInSignUp authenticate={signUp} navigation={props.navigation} method={"signup"}/>
    );

};

export default Signup;
