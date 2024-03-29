import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { default as theme } from "./custom-theme.json";
import { default as mapping } from "./mapping.json";
import RootComponent from "./src/components/rootComponent";
import { NavigationProvider } from "./src/contexts/navigationContext";
import { UserInformationProvider } from "./src/contexts/userInformation";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = async () => {
    return Font.loadAsync({
      "century-gothic": require("./assets/fonts/century-gothic-400.ttf"),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.log("WARNING")}
      />
    );
  }

  //TODO: Check stored Token is valid when app starts? If not valid, then ask user to login, if valid, keep user logged in.

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        customMapping={mapping}
        theme={{ ...eva.dark, ...theme }}
        {...eva}
      >
        <UserInformationProvider>
          <NavigationProvider>
            <RootComponent />
          </NavigationProvider>
        </UserInformationProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
}
