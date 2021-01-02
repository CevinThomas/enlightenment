import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import styled from "styled-components"
import OptionCrud from "./optionCrud";
import {Options, QuestionsData} from "../interfaces/questionsData";

const Container = styled.div`

`

const QuestionName = styled.input`

`

const CategoryInput = styled.input`

`

interface IProps {
    questionData: QuestionsData,
    changeName: (e: any) => void,
    optionChange: (e: any) => void,
    categoryChange: (e: any) => void,
    correctHandler: (e: any) => void,
    optionExplanation: (e: any) => void,
}

const QuestionCrud = ({questionData, changeName, optionChange, categoryChange, correctHandler, optionExplanation}: IProps) => {
    return (
        <Container>
            <QuestionName onChange={changeName} value={questionData.name} placeholder={"Name of Question"}/>
            <CategoryInput onChange={categoryChange} value={questionData.category} placeholder={"Category"}/>
            {questionData.options.length !== 0 ? questionData.options.map((option: Options) => {
                return <OptionCrud optionExplanation={optionExplanation} correctHandler={correctHandler} optionChange={optionChange} placeholder={option.id} value={option} key={option.id}/>
            }) : null}
        </Container>
    );
};

export default QuestionCrud;
