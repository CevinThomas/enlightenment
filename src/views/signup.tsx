import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {Alert} from "react-native";
import {makeHttpsRequest} from "../utils/functions";
import EnvVariables from "../../envVariables";
import * as SecureStore from "expo-secure-store";
import {CHANGE_NAV} from "../constants/dispatch";
import {useGlobalStateUpdate} from "../contexts/navigationContext";

const Signup = (props) => {

    const updateGlobalState = useGlobalStateUpdate();

    async function signUp(email: string, password: string, name: string): Promise<void> {
        try {
            const response = await makeHttpsRequest(EnvVariables.API_ENDPOINTS.REGISTER, "POST", {
                name,
                email,
                password
            });
            console.log(response);
            if (response.statusCode !== 200) {
                return response.message;
            } else {
                await SecureStore.setItemAsync("token", response.data.token);
                return updateGlobalState({type: CHANGE_NAV});
            }

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
