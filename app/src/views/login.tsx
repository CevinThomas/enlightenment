import * as SecureStore from "expo-secure-store";
import React from "react";
import { Alert } from "react-native";
import EnvVariables from "../../envVariables";
import SignInSignUp from "../components/SignUpSignIn";
import { CHANGE_NAV } from "../constants/dispatch";
import { useGlobalStateUpdate } from "../contexts/navigationContext";
import { useGlobalUserInformationStateUpdate } from "../contexts/userInformation";
import { makeHttpsRequest } from "../utils/functions";

const Login = (props) => {
  const updateGlobalState = useGlobalStateUpdate();
  const updateUserState = useGlobalUserInformationStateUpdate();

  async function login(email: string, password: string): Promise<void> {
    try {
      //TODO: Sign in to our API
      const response = await makeHttpsRequest(
        EnvVariables.API_ENDPOINTS.LOGIN,
        "POST",
        { email, password }
      );
      console.log(response.data.licenceId);
      if (response.statusCode === 204) {
        return response.message;
      } else if (response.statusCode === 200) {
        await SecureStore.setItemAsync("token", response.data.token);
        updateUserState({
          type: "LICENCEID",
          payload: response.data.licenceId,
        });
        return updateGlobalState({ type: CHANGE_NAV });
      }

      return response;
    } catch (e) {
      if (e.code === "NotAuthorizedException") return Alert.alert(e.message);
      if (e.code === "UserNotFoundException")
        return Alert.alert("No user exists with this email");
    }
  }

  return (
    <SignInSignUp
      authenticate={login}
      navigation={props.navigation}
      method={"login"}
    />
  );
};

export default Login;
