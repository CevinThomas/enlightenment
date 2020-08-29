import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";

const Login = (props) => {
    return (
            <SignInSignUp navigation={props.navigation} method={"login"}/>
    );
};

export default Login;
