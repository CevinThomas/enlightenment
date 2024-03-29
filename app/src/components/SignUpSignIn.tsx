import { Button, Icon, Input, Spinner, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import UseValidateAuthFields from "../customHooks/useValidateAuthFields";
import GlobalStyles from "../utils/globalStyles";
import MainLayout from "./mainLayout";

const SignInSignUp = (props) => {
  const [method, setMethod] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  const [userCredentials, setUserCredentials] = React.useState<{
    email: string;
    password: string;
    name: string;
  }>({
    name: "",
    password: "",
    email: "",
  });
  const [errorMessages, setErrorMessages] = React.useState<{
    name?: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [renderUI, setRenderUI] = React.useState<number>(0);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  const [nameError, emailError, passwordError] = UseValidateAuthFields(
    userCredentials.name,
    userCredentials.email,
    userCredentials.password
  );

  useEffect(() => {
    if (props.method !== "") setMethod(props.method);
    return () => {};
  }, [props.method]);

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      {isLoading === true ? <Spinner size="medium" /> : null}
    </View>
  );

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  function updateUserEmailHandler(value) {
    setUserCredentials({
      ...userCredentials,
      email: value,
    });
  }

  function updateUserPasswordHandler(value) {
    setUserCredentials({
      ...userCredentials,
      password: value,
    });
  }

  function updateUserNameHandler(value) {
    setUserCredentials({
      ...userCredentials,
      name: value,
    });
  }

  function toggleSecureEntry() {
    setSecureTextEntry(!secureTextEntry);
  }

  function validationHandler() {
    if (method === "login") {
      if (emailError === "" && passwordError === "") return true;
    } else {
      if (nameError === "" && emailError === "" && passwordError === "")
        return true;
    }
    setErrorMessages({
      name: nameError,
      email: emailError,
      password: passwordError,
    });
    return false;
  }

  function resetErrorMessages() {
    setErrorMessages({
      name: "",
      email: "",
      password: "",
    });
  }

  async function loginOrSignup() {
    setIsLoading(true);
    const validated = validationHandler();
    if (validated === false) return setIsLoading(false);
    resetErrorMessages();
    setRenderUI((prevState) => prevState + 1);

    if (method === "signup") {
      const signUpError = await props.authenticate(
        userCredentials.email,
        userCredentials.password,
        userCredentials.name
      );

      setLoginErrorMessage(signUpError);

      setIsLoading(false);
    } else {
      const loginMessage = await props.authenticate(
        userCredentials.email,
        userCredentials.password
      );
      if (loginMessage) setLoginErrorMessage(loginMessage.message);
      setIsLoading(false);
    }
  }

  async function loginAsCevin() {
    await props.authenticate("cevin.thomas.ny@gmail.com", "Nygiants1");
  }

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingStyles}>
            {props.method === "login" ? "Login" : "Register"}
          </Text>
        </View>
        <Button
          onPress={loginAsCevin}
          style={styles.button}
          accessoryRight={LoadingIndicator}
          appearance={"filled"}
        >
          {method === "signup" ? "Sign up" : "Login as Cevin"}
        </Button>
        <View style={styles.mainContainer}>
          {method === "signup" ? (
            <View style={styles.inputContainer}>
              <Input
                textStyle={styles.inputTextStyle}
                style={styles.input}
                autoCapitalize={"none"}
                autoCorrect={false}
                onChangeText={(nextValue) => updateUserNameHandler(nextValue)}
                label={"Name"}
                placeholder={"Enter your name"}
              />

              {errorMessages.name !== "" ? (
                <View style={styles.errorMessageContainer}>
                  <Icon
                    animation={"pulse"}
                    style={styles.icon}
                    fill="red"
                    name="maximize-outline"
                  />
                  <Text style={styles.errorMessage}>{errorMessages.name}</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Input
              textStyle={styles.inputTextStyle}
              status={"focused"}
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={(nextValue) => updateUserEmailHandler(nextValue)}
              label={"Email"}
              placeholder={"Enter your email"}
            />

            {errorMessages.email !== "" ? (
              <View style={styles.errorMessageContainer}>
                <Icon
                  animation={"pulse"}
                  style={styles.icon}
                  fill="red"
                  name="maximize-outline"
                />
                <Text style={styles.errorMessage}>{errorMessages.email}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Input
              textStyle={styles.inputTextStyle}
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={(nextValue) => updateUserPasswordHandler(nextValue)}
              secureTextEntry={secureTextEntry}
              accessoryRight={renderIcon}
              label={"Password"}
              placeholder={"Enter your password"}
            />

            {errorMessages.password !== "" ? (
              <View style={styles.errorMessageContainer}>
                <Icon
                  animation={"pulse"}
                  style={styles.icon}
                  fill="red"
                  name="maximize-outline"
                />
                <Text style={styles.errorMessage}>
                  {errorMessages.password}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {loginErrorMessage !== "" ? (
          <View>
            <Text style={[styles.errorMessage, { textAlign: "center" }]}>
              {loginErrorMessage}
            </Text>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <Button
            onPress={loginOrSignup}
            style={styles.button}
            accessoryRight={LoadingIndicator}
            appearance={"filled"}
          >
            {method === "signup" ? "Sign up" : "Login"}
          </Button>

          {method === "signup" ? null : (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup", {})}
            >
              <Text style={styles.signUpColor}>
                Don't have an account?{" "}
                <Text style={{ color: "#F42B4B" }}>Sign up here.</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </MainLayout>
  );
};

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  inputTextStyle: {
    color: "black",
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#e1e1e1",
    color: "black",
  },
  headingContainer: {
    marginTop: heightPercentageToDP("10%"),
  },
  headingStyles: {
    fontSize: widthPercentageToDP("15%"),
    color: GlobalStyles.darkColor,
  },
  container: {
    backgroundColor: "#eee",
    height: height,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 0,
    flex: 1,
  },
  inputContainer: {
    marginTop: 20,
  },
  signUpColor: {
    color: "#000000",
    opacity: 0.7,
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
  },
  icon: {
    width: 32,
    height: 32,
    color: "green",
  },
  button: {
    color: GlobalStyles.darkColor,
    backgroundColor: "#F42B4B",
    borderRadius: 40,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessageContainer: {
    flexDirection: "row",
    textAlign: "left",
  },
  errorMessage: {
    color: "red",
    padding: 10,
    textAlign: "left",
  },
});

export default SignInSignUp;
