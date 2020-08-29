import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {Auth} from "aws-amplify";
import {Alert} from "react-native";

const Signup = (props) => {

    async function signUp(email: string, password: string, name: string): Promise<void> {
        try {
            const response = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email,
                    name: name
                }
            });
            if (response.userConfirmed === false) {
                props.navigation.navigate("EnterCode", {username: response.user.getUsername()});
            }
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
