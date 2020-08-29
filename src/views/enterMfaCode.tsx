import React from 'react';
import {Alert, StyleSheet, View} from "react-native";
import {Button, Input, Spinner, Text} from "@ui-kitten/components";
import {Auth} from "aws-amplify";
import MainLayout from "../components/mainLayout";
import ResendConfirmationCode from "../components/resendConfirmationCode";
import {UseDispatchContext} from "../components/contextProvider";

const EnterMfaCode = (props) => {

    const updateState = UseDispatchContext();

    const [userEnteredCode, setUserEnteredCode] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    const LoadingIndicator = (props) => (
        <View style={[props.style, styles.indicator]}>
            {isLoading === true ? <Spinner size='medium'/> : null}
        </View>
    );

    async function submitCodeToCognito(): Promise<void> {
        setIsLoading(true);

        try {

            const response = await Auth.confirmSignUp(props.route.params.username, userEnteredCode.toString());
            console.log(response);
            if (response === "SUCCESS") {
                setIsLoading(false);
                return updateState({navigation: 1});

                //TODO: Navigate to Main Screen
            }

        } catch (e) {
            console.log(e);
            setIsLoading(false);
            if (e.code === "LimitExceededException") return Alert.alert(e.message);
            if (e.code === "NotAuthorizedException") return Alert.alert("You are already confirmed.");
            if (e.code === "CodeMismatchException") return Alert.alert("Wrong code, please try again.");
        }

    }

    return (
        <MainLayout>
            <View>
                <Text>
                    Please enter the text that you received in your email.
                </Text>
            </View>

            <View>
                <Input onChangeText={newValue => setUserEnteredCode(newValue)} placeholder={"Code"}/>
            </View>

            <View>
                <Button style={styles.button} accessoryRight={LoadingIndicator} onPress={submitCodeToCognito}>Submit
                    Code</Button>
            </View>
            <ResendConfirmationCode user={props.route.params.username}/>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue"
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EnterMfaCode;
