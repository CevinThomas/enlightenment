import React, {useEffect, useState} from 'react';
import "react-native-gesture-handler";
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {default as theme} from "./custom-theme.json";
import {default as mapping} from "./mapping.json";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import {AppState} from "react-native";
import {NavigationProvider} from "./src/contexts/navigationContext";
import RootComponent from "./src/components/rootComponent";

Amplify.configure(config);

export default function App() {

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        AppState.addEventListener("change", checkAppStatus);
    }, []);

    function checkAppStatus(activeState: string): void {
        console.log(activeState);

        if (activeState === "background") {
            // Create a new Timestamp
            const timeStamp = +new Date();
            console.log(timeStamp);
            // Store Timestamp in global state
        }

        if (activeState === "active") {
            // Check if we have a timestamp stored in global state
            // If we do, then compare the two timestamps
            // Has 1h hour or more passed? Logout user and remove Timestamp in global state
            // If not 1h passed, create new timestamp and store that new one in global state
        }

    }

    function createTimeStamp() {

    }

    const fetchFonts = () => {
        return Font.loadAsync({
            'century-gothic': require('./assets/fonts/century-gothic-400.ttf'),
        });
    };

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}/>
            )
    }

    return (
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider customMapping={mapping} theme={{...eva.dark, ...theme}} {...eva}>
                <NavigationProvider>
                    <RootComponent/>
                </NavigationProvider>
            </ApplicationProvider>
        </React.Fragment>

    );
}


