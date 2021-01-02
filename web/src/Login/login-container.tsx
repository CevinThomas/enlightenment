import React, {useEffect} from 'react';
import LoginView from "./login-view";
import UseValidateAuthFields from "../components/hooks/useValidateAuthFields";
import {UserCredentials} from "../interfaces/userCredentials";
import Axios from "axios";
import EnvVariables from "../envVariables";
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom"


const inputs = [
    {placeholder: "Enter your email", name: "email", label: "Email"},
    {placeholder: "Enter your password", name: "password", label: "Password"}
];

const LoginContainer = (props: any) => {

    const [userCredentials, setUserCredentials] = React.useState<UserCredentials>({
        email: "",
        password: "",
    });
    const [errorMessages, setErrorMessages] = React.useState<UserCredentials>({
        email: "",
        password: ""
    });
    const [renderUI, setRenderUI] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loginMessage, setLoginMessage] = React.useState<string>("");

    const [emailError, passwordError] = UseValidateAuthFields(userCredentials.email, userCredentials.password);


    function validationHandler() {

        if (emailError === "" && passwordError === "") return true;

        setErrorMessages({
            email: emailError,
            password: passwordError
        });
        return false;
    }

    async function resetErrorMessages() {
        setErrorMessages({
            email: "",
            password: ""
        });
    }

    function updateUserEmailHandler(event: any) {
        setUserCredentials({
            ...userCredentials,
            email: event.target.value
        });
    }

    function updateUserPasswordHandler(event: any) {
        setUserCredentials({
            ...userCredentials,
            password: event.target.value
        });
    }

    async function login(): Promise<any> {
        setIsLoading(true);
        const validated = validationHandler();
        if (validated === false) return setIsLoading(false);
        resetErrorMessages();
        setRenderUI(prevState => prevState + 1);

        Axios.post(`${EnvVariables.API_ENDPOINTS.LOGIN}`, {  email: userCredentials.email,
            password: userCredentials.password }, {
            withCredentials: true
        })
            .then(function (response) {
                if (response.data.statusCode === 204) {
                    setLoginMessage(response.data.message)
                    return setIsLoading(false);
                } else if (response.data.statusCode === 200) {
                    const cookies = new Cookies();
                    cookies.set('token', response.data.data.token, { path: '/', maxAge: 3600 });
                    // Change URL
                     setIsLoading(false);
                    return props.history.push('/add-questions')


                }

            })
            .catch(function (error: any) {
                console.log(error);
                setIsLoading(false);
            });

        /*if (resolvedResponse.statusCode === 204) {
            return resolvedResponse.message;
        } else if (resolvedResponse.statusCode === 200) {
            //TODO: Set token in cookies
        }*/

    }


    return (
        <LoginView loading={isLoading} loginMessage={loginMessage} errorMessages={errorMessages} updateEmail={updateUserEmailHandler} updatePassword={updateUserPasswordHandler} loginFunction={login} inputs={inputs}/>
    );
};

export default withRouter(LoginContainer);
