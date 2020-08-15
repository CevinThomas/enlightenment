import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Button, Icon, Input, Spinner, Text} from "@ui-kitten/components";
import {Auth} from "aws-amplify";

const SignInSignUp = (props) => {

    const [method, setMethod] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
    const [userCredentials, setUserCredentials] = React.useState<{ email: string, password: string, name: string }>();

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

    async function loginOrSignup() {
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
                <Input autoCapitalize={"none"} autoCorrect={false}
                       onChangeText={nextValue => updateUserEmailHandler(nextValue)} label={"Email"}
                       placeholder={"Enter your email"}/>
                <Input autoCapitalize={"none"} autoCorrect={false} caption='Should contain at least 8 symbols'
                       onChangeText={nextValue => updateUserPasswordHandler(nextValue)}
                       secureTextEntry={secureTextEntry} accessoryRight={renderIcon} label={"Password"}
                       placeholder={"Enter your password"}/>
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
});

export default SignInSignUp;
