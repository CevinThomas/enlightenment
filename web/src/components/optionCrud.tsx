import React from 'react';
import styled from "styled-components";
import {Options} from "../interfaces/questionsData";

const Container = styled.div`

`

const QuestionOption = styled.input`

`

const CorrectCheckBox = styled.input`

`

const ExplanationInput = styled.input`

`

interface IProps {
    value: Options,
    placeholder: number,
    optionChange: (e: any) => void,
    correctHandler: (e: any) => void,
    optionExplanation: (e: any) => void,
}

const OptionCrud = ({value, placeholder, optionChange, correctHandler, optionExplanation}: IProps) => {
    return (
        <Container>
            <CorrectCheckBox checked={value.correct} id={placeholder.toString()} onChange={correctHandler} type={"checkbox"}/>
            <QuestionOption onChange={optionChange} id={placeholder.toString()} placeholder={`Option ${placeholder + 1}`} value={value.choice}/>
            <ExplanationInput value={value.explanation} onChange={optionExplanation} name={placeholder.toString()} placeholder={"Explanation..."} />
        </Container>
    );
};

export default OptionCrud;
