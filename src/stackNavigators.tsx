import Home from "./views/home";
import GlobalStyles from "./utils/globalStyles";
import Questions from "./views/questions";
import Categories from "./views/categories";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./views/login";
import Signup from "./views/signup";
import EnterMfaCode from "./views/enterMfaCode";

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name={"Login"} component={Login} options={{
                    headerTitle: "",
                    headerStyle: {backgroundColor: "#eee", shadowColor: 'transparent',},
                    headerTintColor: GlobalStyles.darkColor,
                }}/>
                <AuthStack.Screen name={"Signup"} component={Signup} options={{
                    headerTitle: "",
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor
                }}/>
                <AuthStack.Screen name={"EnterCode"} component={EnterMfaCode} options={{
                    headerTitle: "Enter Code",
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor
                }}/>
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};

export const BaseNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Home} options={{
                    headerTitle: "",
                    headerStyle: {backgroundColor: "#233A44", shadowColor: "transparent"},
                    headerTintColor: GlobalStyles.darkColor,
                    animationTypeForReplace: "pop"
                }}/>
                <Stack.Screen name={"Questions"} component={Questions} options={{
                    headerStyle: {backgroundColor: "#233A44", shadowColor: "transparent"},
                    headerTintColor: "white",
                    headerTitle: "",
                    gestureEnabled: false,
                    headerBackTitle: "Categories"
                }}/>
                <Stack.Screen name={"Categories"} component={Categories} options={{
                    headerStyle: {backgroundColor: "#233A44", shadowColor: "transparent"},
                    headerTintColor: "white",
                    headerTitle: "",
                    headerBackTitle: "Home"
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
