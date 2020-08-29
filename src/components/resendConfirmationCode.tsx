import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Auth} from "aws-amplify";

const ResendConfirmationCode = (props) => {

    async function resendCode(username: string): Promise<any> {
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => resendCode(props.user)}>
                <Text>Resend code confirmation</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ResendConfirmationCode;
