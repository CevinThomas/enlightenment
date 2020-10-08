import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {Alert} from "react-native";
import {useGlobalStateUpdate} from "../contexts/navigationContext";
import {makeHttpsRequest} from "../utils/functions";
import EnvVariables from "../../envVariables";
import {CHANGE_NAV} from "../constants/dispatch";
import * as SecureStore from 'expo-secure-store';

const Login = (props) => {

    const updateGlobalState = useGlobalStateUpdate();

    async function login(email: string, password: string): Promise<void> {
        try {
            //TODO: Sign in to our API
            const response = await makeHttpsRequest(EnvVariables.API_ENDPOINTS.LOGIN, "POST", {email, password});
            console.log("RESP", response);
            if (response.statusCode === 204) {
                return response.message;
            } else if (response.statusCode === 200) {
                await SecureStore.setItemAsync("token", response.data.token);
                return updateGlobalState({type: CHANGE_NAV});
            }

            return response;

        } catch (e) {
            console.log("ERROR: ", e);
            if (e.code === "NotAuthorizedException") return Alert.alert(e.message);
            if (e.code === "UserNotFoundException") return Alert.alert("No user exists with this email");
        }
    }

    return (
        <SignInSignUp authenticate={login} navigation={props.navigation} method={"login"}/>
    );
};

export default Login;
