import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import GlobalStyles from "./utils/globalStyles";
import Categories from "./views/categories";
import EnterMfaCode from "./views/enterMfaCode";
import History from "./views/history";
import Home from "./views/home";
import Login from "./views/login";
import Questions from "./views/questions";
import Signup from "./views/signup";

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={BaseNavigator} />
        <Drawer.Screen name="History" component={History} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export const BaseNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Home"}
        component={Home}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#233A44",
            shadowColor: "transparent",
          },
          headerTintColor: GlobalStyles.darkColor,
          animationTypeForReplace: "pop",
        }}
      />
      <Stack.Screen
        name={"Questions"}
        component={Questions}
        options={{
          headerStyle: {
            backgroundColor: "#233A44",
            shadowColor: "transparent",
          },
          headerTintColor: "white",
          headerTitle: "",
          gestureEnabled: false,
          headerBackTitle: "Categories",
        }}
      />
      <Stack.Screen
        name={"Categories"}
        component={Categories}
        options={{
          headerStyle: {
            backgroundColor: "#233A44",
            shadowColor: "transparent",
          },
          headerTintColor: "white",
          headerTitle: "",
          headerBackTitle: "Home",
        }}
      />
    </Stack.Navigator>
  );
};

export const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name={"Login"}
          component={Login}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#eee",
              shadowColor: "transparent",
            },
            headerTintColor: GlobalStyles.darkColor,
          }}
        />
        <AuthStack.Screen
          name={"Signup"}
          component={Signup}
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "#eee" },
            headerTintColor: GlobalStyles.darkColor,
          }}
        />
        <AuthStack.Screen
          name={"EnterCode"}
          component={EnterMfaCode}
          options={{
            headerTitle: "Enter Code",
            headerStyle: { backgroundColor: "#eee" },
            headerTintColor: GlobalStyles.darkColor,
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
