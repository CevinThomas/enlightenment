import React from 'react';
import Home from "./src/components/home";
import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import TopicRoute from "./src/components/topicRoute";
import Subjects from "./src/components/subjects";
import GlobalStyles from "./src/utils/globalStyles"
const Stack = createStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Home} options={{
                    headerTitle: "Education",
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor
                }}/>
                <Stack.Screen name={"Questions"} component={TopicRoute} options={{
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor,
                    headerTitle: "",
                    gestureEnabled: false,
                    headerBackTitle: "Categories"
                }}/>
                <Stack.Screen name={"Subjects"} component={Subjects} options={{
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor,
                    headerTitle: "",
                    headerBackTitle: "Start"
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


