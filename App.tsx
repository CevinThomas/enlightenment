import React, {useState} from 'react';
import "react-native-gesture-handler";
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {BaseNavigator} from "./src/stackNavigators";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {default as theme} from "./custom-theme.json";
import {default as mapping} from "./mapping.json";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

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
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider customMapping={mapping} theme={{...eva.dark, ...theme}} {...eva}>
                <BaseNavigator/>
            </ApplicationProvider>
        </React.Fragment>

    );
}


