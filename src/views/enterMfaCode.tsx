import React from 'react';
import {View} from "react-native";
import {Button, Input, Text} from "@ui-kitten/components";
import {Auth} from "aws-amplify";

const EnterMfaCode = (props) => {

    const [userEnteredCode, setUserEnteredCode] = React.useState("");

    async function submitCodeToCognito() {
        console.log(userEnteredCode);
        const response = await Auth.confirmSignUp(props.route.params.username, userEnteredCode.toString());
        console.log(response);
    }

    return (
        <View>
            <Text>
                Please enter the text that you received in your email.
            </Text>

            <Input onChangeText={newValue => setUserEnteredCode(newValue)} placeholder={"Code"}/>

            <Button onPress={submitCodeToCognito}>Submit Code</Button>

        </View>
    );
};

export default EnterMfaCode;
