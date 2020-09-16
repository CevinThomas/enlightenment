import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {Alert} from "react-native";
import {useGlobalStateUpdate} from "../contexts/navigationContext";

const Login = (props) => {

    const updateGlobalState = useGlobalStateUpdate();

    async function login(email: string, password: string): Promise<void> {
        try {
            //TODO: Sign in to our API


            /*if (response.signInUserSession) {
                return updateGlobalState({type: CHANGE_NAV});
            }*/

            //return response;
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
