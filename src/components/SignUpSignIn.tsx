import React, {useEffect} from 'react';
import {Alert, Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
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
    const [errorMessages, setErrorMessages] = React.useState<{ name?: string, email: string, password: string }>({
        name: "",
        email: "",
        password: ""
    });
    const [renderUI, setRenderUI] = React.useState<number>(0);

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
        if (method === "login") {
            if (emailError === "" && passwordError === "") return true;
        } else {
            if (nameError === "" && emailError === "" && passwordError === "") return true;
        }
        setErrorMessages({
            name: nameError,
            email: emailError,
            password: passwordError
        });
        return false;
    }

    async function loginOrSignup() {
        setIsLoading(true);
        const validated = validationHandler();
        if (validated === false) return setIsLoading(false);
        setRenderUI(prevState => prevState + 1);
        if (method === "signup") {
            try {
                const response = await Auth.signUp({
                    username: userCredentials.email,
                    password: userCredentials.password,
                    attributes: {
                        email: userCredentials.email,
                        name: userCredentials.name
                    }
                });
                if (response.userConfirmed === false) {
                    setIsLoading(false);
                    props.navigation.navigate("EnterCode", {username: response.user.getUsername()});
                }
            } catch (e) {
                setIsLoading(false);
                if (e.code === "UsernameExistsException") return Alert.alert(e.message);
                return Alert.alert("There was an error, please contact support.");
            }
        } else {

            try {
                const response = await Auth.signIn(userCredentials.email, userCredentials.password);
                setIsLoading(false);
                if (response.signInUserSession) {
                    //TODO: We are logged in, now change screens.
                }
            } catch (e) {
                setIsLoading(false);
                if (e.code === "NotAuthorizedException") return Alert.alert(e.message);
            }
        }

    }

    return (
        <View style={styles.container}>
            <Button onPress={() => {
                props.navigation.navigate("Base", {
                    screen: "Home"
                });
            }} style={{backgroundColor: "blue"}}>Switch Navigators</Button>
            <View style={styles.mainContainer}>
                {method === "signup" ? <View style={styles.inputContainer}>
                    <Input autoCapitalize={"none"} autoCorrect={false}
                           onChangeText={nextValue => updateUserNameHandler(nextValue)} label={"Name"}
                           placeholder={"Enter your name"}/>

                    {errorMessages.name !== "" ? <View style={styles.errorMessageContainer}>
                        <Icon
                            animation={"pulse"}
                            style={styles.icon}
                            fill='red'
                            name='maximize-outline'
                        />
                        <Text style={styles.errorMessage}>{errorMessages.name}</Text>
                    </View> : null}
                </View> : null}

                <View style={styles.inputContainer}>
                    <Input autoCapitalize={"none"} autoCorrect={false}
                           onChangeText={nextValue => updateUserEmailHandler(nextValue)} label={"Email"}
                           placeholder={"Enter your email"}/>

                    {errorMessages.email !== "" ? <View style={styles.errorMessageContainer}>
                        <Icon
                            animation={"pulse"}
                            style={styles.icon}
                            fill='red'
                            name='maximize-outline'
                        />
                        <Text style={styles.errorMessage}>{errorMessages.email}</Text>
                    </View> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Input autoCapitalize={"none"} autoCorrect={false} caption='Should contain at least 8 symbols'
                           onChangeText={nextValue => updateUserPasswordHandler(nextValue)}
                           secureTextEntry={secureTextEntry} accessoryRight={renderIcon} label={"Password"}
                           placeholder={"Enter your password"}/>

                    {errorMessages.password !== "" ? <View style={styles.errorMessageContainer}>
                            <Icon
                                animation={"pulse"}
                                style={styles.icon}
                                fill='red'
                                name='maximize-outline'
                            />
                            <Text style={styles.errorMessage}>{errorMessages.password}</Text>
                        </View>
                        : null}
                </View>


            </View>

            <View style={styles.buttonContainer}>
                <Button onPress={loginOrSignup} style={styles.button} accessoryRight={LoadingIndicator}
                        appearance={"filled"}>{method === "signup" ? "Sign up" : "Login"}</Button>

                {method === "signup" ? null : <TouchableOpacity onPress={() => props.navigation.navigate("Signup", {})}>
                    <Text style={styles.signUpColor}>Don't have an account? Sign up here.</Text>
                </TouchableOpacity>}
            </View>


        </View>
    );
};

const {height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        height: height,
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
    },
    buttonContainer: {
        marginTop: 0,
        flex: 1
    },
    inputContainer: {
        marginTop: 20
    },
    signUpColor: {
        color: "black",
        marginTop: 20,
        textAlign: "center",
        fontSize: 14
    },
    icon: {
        width: 32,
        height: 32,
        color: "green"
    },
    button: {
        backgroundColor: "black"
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessageContainer: {
        flexDirection: "row",
        textAlign: "left"
    },
    errorMessage: {
        color: "red",
        padding: 10,
        textAlign: "left"
    }
});

export default SignInSignUp;
