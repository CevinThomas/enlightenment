import React, {useEffect, useRef} from 'react';
import {AuthStackNavigator, BaseNavigator} from "../stackNavigators";
import {useGlobalState, useGlobalStateUpdate} from "../contexts/navigationContext";
import {Alert, AppState} from "react-native";
import {Auth} from "aws-amplify";
import {CHANGE_NAV} from "../constants/dispatch";

const RootComponent = () => {

    const state = useGlobalState();
    const updateGlobalState = useGlobalStateUpdate();

    const timeStampState = useRef(0);

    useEffect(() => {
        if (state.navigation === true) {
            AppState.addEventListener("change", checkAppStatus);
        } else {
            AppState.removeEventListener("change", checkAppStatus);
        }

    }, [state.navigation]);

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
                        updateGlobalState({type: CHANGE_NAV});
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
            {state.navigation === true ? <BaseNavigator/> : <AuthStackNavigator/>}
        </>
    );
};

export default RootComponent;