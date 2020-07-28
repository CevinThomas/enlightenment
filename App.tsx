import React, {useState} from 'react';
import "react-native-gesture-handler";
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {BaseNavigator} from "./src/stackNavigators";
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from "@ui-kitten/components";
import {default as theme} from "./custom-theme.json";

export default function App() {

    const [fontLoaded, setFontLoaded] = useState(false);

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
        <ApplicationProvider theme={{...eva.dark, ...theme}} {...eva}>
            <BaseNavigator/>
        </ApplicationProvider>
    );
}


