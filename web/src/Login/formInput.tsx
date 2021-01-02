import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {UserCredentials} from "../interfaces/userCredentials";

const FormContainer = styled.div`
  margin: 3em 0;
  width: 100%
`;

const Input = styled.input`
  background-color: white;
  border-color: #e1e1e1;
  border-top-color: #e1e1e1;
  color: black;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.2em;
  padding: 1.2em 1.2em;
  border-style: solid;
  &::-webkit-input-placeholder {
    color: grey;
    font-size: 1em;
  }
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  color: grey;
  padding-bottom: 0.5em;
`

const ErrorContainer = styled.div`

`

const ErrorMessage = styled.p`
 color: red;
`

interface IProps {
    placeholder: string;
    name: string;
    label: string;
    updateFunction: (event: ChangeEvent<HTMLInputElement>) => void,
    errorMessages: UserCredentials
}

const FormInput = ({placeholder, name, label, updateFunction, errorMessages}: IProps): JSX.Element => {

    const [errorMessage, setErrorMessage] = useState("");

    const inputName = useMemo(() => name, [name]);

    useEffect(() => {
        // @ts-ignore
        setErrorMessage(errorMessages[inputName])
    }, [errorMessages])


    return (
        <React.Fragment>
            <FormContainer>
                <Label>{label}</Label>
                <Input type={inputName} onChange={updateFunction} placeholder={placeholder} name={name}/>
                {errorMessage !== "" ? <ErrorContainer><ErrorMessage>{errorMessage}</ErrorMessage></ErrorContainer> : null}
            </FormContainer>
        </React.Fragment>
    );
};

export default FormInput;
