import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Button, Icon, Input, Spinner, Text} from "@ui-kitten/components";

const SignInSignUp = (props) => {

    const [method, setMethod] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
    const [userCredentials, setUserCredentials] = React.useState<{ email: string, password: string }>();

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

    function simulateLoading() {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

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

    function toggleSecureEntry() {
        setSecureTextEntry(!secureTextEntry);
    }

    return (
        <View>

            <View>
                <Input onChangeText={nextValue => updateUserEmailHandler(nextValue)} label={"Email"}
                       placeholder={"Enter your email"}/>
                <Input onChangeText={nextValue => updateUserPasswordHandler(nextValue)}
                       secureTextEntry={secureTextEntry} accessoryRight={renderIcon} label={"Password"}
                       placeholder={"Enter your password"}/>
            </View>

            <Button onPress={simulateLoading} style={styles.button} accessoryRight={LoadingIndicator}
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
