import React, {useState} from 'react';
import Home from "./src/views/home";
import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import GlobalStyles from "./src/utils/globalStyles"
const Stack = createStackNavigator();
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Categories from "./src/views/categories";
import Questions from "./src/views/questions";

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
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Home} options={{
                    headerTitle: "Education",
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor
                }}/>
                <Stack.Screen name={"Questions"} component={Questions} options={{
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor,
                    headerTitle: "",
                    gestureEnabled: false,
                    headerBackTitle: "Categories"
                }}/>
                <Stack.Screen name={"Categories"} component={Categories} options={{
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor,
                    headerTitle: "",
                    headerBackTitle: "Start"
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


