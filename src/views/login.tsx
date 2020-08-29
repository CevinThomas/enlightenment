import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";
import {Auth} from "aws-amplify";
import {Alert} from "react-native";

const Login = (props) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function login(email: string, password: string): Promise<void> {
        setIsLoading(true);
        try {
            const response = await Auth.signIn(email, password);
            setIsLoading(false);
            return response;
        } catch (e) {
            setIsLoading(false);
            if (e.code === "NotAuthorizedException") return Alert.alert(e.message);
        }
    }

    return (
        <SignInSignUp authenticate={login} navigation={props.navigation} method={"login"}/>
    );
};

export default Login;
