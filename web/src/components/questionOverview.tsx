import React, {useEffect} from 'react';
import {QuestionsData} from "../interfaces/questionsData";
import styled from "styled-components";
import Heading from "./heading";

const Container = styled.div`

`

const HeadingContainer = styled.div`

`

const BodyContainer = styled.div`

`

const OptionsContainer = styled.div`

`

const Option = styled.p`

`

const NameOfQuestion = styled.h3`

`

const Category = styled.p`

`

const GroupName = styled.p`

`

const DeleteButton = styled.button`

`

const EditButton = styled.button`

`

interface IProps {
    questionsData: QuestionsData,
    deleteQuestion: (id: number) => void,
    editQuestion: (id: number) => void
}

const QuestionOverview = ({questionsData, deleteQuestion, editQuestion}: IProps) => {

    return (
        <Container>
            <HeadingContainer>
                <NameOfQuestion>Question: {questionsData.name}</NameOfQuestion>
                <DeleteButton onClick={() => deleteQuestion(questionsData.id)}>Delete</DeleteButton>
                <EditButton onClick={() => editQuestion(questionsData.id)}>Edit</EditButton>
            </HeadingContainer>
        </Container>
    );
};

export default QuestionOverview;
