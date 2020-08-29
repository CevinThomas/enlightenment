import React, {useEffect, useRef} from 'react';
import {AuthStackNavigator, BaseNavigator} from "../stackNavigators";
import {useNavigation, useNavigationUpdate} from "../contexts/navigationContext";
import {Alert, AppState} from "react-native";
import {Auth} from "aws-amplify";

const RootComponent = () => {

    const navigation = useNavigation();
    const updateNavigation = useNavigationUpdate();

    const timeStampState = useRef(0);

    useEffect(() => {
        if (navigation === true) {
            AppState.addEventListener("change", checkAppStatus);
        } else {
            AppState.removeEventListener("change", checkAppStatus);
        }

    }, [navigation]);

    function checkAppStatus(activeState: string): void {

        if (activeState === "background") {
            const temporaryTimeStamp = +new Date();
            timeStampState.current = temporaryTimeStamp;
        }

        if (activeState === "active") {
            const temporaryTimeStamp = +new Date();
            const timestampDifferenceInMs = temporaryTimeStamp - timeStampState.current;
            const timestampDifferenceInMinutes = Math.round(((timestampDifferenceInMs % 86400000) % 3600000) / 60000);

            if (timeStampState.current !== 0) {
                if (timestampDifferenceInMinutes > 1) {
                    Auth.signOut().then(() => {
                        updateNavigation(false);
                        Alert.alert("Please login again.");
                    });
                } else {
                    timeStampState.current = 0;
                }
            }
        }

    }

    return (
        <>
            {navigation === true ? <BaseNavigator/> : <AuthStackNavigator/>}
        </>
    );
};

export default RootComponent;
