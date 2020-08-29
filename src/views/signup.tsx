import React from 'react';
import SignInSignUp from "../components/SignUpSignIn";

const Signup = (props) => {
    return (
            <SignInSignUp navigation={props.navigation} method={"signup"}/>
    );

};

export default Signup;
