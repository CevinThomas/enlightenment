import React, {ChangeEvent, useEffect} from 'react';
import styled from 'styled-components';
import Heading from "../components/heading";
import FormInput from "./formInput";
import {Input} from "../interfaces/input";
import {UserCredentials} from "../interfaces/userCredentials";

const MainSection = styled.main`
    width: 50%;
    margin: 0 auto;
    margin-top: 15em
`;

const HeadingSection = styled.section`

`;

const FormsSection = styled.section`
  width: 100%;
`;

const BottomSection = styled.section`
  margin-top: 5em;
  text-align: center;
`;

const LoginButton = styled.button`
  background-color: #F42B4B;
  border-radius: 40px;
  color: white;
  width: 100%;
  padding: 1em;
  font-size: 1.5em;
  border-color: #F42B4B;
  border-style: solid;
  text-align: center;
`

const SignUpText = styled.p`
  margin-top: 2em;
  font-size: 1em;
  color: darkgrey
`

const SignUpTextLink = styled.a`
  color: #F42B4B;
  cursor: pointer;
  text-decoration: none;
`

const LoginMessageText = styled.h4`
  color: #F42B4B;
  margin-bottom: 2em;
`

const LoadingSymbol = styled.i`
  color: white
`

interface IProps {
    inputs: Array<Input>,
    loading: boolean,
    loginMessage: string,
    loginFunction: (event: React.MouseEvent<HTMLButtonElement>) => void,
    updateEmail: (event: ChangeEvent<HTMLInputElement>) => void,
    updatePassword: (event: ChangeEvent<HTMLInputElement>) => void,
    errorMessages: UserCredentials
}

const LoginView = ({inputs, loginFunction, updateEmail, updatePassword, errorMessages, loginMessage, loading}: IProps) => {

    return (
        <MainSection>
            <HeadingSection>
                <Heading>Login</Heading>
            </HeadingSection>
            <FormsSection>
                {inputs !== undefined ? inputs.map((input: Input) => <FormInput key={input.name} errorMessages={errorMessages} updateFunction={input.name === "password" ? updatePassword : updateEmail} placeholder={input.placeholder} label={input.label} name={input.name}/>) : null}
            </FormsSection>
            <BottomSection>

                {loginMessage !== "" ? <LoginMessageText>{loginMessage}</LoginMessageText> : null}
                <LoginButton onClick={loginFunction}>Login {loading === true ? <LoadingSymbol className="fa fa-circle-o-notch fa-spin"/> : null}</LoginButton>
                <SignUpText>Don't have an account? <SignUpTextLink href={"#"}>Sign up here.</SignUpTextLink></SignUpText>
            </BottomSection>
        </MainSection>
    );
};

export default LoginView;
