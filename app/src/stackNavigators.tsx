import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Icon from "react-native-vector-icons/Octicons";
import GlobalStyles from "./utils/globalStyles";
import CategoriesAndSubjects from "./views/categories";
import EnterMfaCode from "./views/enterMfaCode";
import History from "./views/history";
import Home from "./views/home";
import invites from "./views/invites";
import Login from "./views/login";
import Questions from "./views/questions";
import Signup from "./views/signup";

const MenuIcon = (navigation) => (
  <Icon
    style={{marginRight: 20}}
    name="three-bars"
    size={30}
    color="white"
    onPress={() => navigation.toggleDrawer()}
  />
);

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={BaseNavigator} />
        <Drawer.Screen name="History" component={HistoryNavigator} />
        <Drawer.Screen name="Invites" component={InviteNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export const InviteNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Invites"
        component={invites}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#233A44",
            shadowColor: "transparent",
          },
          headerTintColor: GlobalStyles.darkColor,
          animationTypeForReplace: "pop",
          headerRight: () => MenuIcon(navigation),
        }}
      />
    </Stack.Navigator>
  );
};

export const HistoryNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#233A44",
            shadowColor: "transparent",
          },
          headerTintColor: GlobalStyles.darkColor,
          animationTypeForReplace: "pop",
          headerRight: () => MenuIcon(navigation),
        }}
      />
    </Stack.Navigator>
  );
};

export const BaseNavigator = ({ navigation }) => {
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
          headerRight: () => MenuIcon(navigation),
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
          headerBackTitle: " ",
        }}
      />
      <Stack.Screen
        name={"CategoriesAndSubjects"}
        component={CategoriesAndSubjects}
        options={{
          headerStyle: {
            backgroundColor: "#233A44",
            shadowColor: "transparent",
          },
          headerTintColor: "white",
          headerTitle: "",
          headerBackTitle: " ",
          headerRight: () => MenuIcon(navigation),
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
