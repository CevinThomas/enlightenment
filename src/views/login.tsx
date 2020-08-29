import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {Auth} from "aws-amplify";
import {Alert} from "react-native";
import {useGlobalStateUpdate} from "../contexts/navigationContext";
import {CHANGE_NAV} from "../constants/dispatch";

const Login = (props) => {

    const updateGlobalState = useGlobalStateUpdate();

    async function login(email: string, password: string): Promise<void> {
        try {
            const response = await Auth.signIn(email, password);

            if (response.signInUserSession) {
                return updateGlobalState({type: CHANGE_NAV});
                //TODO: We are logged in, now change screens.
            }

            return response;
        } catch (e) {
            if (e.code === "NotAuthorizedException") return Alert.alert(e.message);
            if (e.code === "UserNotFoundException") return Alert.alert("No user exists with this email");
        }
    }

    return (
        <SignInSignUp authenticate={login} navigation={props.navigation} method={"login"}/>
    );
};

export default Login;
