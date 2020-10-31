import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { CHANGE_NAV } from "../constants/dispatch";
import {
  useGlobalState,
  useGlobalStateUpdate,
} from "../contexts/navigationContext";
import { AuthStackNavigator, DrawerStack } from "../stackNavigators";

const RootComponent = () => {
  const state = useGlobalState();
  const updateGlobalState = useGlobalStateUpdate();

  const timeStampState = useRef(0);

  useEffect(() => {
    if (state.navigation === true) {
      AppState.addEventListener("change", checkAppStatus);
    } else {
      AppState.removeEventListener("change", checkAppStatus);
    }
  }, [state.navigation]);

  function checkAppStatus(activeState: string): void {
    if (activeState === "background") {
      const temporaryTimeStamp = +new Date();
      timeStampState.current = temporaryTimeStamp;
    }

    if (activeState === "active") {
      const temporaryTimeStamp = +new Date();
      const timestampDifferenceInMs =
        temporaryTimeStamp - timeStampState.current;
      const timestampDifferenceInMinutes = Math.round(
        ((timestampDifferenceInMs % 86400000) % 3600000) / 60000
      );

      if (timeStampState.current !== 0) {
        if (timestampDifferenceInMinutes > 30) {
          updateGlobalState({ type: CHANGE_NAV });
        } else {
          timeStampState.current = 0;
        }
      }
    }
  }

  return (
    <>{state.navigation === true ? <DrawerStack /> : <AuthStackNavigator />}</>
  );
};

export default RootComponent;
