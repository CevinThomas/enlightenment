import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Button, Icon, Input, Spinner, Text} from "@ui-kitten/components";
import {Auth} from "aws-amplify";
import UseValidateAuthFields from "../customHooks/useValidateAuthFields";

const SignInSignUp = (props) => {

    const [method, setMethod] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
    const [userCredentials, setUserCredentials] = React.useState<{ email: string, password: string, name: string }>({
        name: "",
        password: "",
        email: ""
    });
    const [errorMessages, setErrorMessages] = React.useState<{ name: string, email: string, password: string }>({
        name: "",
        email: "",
        password: ""
    });

    const [nameError, emailError, passwordError] = UseValidateAuthFields(userCredentials.name, userCredentials.email, userCredentials.password);

    useEffect(() => {
        if (props.method !== "") setMethod(props.method);
    }, [props.method]);

    const LoadingIndicator = (props) => (
        <View style={[props.style, styles.indicator]}>
            {isLoading === true ? <Spinner size='medium'/> : null}
        </View>
    );

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    function updateUserEmailHandler(value) {
        setUserCredentials({
            ...userCredentials,
            email: value
        });
    }

    function updateUserPasswordHandler(value) {
        setUserCredentials({
            ...userCredentials,
            password: value
        });
    }

    function updateUserNameHandler(value) {
        setUserCredentials({
            ...userCredentials,
            name: value
        });
    }

    function toggleSecureEntry() {
        setSecureTextEntry(!secureTextEntry);
    }

    function validationHandler() {
        if (nameError === "" && emailError === "" && passwordError === "") return true;
        setErrorMessages({
            name: nameError,
            email: emailError,
            password: passwordError
        });
        return false;
    }

    async function loginOrSignup() {
        const validated = validationHandler();
        console.log(validated);
        if (validated === false) return;
        if (method === "signup") {
            const response = await Auth.signUp({
                username: userCredentials.email,
                password: userCredentials.password,
                attributes: {
                    email: userCredentials.email,
                    name: userCredentials.name
                }
            });

            console.log(response);
        } else {

        }
    }

    return (
        <View>

            <View>
                <Input autoCapitalize={"none"} autoCorrect={false}
                       onChangeText={nextValue => updateUserNameHandler(nextValue)} label={"Name"}
                       placeholder={"Enter your name"}/>
                {errorMessages.name !== "" ? <Text style={styles.errorMessage}>{errorMessages.name}</Text> : null}
                <Input autoCapitalize={"none"} autoCorrect={false}
                       onChangeText={nextValue => updateUserEmailHandler(nextValue)} label={"Email"}
                       placeholder={"Enter your email"}/>
                {errorMessages.email !== "" ? <Text style={styles.errorMessage}>{errorMessages.email}</Text> : null}
                <Input autoCapitalize={"none"} autoCorrect={false} caption='Should contain at least 8 symbols'
                       onChangeText={nextValue => updateUserPasswordHandler(nextValue)}
                       secureTextEntry={secureTextEntry} accessoryRight={renderIcon} label={"Password"}
                       placeholder={"Enter your password"}/>
                {errorMessages.password !== "" ?
                    <Text style={styles.errorMessage}>{errorMessages.password}</Text> : null}
            </View>

            <Button onPress={loginOrSignup} style={styles.button} accessoryRight={LoadingIndicator}
                    appearance={"filled"}>{method === "signup" ? "Sign up" : "Login"}</Button>

            {method === "signup" ? null : <TouchableOpacity onPress={() => props.navigation.navigate("Signup", {})}>
                <Text style={styles.signUpColor}>Don't have an account? Sign up here.</Text>
            </TouchableOpacity>}

        </View>
    );
};

const styles = StyleSheet.create({
    signUpColor: {
        color: "blue"
    },
    button: {
        backgroundColor: "blue"
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        color: "white",
        backgroundColor: "red"
    }
});

export default SignInSignUp;
