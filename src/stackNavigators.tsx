import Home from "./views/home";
import GlobalStyles from "./utils/globalStyles";
import Questions from "./views/questions";
import Categories from "./views/categories";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./views/login";
import Signup from "./views/signup";

const Stack = createStackNavigator();

export const BaseNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Login"} component={Login} options={{
                    headerTitle: "Login",
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor
                }}/>
                <Stack.Screen name={"Signup"} component={Signup} options={{
                    headerTitle: "Sign Up",
                    headerStyle: {backgroundColor: "#eee"},
                    headerTintColor: GlobalStyles.darkColor
                }}/>
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
};
